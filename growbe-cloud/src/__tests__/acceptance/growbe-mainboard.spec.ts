import {expect} from '@loopback/testlab';
import {GrowbeCloudApplication} from '../../application';
import {GrowbeMainboardBindings} from '../../keys';
import {GrowbeService, GrowbeStateService} from '../../services';
import {setupApplication} from '../fixtures/app';

import pb from '@growbe2/growbe-pb';
import { getDate } from '../helpers/date';
import { boardId, userId } from '../fixtures/data';
import { MockMQTTService } from '../fixtures/mock-mqtt.service';


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

  describe('Register d\'un nouveau growbe', () => {
    let mainboardService: GrowbeService;
    let stateService: GrowbeStateService;
    let defaultConfig: Partial<pb.GrowbeMainboardConfig>;

    const request = {id: boardId};

    before(async () => {
      mainboardService = await app.get('services.GrowbeService');
      stateService = await app.get('services.GrowbeStateService');
      defaultConfig = await app.get(GrowbeMainboardBindings.DEFAULT_CONFIG);
      stateService.mqttService = new MockMQTTService() as any;
    });

    afterEach(async () => {
        await mainboardService.mainboardRepository.deleteAll();
    });

    it('Register un growbe par un user qui existe pas encore', async () => {
      const response = await mainboardService.register(userId, request);

      expect(response).to.be.Object();
      expect(response.state).to.be.eql('UNBEATH_REGISTER');

      expect(response.growbe).to.be.Object();
      expect(response.growbe.growbeMainboardConfig).to.be.Object();
      expect(response.growbe.growbeMainboardConfig.config).to.be.Object();
      expect(response.growbe.growbeMainboardConfig.config.hearthBeath).to.eql(
        defaultConfig.hearthBeath,
      );
    });

    it('Register un growbe par un user qui a recu un hearthbeath', async () => {
        const rtcValid = getDate((defaultConfig.hearthBeath as any)  / 2);
        await stateService.onBeath(boardId, new pb.HearthBeath({rtc: rtcValid}))

        const response = await mainboardService.register(userId, request);
        expect(response).to.be.Object();
        expect(response.state).to.eql("REGISTER");
    });

    it('Register un growbe par un user qui a deja été register', async () => {
        await mainboardService.register(userId, request);
        const response = await mainboardService.register(userId, request);
        expect(response).to.be.Object();
        expect(response.state).to.eql("ALREADY_REGISTER");
    });

  });

});
