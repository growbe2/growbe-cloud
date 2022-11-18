import { authenticate } from "@loopback/authentication";
import { get, param, post, requestBody } from "@loopback/rest";

export class DeviceLogsController {
  constructor() {}

  @post('/logs/store')
  // TODO authenticate with device token in the future
  //@authenticate('jwt')
  getLiveStream(
	@requestBody() body: any,
  ): Promise<any> {
	console.log(body);
	return (async () => {
		return {};
	})();
  }
}