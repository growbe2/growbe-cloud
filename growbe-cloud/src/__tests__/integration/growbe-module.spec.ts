import pb from '@growbe2/growbe-pb';
import {expect} from '@loopback/testlab';
import {addMinutes} from 'date-fns';
import sinon from 'sinon';
import {GrowbeCloudApplication} from '../../application';
import { GrowbeModuleDefWithRelations, GrowbeModuleWithRelations } from '../../models';
import {GrowbeSensorValueRepository} from '../../repositories';
import {GrowbeModuleService} from '../../services';
import {setupApplication} from '../fixtures/app';
import {boardId, moduleId, relayModuleId} from '../fixtures/data';
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

  describe('Lors de la reception de data dun module', () => {
    let moduleService: GrowbeModuleService;

    before(async () => {
      moduleService = await app.get('services.' + GrowbeModuleService.name);
      await moduleService.moduleRepository.deleteAll();
    });

    afterEach(async () => {
        await moduleService.moduleRepository.deleteAll();
        await moduleService.moduleDefRepository.deleteAll({moduleId: {neq: undefined}});
    });

    describe('État du module', () => {

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
            id: moduleId,
          },
          include: ['moduleDef'],
        });

        expect(module).to.be.Object();
        expect(module.id).is.String();
        expect(module.id).to.eql(moduleId);
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
      const thlData2 = pb.THLModuleData.encode(
        new pb.THLModuleData({airTemperature: 10, humidity: 20}),
      ).finish();

      afterEach(async () => {
        await moduleService.sensorValueRepository.deleteAll();
        moduleService.moduleDataCache.clear();
      });

      before(async () => {
        await moduleService.findOrCreate(boardId, moduleId);
      });

      it('Reception de donnée depuis module thl', async () => {
        const item = await moduleService.onModuleDataChange(
          boardId,
          moduleId,
          thlData,
        );

        expect(item.values.humidity).to.eql(30);
        expect(item.values.airTemperature).to.eql(20);
        expect(item.createdAt).to.be.Number();
        expect(item.samples).to.be.Array();
        expect(item.samples).length(0);
        expect(item.growbeMainboardId).to.eql(boardId);
        expect(item.moduleType).to.eql('AAA');
      });

      it('Reception de donnée accecible avec resolver de module', async () => {
        const item = await moduleService.onModuleDataChange(
          boardId,
          moduleId,
          thlData,
        );

        const sensorData = await moduleService.moduleRepository.growbeSensorValues(moduleId).find();
        expect(sensorData.length).to.eql(1);
      });
    
      describe('Module sans aggregation de donnee', () => {
        const relayData = pb.RelayModuleData.encode(
            new pb.RelayModuleData({p0: { state: false }, p1: { state: true }}),
        ).finish();

        beforeEach(async () => {
          await moduleService.sensorValueRepository.deleteAll();
        });

        it('Reception de donne cree une nouvelle entre chaque fois', async () => {
            const item = await moduleService.onModuleDataChange(
              boardId,
              relayModuleId,
              relayData,
            );
            const item2 = await moduleService.onModuleDataChange(
              boardId,
              relayModuleId,
              relayData,
            );

            const items = await moduleService.sensorValueRepository.find({ where: { moduleId: relayModuleId } });

            expect(items.length).to.eql(2);
        });
      });

      describe('Module avec aggregation des donees', () => {
        it('Reception de plusieurs valeurs dans la même minute', async () => {

          const methodStub = sinon.stub(moduleService.sensorValueRepository, 'findOne').callThrough();

          const item = await moduleService.onModuleDataChange(
            boardId,
            moduleId,
            thlData,
          );
          let compareItem = JSON.parse(JSON.stringify(item));
 
          const item2 = await moduleService.onModuleDataChange(
            boardId,
            moduleId,
            thlData2,
          );

          expect(methodStub.calledTwice).to.be.false();
          expect(compareItem.samples).length(0);
          expect(compareItem.id?.toString()).to.eql(item2.id?.toString());
          expect(item2.values.airTemperature).to.eql(10);
          expect(item2.samples).length(1);
          expect(item2.samples[0].airTemperature).to.eql(20);
        });

        it('Reception de valeur separer de une minute', async () => {
          const item = await moduleService.onModuleDataChange(
            boardId,
            moduleId,
            thlData,
          );

          sinon.useFakeTimers({
           now: addMinutes(new Date(), 2),
         });

         const item2 = await moduleService.onModuleDataChange(
          boardId,
          moduleId,
          thlData,
          );

         expect(item.id?.toString()).not.eql(item2.id?.toString());
        });
      })
     });
    });
});
