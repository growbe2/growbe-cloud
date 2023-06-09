import { start } from "./application";
import { CloudComponent } from "./cloud";
import { WatcherComponent } from "./watcher/watcher.component";
import { SSOApplicationComponent } from '@berlingoqc/sso/dist/component';


(async () => {
	require("./reverse_proxy_ws");
})();

start([
	CloudComponent,
	WatcherComponent,
	SSOApplicationComponent,
], { strategy: 'local', migrate: true})