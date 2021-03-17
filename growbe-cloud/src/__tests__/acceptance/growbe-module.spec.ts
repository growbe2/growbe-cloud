import pb from '@growbe2/growbe-pb';
import {expect} from '@loopback/testlab';
import {GrowbeCloudApplication} from '../../application';
import {GrowbeMainboardBindings} from '../../keys';
import {GrowbeModuleService} from '../../services';
import {setupApplication} from '../fixtures/app';
import {boardId, moduleId} from '../fixtures/data';

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
    let moduleService: GrowbeModuleService;
    let defaultConfig: Partial<pb.GrowbeMainboardConfig>;

    before(async () => {
      defaultConfig = await app.get(GrowbeMainboardBindings.DEFAULT_CONFIG);
      moduleService = await app.get('services.' + GrowbeModuleService.name);

      await moduleService.moduleDefRepository.create({
        id: 'ABCDEF',
        name: 'THL',
        pbModelName: 'THLModuleData',
      });
    });

    describe('État du module', () => {
      afterEach(async () => {
        await moduleService.moduleRepository.deleteAll();
      });
      it('Lors de réception état , si existe pas crée un module', async () => {
        await moduleService.onModuleStateChange(
          boardId,
          moduleId,
          new pb.ModuleData({
            plug: false,
          }),
        );

        const module: any = await moduleService.moduleRepository.findOne({
          where: {
            uid: moduleId,
          },
          include: ['moduleDef'],
        });

        expect(module).to.be.Object();
        expect(module.id).is.String();
        expect(module.moduleName).to.eql('ABCDEF');
        expect(module.uid).to.eql(moduleId);
        expect(module.mainboardId).to.eql(boardId);
        expect(module.moduleDef).to.be.Object();
      });

      it("Lors de réception état , si existe récupère et l'update", async () => {
        await moduleService.onModuleStateChange(
          boardId,
          moduleId,
          new pb.ModuleData({
            plug: false,
          }),
        );

        let modules = await moduleService.moduleRepository.find();
        expect(modules.length).to.eql(1);
        expect(modules[0].connected).to.be.false();

        await moduleService.onModuleStateChange(
          boardId,
          moduleId,
          new pb.ModuleData({
            plug: true,
          }),
        );

        modules = await moduleService.moduleRepository.find();
        expect(modules.length).to.eql(1);
        expect(modules[0].connected).to.be.true();
      });
    });

    describe('Data du module', () => {
      const thlData = pb.THLModuleData.encode(
        new pb.THLModuleData({airTemperature: 20, humidity: 30}),
      ).finish();

      afterEach(async () => {
        await moduleService.sensorValueRepository.deleteAll();
      });

      before(async () => {
        await moduleService.findOrCreate(boardId, moduleId);
      });

      it('Reception de donnée depuis module thl', async () => {
        await moduleService.onModuleDataChange(boardId, moduleId, thlData);

        const items = await moduleService.sensorValueRepository.find();
        expect(items.length).to.eql(1);

        const item = items[0];
        expect(item.humidity).to.eql(30);
        expect(item.airTemperature).to.eql(20);
        expect(item.createdAt).to.be.Date();
        expect(item.growbeMainboardId).to.eql(boardId);
        expect(item.moduleType).to.eql('ABCDEF');
      });
    });
  });
});
