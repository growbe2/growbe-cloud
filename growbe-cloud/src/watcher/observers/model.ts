import { Constructor } from "@loopback/repository";

export interface DataSubject {
  regexTopic: string;
  model: Constructor<any> & {decode: any};
  service: Constructor<any>;
  func: (id: string, service: any, data: any) => Promise<any>;
}
