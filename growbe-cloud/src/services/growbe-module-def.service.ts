import { BindingScope, injectable } from "@loopback/context";
import { model, property, repository } from "@loopback/repository";
import { HttpErrors } from "@loopback/rest";
import { GrowbeModuleDef } from "../models";
import { GrowbeMainboardRepository, GrowbeModuleDefRepository, GrowbeModuleRepository } from "../repositories";


@model()
export class OverrideModuleDefRequest {
  @property()
  moduleId: string;
  @property()
  moduleName: string;
}

@injectable({scope: BindingScope.TRANSIENT})
export class GrowbeModuleDefService {
  constructor(
    @repository(GrowbeModuleRepository)
    private moduleRepo: GrowbeModuleRepository,
    @repository(GrowbeModuleDefRepository)
    private moduleDefRepo: GrowbeModuleDefRepository,
  ) {}


  /**
   * override the moduleDef with a new one that can
   * be modified by the user
   * @param mainboardId 
   */
  async overrideMainboardModuleDef(moduleId: string, moduleName: string): Promise<GrowbeModuleDef> {
     const defs = await this.moduleDefRepo.find({
       where: {
         or: [
           {
             id: moduleName
           },
           {
             id: {
               like: `${moduleName}:%`
             }
           }
         ]
       }
     });
     if (defs.length === 2) {
       throw new HttpErrors[409]('already existing');
     }
     const newModuleName = `${moduleName}:${moduleId}`;
     const newDef = await this.moduleDefRepo.create(
       Object.assign(defs[0],{id: newModuleName})
     );

     const d = await this.moduleRepo.updateAll({ moduleName: newModuleName}, {uid: moduleId});
     console.log(d.count);

     return newDef;
  }

}

