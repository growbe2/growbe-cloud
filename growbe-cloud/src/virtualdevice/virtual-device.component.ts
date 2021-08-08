import { Component, CoreBindings, inject } from "@loopback/core";
import { ApplicationWithRepositories } from "@loopback/repository";
import { RestApplication } from "@loopback/rest";


export class VirtualDeviceComponent implements Component {
  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE)
    app: RestApplication & ApplicationWithRepositories,
  ) {}

  controllers = [];
  bindings = [];
}