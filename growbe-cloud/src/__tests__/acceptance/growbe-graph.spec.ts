import { GrowbeCloudApplication } from "../../application";
import { setupApplication } from "../fixtures/app";

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

  describe('Module Value Graph', () => {


    before(async () => {

    });

    afterEach(async () => {

    });

    describe('Validation RTC', () => {
      it('RTC valide najoute pas de warning', async () => {

      });

    });


  });
});
