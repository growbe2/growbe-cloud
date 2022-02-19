import { NgModule } from "@angular/core";
import { ModulePropertiePipe } from "./module-propertie-name.pipe";





@NgModule({
    declarations: [ModulePropertiePipe],
    exports: [ModulePropertiePipe],
})
export class ModulePipeModule {}