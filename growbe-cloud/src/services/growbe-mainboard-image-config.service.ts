import {BindingScope, injectable} from "@loopback/core";
import {GrowbeMainboardImageConfig} from "../models";


import * as dot from 'dot';
import {join} from "path";
import { existsSync, promises as fs } from "fs"
import {env} from "process";
import {exec} from "child_process";
import {GrowbeMainboardRepository} from "../repositories";
import {repository} from "@loopback/repository";

function between(min: number, max: number) {  
    return Math.floor(
     Math.random() * (max - min) + min
    );
}

@injectable({scope: BindingScope.TRANSIENT})
export class GrowbeImangeConfigService {


    workingFolder: string = "/tmp/";
    hostingFolder: string = "./storage";

    templateFolder: string = "./template/mainboardpi";


    constructor(
        @repository(GrowbeMainboardRepository)
        private growbeRepository: GrowbeMainboardRepository,
    ) {
        (dot as any).templateSettings.strip = false;
    }


    async generateConfigFiles(mainboardId: string, model: GrowbeMainboardImageConfig): Promise<string> {

        const mainboard = await this.growbeRepository.findById(mainboardId, { include: [{relation: "growbeMainboardConfig"}] })


        const baseFolder = join(this.workingFolder, mainboardId);
        const folder = join(baseFolder, "growbe");

        await (fs.mkdir as any)(folder,  { recursive: true });

        await fs.writeFile(join(folder, `${model.environment}.json`), JSON.stringify(mainboard.growbeMainboardConfig.processConfig, null, 5));

        this.renderTemplate(mainboardId, "ssh", "ssh");

        const configurePath = await this.renderTemplate(mainboardId, "configure.sh", "growbe/configure.sh", {
            env: model.environment,
            services: [ model.ssh?.enable ? 'autossh' : null, model.fluentLog?.enable ? 'fluentbit': null, 'growbe-mainboard'].filter(x => x),
        });
        await this.executableFile(configurePath);

        const downloadPath = await this.renderTemplate(mainboardId, "download.sh", "growbe/download.sh", {
            token: this.getGHToken(),
        });
        await this.executableFile(downloadPath);

        if (model.ssh && model.ssh.enable) {
            await fs.mkdir(join(folder, "autossh"), {recursive: true})
            await this.renderTemplate(mainboardId, `autossh/config`, `growbe/autossh/${model.environment}`, {
                id: mainboardId,
                env: model.environment,
                remote: model.ssh?.remoteAddr || 'root@assets.inner.wquintal.ca',
                port: between(20000, 30000),
            });
            const idrsaPath = join(folder, "autossh/id_rsa");
            const id_rsa = this.getIDRSA();
            if (id_rsa) {
                await fs.writeFile(idrsaPath, this.getIDRSA());
                await this.privateFile(idrsaPath);
            }
        }

        if (model.fluentLog && model.fluentLog.enable) {
            await fs.mkdir(join(folder, "fluent"), {recursive: true})
            await this.renderTemplate(mainboardId, `fluent/config`, `growbe/fluent/${model.environment}`, {
                env: model.environment,
                id: mainboardId,
            });
            await this.renderTemplate(mainboardId, `fluent/fluent.config`, `growbe/fluent/fluent.config`, {
                env: model.environment,
                id: mainboardId,
            });
        }

        if (model.wifi) {
            await this.renderTemplate(mainboardId, "wpa_supplicant.conf", "wpa_supplicant.conf", {
                ssid: model.wifi.ssid,
                password: model.wifi.password,
                country: model.wifi.country,
            });
        }

        // download the executable
        await this.downloadMainboardBinary();
        await fs.copyFile("./growbe-mainboard-arm-linux-latest", join(folder,"growbe-mainboard"))
        
        return baseFolder;
    }

    generateArchiveFromConfigFiles(mainboardId: string, sourcePath: string): Promise<void> {
        const destionationPath = join(this.hostingFolder, mainboardId, "image-config.zip");
        return new Promise((resolve, reject) => {
            exec(`7z a ${destionationPath} ${sourcePath}/*`, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            })
        });
    }

    async downloadMainboardBinary(): Promise<void> {
        if (existsSync('./growbe-mainboard-arm-linux-latest')) {
            return;
        }
        return new Promise((resolve, reject) => {
            exec(`bash ./scripts/download.sh latest`, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            })
        });
    }


    private getIDRSA(): string {
        return env.REVERSE_PROXY_ID_RSA as string;
    }

    private getGHToken(): string {
        return env.GITHUB_TOKEN_RO as string;
    }
 
    
    private executableFile(filePath: string): Promise<void> {
        return fs.chmod(filePath, 0o755);
    }

    private async privateFile(filePath: string): Promise<void> {
        return fs.chmod(filePath, 0o700);
    }

    private async renderTemplate(mainboardId: string, file_path: string, dest_path: string, obj: any = {}): Promise<string> {
        const template_path = join(this.templateFolder, file_path);
        const template_path_dest = join(this.workingFolder, mainboardId, dest_path);

        const template_content = (await fs.readFile(template_path)).toString().replace(/\r\n/g,'\n')

        const render_template = dot.template(template_content)(obj);

        await fs.writeFile(template_path_dest, render_template);

        return template_path_dest;
    }
}
