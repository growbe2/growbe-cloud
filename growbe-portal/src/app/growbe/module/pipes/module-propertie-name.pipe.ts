import { Pipe, PipeTransform } from "@angular/core";
import { GrowbeModuleDef } from "growbe-cloud-api/lib";



@Pipe({
    name: 'modulePropertie'
})
export class ModulePropertiePipe implements PipeTransform {

    constructor() {}

    transform(value: GrowbeModuleDef, propertie: string) {
        return value.properties[propertie].displayName ? value.properties[propertie].displayName : value.properties[propertie].name;
    }
}