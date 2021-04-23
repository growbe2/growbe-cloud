import {expect} from '@loopback/testlab';
import {GrowbeCloudApplication} from '../../application';
import {GrowbeMainboardBindings} from '../../keys';
import {GrowbeMainboardConfig} from '../../models/growbe-mainboard-config.model';
import {GrowbeService, GrowbeStateService} from '../../services';
import {setupApplication} from '../fixtures/app';

import pb from '@growbe2/growbe-pb';
import {GrowbeWarningService} from '../../services/growbe-warning.service';
import {getDate} from '../helpers/date';
import {boardId} from '../fixtures/data';
import {RTC_OFFSET_KEY} from '../../data';
import {MockMQTTService} from '../fixtures/mock-mqtt.service';
import {waitAsync} from '../helpers/general';

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

  describe('Hearthbeath', () => {
    let stateService: GrowbeStateService;
    let mainboardService: GrowbeService;
    let warningService: GrowbeWarningService;
    let defaultConfig: Partial<pb.GrowbeMainboardConfig>;
    let mqttService: MockMQTTService;

    before(async () => {
      mainboardService = await app.get('services.GrowbeService');
      warningService = await app.get('services.GrowbeWarningService');
      stateService = await app.get('services.GrowbeStateService');
      defaultConfig = await app.get(GrowbeMainboardBindings.DEFAULT_CONFIG);

      mqttService = new MockMQTTService();
      stateService.mqttService = mqttService as any;
    });

    afterEach(async () => {
      // Delete all warning
      await warningService.warningRepository.deleteAll();
      mqttService.receivedMessage = [];
      mqttService.sendMessage = [];
    });

    describe('Validation RTC', () => {
      /*it('RTC valide najoute pas de warning', async () => {
        const rtcValid = getDate((defaultConfig.hearthBeath as any) / 2);
        await stateService.onBeath(
          boardId,
          new pb.HearthBeath({rtc: rtcValid}),
        );

        const count = await warningService.warningRepository.count();
        expect(count.count).to.eql(0);
      });

      it('RTC invalide en avance ajoute warning', async () => {
        const rtcInvalid = getDate((defaultConfig.hearthBeath as any) * 2, 1);
        await stateService.onBeath(
          boardId,
          new pb.HearthBeath({rtc: rtcInvalid}),
        );

        const items = await warningService.warningRepository.find({
          where: {growbeMainboardId: boardId, warningKeyId: RTC_OFFSET_KEY},
        });
        expect(items.length).to.eql(1);
        expect(items[0].data.state).to.eql('advance');
      });

      it('RTC invalide en retard ajoute warning', async () => {
        const rtcInvalid = getDate((defaultConfig.hearthBeath as any) * 2);
        await stateService.onBeath(
          boardId,
          new pb.HearthBeath({rtc: rtcInvalid}),
        );

        const items = await warningService.warningRepository.find({
          where: {growbeMainboardId: boardId, warningKeyId: RTC_OFFSET_KEY},
        });
        expect(items.length).to.eql(1);
        expect(items[0].data.state).to.eql('late');
      });

      it('RTC warning existant , aucun est rajouté', async () => {
        const rtcInvalid = getDate((defaultConfig.hearthBeath as any) * 2);

        await stateService.onBeath(
          boardId,
          new pb.HearthBeath({rtc: rtcInvalid}),
        );
        await stateService.onBeath(
          boardId,
          new pb.HearthBeath({rtc: rtcInvalid}),
        );

        const count = await warningService.warningRepository.count();
        expect(count.count).to.eql(1);
      });*/
    });

    /*
    describe('Validation de la connectivité', () => {
      it('Recoit des hearthBeath donc online et topic send', async () => {
        const rtcValid = getDate((defaultConfig.hearthBeath as any) / 2);
        await stateService.onBeath(
          boardId,
          new pb.HearthBeath({rtc: rtcValid}),
        );

        const mainboard = await mainboardService.mainboardRepository.findById(
          boardId,
        );

        expect(mainboard.state).to.eql('CONNECTED');
        expect(mqttService.sendMessage.length).to.eql(1);
      });

      it('Ne recoit plus de heathBeath donc offline et topic send', async function() {
        this.timeout(50000);
        const rtcValid = getDate((defaultConfig.hearthBeath as any) / 2);
        await stateService.onBeath(
          boardId,
          new pb.HearthBeath({rtc: rtcValid}),
        );

        await waitAsync(11000);

        const mainboard = await mainboardService.mainboardRepository.findById(
          boardId,
        );

        expect(mainboard.state).to.eql('DISCONNECTED')
        expect(mqttService.sendMessage.length).to.eql(1);
      });
    });
    */
  });
});
