import { Component } from "@loopback/core";
import { DeviceLogsController } from "./device-logs.controller";
import { DeviceLogs } from "./device-logs.model";
import { DeviceLogsRepository } from "./device-logs.repository";

export class DeviceLogsComponent implements Component {
  repositories = [DeviceLogsRepository];
  models = [DeviceLogs];
  controllers = [DeviceLogsController];
}
