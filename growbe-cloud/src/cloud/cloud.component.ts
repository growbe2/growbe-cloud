import {
  Component,
  LifeCycleObserver,
  CoreBindings,
  inject,
} from '@loopback/core';

export class CloudComponent implements Component {

  controllers = [];
  bindings = [];
}