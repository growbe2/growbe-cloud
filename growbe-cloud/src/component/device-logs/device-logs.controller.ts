import { repository } from "@loopback/repository";
import { get, post, requestBody } from "@loopback/rest";
import { DeviceLogsRepository } from "./device-logs.repository";

export class DeviceLogsController {
  constructor(
    @repository(DeviceLogsRepository)
    private deviceLogsRepo: DeviceLogsRepository,
  ) {}

  @post('/logs/store')
  // TODO authenticate with device token in the future
  //@authenticate('jwt')
  async getLiveStream(
    @requestBody({
      description: 'Raw Body',
      required: true,
      content: {
        'application/json': {
          'x-parser': 'raw',
          schema: {type: 'object'},
        },
      },
    }) body: Buffer
  ): Promise<any> {
    try {
      const entries = JSON.parse(body.toString());
      return this.deviceLogsRepo.createAll(
        entries
          .filter((x: any) => x['mainboard_id'])
          .map((entry: any) => ({ mainboardId: entry['mainboard_id'], timestamp: entry['TIMESTAMP'], message: entry['MESSAGE'] })
        )
      ).then(() => ({ process: true }))
    } catch (err) {
      console.error(err);
    }
    return {};
  }
}