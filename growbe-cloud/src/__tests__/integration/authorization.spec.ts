import { GrowbeCloudApplication } from "../../application";
import { setupApplication } from "../fixtures/app";
import { userId } from "../fixtures/data";





describe('authorization growbe', () => {

    let app: GrowbeCloudApplication;

    const getAuthorizationContext = (args: any[], organisations: any[], roles: any[]) => {
        const authorization = {
            invocationContext: {
                get: (name: string) => app.get(name),
                args,
            }
        };
        const metadata = {
            principals: [
                {
                    id: userId,
                    organisations,
                    roles,
                }
            ]
        };
    
        return { authorization, metadata }
    }

    before('setupApplication', async function () {
      ({app} = await setupApplication(
        null,
        async (portailApp: GrowbeCloudApplication) => {},
      ));
    });
  
    after(async () => {
      await app.stop();
    });


    describe('user ownership', () => {
        it('user access growbe that he owned, allow', () => {

        });

        it('user access growbe that he dont owned, denied', () => {

        });

        it('user try to access mp that is not owned, denied', () => {

        });
    })

    describe('organisation ownership', () => {

        it('user wanted growbes of is organisation, allowed', () => {

        });

        it('user wanted growbes of not is organisation, denied', () => {

        });

        it('user access growbe owned by a organisation is in, allow', () => {

        });

        it('user access growbe owned by a organisation is not in, denied', () => {

        });

        it('user is manager of organisation and endpoint only for manager only, allowed', () => {

        });

        it('user is not manager of organisation and endpoint only for manager only, denied', () => {

        });

        it('user have role inside organisation that is required, allow', () => {

        });

        it('user dont have role inside organisation thas is required, denied', () => {

        });
    });
});