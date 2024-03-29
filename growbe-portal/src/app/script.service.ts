import { Injectable } from '@angular/core';

declare let document: any;
interface Scripts {
    name: string;
    src: string;
}

// eslint-disable @typescript-eslint/naming-convention
export const scriptStore: Scripts[] = [
    { name: 'node-editor', src: '/assets/node-editor/node-editor.js' },
];
@Injectable({ providedIn: 'root' })
export class ScriptService {
    private scripts: any = {};

    constructor() {
        scriptStore.forEach((script: any) => {
            this.scripts[script.name] = {
                loaded: false,
                src: script.src,
            };
        });
    }

    load(...scripts: string[]) {
        const promises: any[] = [];
        scripts.forEach((script) => promises.push(this.loadScript(script)));
        return Promise.all(promises);
    }

    loadScript(name: string) {
        return new Promise((resolve, reject) => {
            // resolve if already loaded
            if (this.scripts[name].loaded) {
                resolve({
                    script: name,
                    loaded: true,
                    status: 'Already Loaded',
                });
            } else {
                // load script
                const script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = this.scripts[name].src;
                if (script.readyState) {
                    // IE
                    script.onreadystatechange = () => {
                        if (
                            script.readyState === 'loaded' ||
                            script.readyState === 'complete'
                        ) {
                            script.onreadystatechange = null;
                            this.scripts[name].loaded = true;
                            resolve({
                                script: name,
                                loaded: true,
                                status: 'Loaded',
                            });
                        }
                    };
                } else {
                    // Others
                    script.onload = () => {
                        this.scripts[name].loaded = true;
                        resolve({
                            script: name,
                            loaded: true,
                            status: 'Loaded',
                            element: script,
                        });
                    };
                }
                script.onerror = (error: any) =>
                    resolve({ script: name, loaded: false, status: 'Loaded' });
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        });
    }
}
