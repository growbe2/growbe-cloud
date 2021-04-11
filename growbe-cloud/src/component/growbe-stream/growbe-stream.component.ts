import {Component} from '@loopback/core';
import {GrowbeStreamController} from './growbe-stream.controller';
import {GrowbeStream} from './growbe-stream.model';
import {GrowbeStreamRepository} from './growbe-stream.repository';

export class GrowbeStreamComponent implements Component {
  repositories: [GrowbeStreamRepository];
  models: [GrowbeStream];
  controllers = [GrowbeStreamController];
}
