import { GrowbeCloudApplication } from "../../application";
import { setupApplication } from "../fixtures/app";

describe('Growbe Hardware alarm', () => {
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


  describe('Testing alarm operation', () => {



  });
});
