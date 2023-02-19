import {BindingScope, injectable} from "@loopback/core";
import {repository} from "@loopback/repository";
import {GrowbeSensorValueRepository} from "../repositories";

import * as pb from '@growbe2/growbe-pb';

@injectable({scope: BindingScope.TRANSIENT})
export class RelayHistoricService {


  constructor(
    @repository(GrowbeSensorValueRepository)
    private valueRepository: GrowbeSensorValueRepository,
  ) {}



  async getRelayHistoric(
    moduleId: string,
    property: string,
    since: number,
  ): Promise<pb.RelayOutletData[]> {
    console.log('Since ', since);
    let values = await this.valueRepository.find({
      where: {
        moduleId,
        createdAt: {
          gte: since,
        }
      },
      order: ['createdAt DESC']
    });

    let propertyValues = values.map(value => {
      return value.values[property];
    });
    let previousValue: pb.RelayOutletData | null = null;
    return propertyValues.filter(value => {
      if (!previousValue) {
        previousValue = value;
        return true;
      }

      const hasChanged = previousValue.state != value.state;
      if (hasChanged) {
        previousValue = value;
      }

      return hasChanged;
    });
  }
}
