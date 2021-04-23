import {expect} from '@loopback/testlab';
import supertest from 'supertest';
import {GrowbeCloudApplication} from '../../application';
import {GrowbeDashboard} from '../../models';
import {GrowbeMainboardRepository} from '../../repositories';
import {GrowbeDashboardRepository} from '../../repositories/growbe-dashboard.repository';
import {setupApplication} from '../fixtures/app';
import {userId} from '../fixtures/data';

/*
describe('Growbe Mainboard', () => {
  let app: GrowbeCloudApplication;
  let client: supertest.SuperTest<supertest.Test>;

  let dashboardRepo: GrowbeDashboardRepository;

  before('setupApplication', async function () {
    ({app, client} = await setupApplication(
      GrowbeCloudApplication,
      async (portailApp: GrowbeCloudApplication) => {},
    ));

    dashboardRepo = await app.getRepository(GrowbeDashboardRepository);
  });

  after(async () => {
    await app.stop();
  });

  describe('Opération sur un Dashboard', () => {
    let dashboard = new GrowbeDashboard({name: 'Test C234D-D23D', userId: userId});

    it('Ajout un nouveau dashboard', async () => {

        const post = await client.post('/dashboards').send(dashboard);
        const body = post.body as GrowbeDashboard;

        expect(body.id).to.not.undefined();
    });

    it('Get tout les dashboards pour un user', () => {


    });

    it('Ajout des items au dashboard', () => {

    });
  });

});
*/
