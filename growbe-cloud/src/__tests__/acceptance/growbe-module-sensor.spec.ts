import { GrowbeMainboardBindings } from "../../keys";
import { boardId } from "../fixtures/data";
import { MockMQTTService } from "../fixtures/mock-mqtt.service";

import pb from '@growbe2/growbe-pb';
import { GrowbeCloudApplication } from "../../application";
import { setupApplication } from "../fixtures/app";
import { GrowbeService, GrowbeStateService } from "../../services";
import { GrowbeModuleValueService } from "../../services/growbe-module-value.service";
import { expect } from "@loopback/testlab";

describe('Growbe Mainboard', () => {
  let app: GrowbeCloudApplication;

  before('setupApplication', async function () {
    ({app} = await setupApplication(
      null,
      async (portailApp: GrowbeCloudApplication) => {},
    ));
  });

  after(async () => {
    await app.stop();
  });

  describe('Lors de la reception de data dun module', () => {
    let sensorService: GrowbeModuleValueService;
    let defaultConfig: Partial<pb.GrowbeMainboardConfig>;

    before(async () => {
      defaultConfig = await app.get(GrowbeMainboardBindings.DEFAULT_CONFIG);
      sensorService = await app.get('services.'+GrowbeModuleValueService.name);
    });

    afterEach(async () => {
        await sensorService.sensorValueRepository.deleteAll();
    });

    it('Reception de sensor data thl', async () => {
        const values: any = {
            humidity: 33,
            airTemperature: 22,
        };
        const data = await sensorService.onModuleData(boardId, 'thl',values);

        const items = await sensorService.sensorValueRepository.find();
        expect(items.length).to.eql(1);
        expect(items[0].createdAt).to.be.Date();
        expect(items[0].growbeMainboardId).to.eql(boardId);
        expect(items[0].moduleType).to.eql('thl');
        Object.keys(values).forEach((key) => {
            expect(items[0][key]).to.eql(values[key]);
        });
    });


  });

});
