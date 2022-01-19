import { service } from "@loopback/core";
import { VirtualRelayService } from "../../services";


export class VirtualRelayController {
  constructor(
      @service(VirtualRelayService)
      private virtualRelayService: VirtualRelayService,
  ) {}

  // create

  // updateById (idk if needed)

  // deleteById (ohh que oui)

  // config my dear
}