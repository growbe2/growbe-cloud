import {BindingScope, injectable} from "@loopback/core";
import {GrowbeMainboardImageConfig} from "../models";


import * as dot from 'dot';
import {join} from "path";
import {chmodSync, mkdirSync, readFileSync, rmdirSync, writeFileSync} from "fs";
import {env} from "process";
import {exec, execSync} from "child_process";

@injectable({scope: BindingScope.TRANSIENT})
export class GrowbeImangeConfigService {


    workingFolder: string = "/tmp/";
    hostingFolder: string = "./storage";

    templateFolder: string = "./template/mainboardpi";


    constructor() {
        (dot as any).templateSettings.strip = false;
    }


    generateConfigFiles(mainboardId: string, model: GrowbeMainboardImageConfig): string {

        const baseFolder = join(this.workingFolder, mainboardId);
        const folder = join(baseFolder, "growbe");

        mkdirSync(folder,  { recursive: true });

        const initPath = this.renderTemplate(mainboardId, "init.sh", "growbe/init.sh");
        this.executableFile(initPath);

        const configurePath = this.renderTemplate(mainboardId, "configure.sh", "growbe/configure.sh", {
            env: model.environment,
            services: [ model.ssh?.enable ? 'autossh' : null, model.fluentLog?.enable ? 'fluentbit': null, 'growbe-mainboard'].filter(x => x),
        });
        this.executableFile(configurePath);

        const downloadPath = this.renderTemplate(mainboardId, "download.sh", "growbe/download.sh", {
            token: this.getGHToken(),
        });
        this.executableFile(downloadPath);

        if (model.ssh && model.ssh.enable) {
            mkdirSync(join(folder, "autossh"), {recursive: true})
            this.renderTemplate(mainboardId, `autossh/config`, `growbe/autossh/${model.environment}`, {
                id: mainboardId,
                env: model.environment,
                remote: model.ssh?.remoteAddr
            });
            const idrsaPath = join(folder, "autossh/id_rsa");
            const id_rsa = this.getIDRSA();
            if (id_rsa) {
                writeFileSync(idrsaPath, this.getIDRSA());
                this.privateFile(idrsaPath);
            }
        }

        if (model.fluentLog && model.fluentLog.enable) {
            mkdirSync(join(folder, "fluent"), {recursive: true})
            this.renderTemplate(mainboardId, `fluent/config`, `growbe/fluent/${model.environment}`, {
                env: model.environment,
                id: mainboardId,
            });
            this.renderTemplate(mainboardId, `fluent/fluent.config`, `growbe/fluent/fluent.config`, {
                env: model.environment,
                id: mainboardId,
            });
        }

        if (model.wifi) {
            this.renderTemplate(mainboardId, "wpa_supplicant.conf", "wpa_supplicant.conf", {
                ssid: model.wifi.ssid,
                password: model.wifi.password,
                country: model.wifi.country,
            });
        }
        
        return baseFolder;
    }

    generateArchiveFromConfigFiles(mainboardId: string, sourcePath: string): void {
        const destionationPath = join(this.hostingFolder, mainboardId, "image-config.zip");
        console.log(execSync(`7z a ${destionationPath} ${sourcePath}/*`).toString());
    }


    private getIDRSA(): string {
        return env.REVERSE_PROXY_ID_RSA as string;
    }

    private getGHToken(): string {
        return env.GITHUB_TOKEN_RO as string;
    }
 
    
    private executableFile(filePath: string): void {
        chmodSync(filePath, 0o755);
    }

    private privateFile(filePath: string): void {
        chmodSync(filePath, 0o700);
    }

    private renderTemplate(mainboardId: string, file_path: string, dest_path: string, obj: any = {}): string {
        const template_path = join(this.templateFolder, file_path);
        const template_path_dest = join(this.workingFolder, mainboardId, dest_path);

        const template_content = readFileSync(template_path).toString().replace(/\r\n/g,'\n')

        const render_template = dot.template(template_content)(obj);

        writeFileSync(template_path_dest, render_template);

        return template_path_dest;
    }

}
