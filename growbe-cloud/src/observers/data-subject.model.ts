import { Constructor } from "@loopback/repository";

export type DataSubjectFunc = (
  id: string,
  service: any,
  data: any,
  topic: string,
) => Promise<any>;
export type DataModuleFunc = (
  id: string,
  moduleId: string,
  service: any,
  data: any,
  topic?: string,
) => Promise<any>;

export interface DataSubject {
  regexTopic: string;
  model: (Constructor<any> & {decode: any}) | null;
  service: Constructor<any>;
  func: DataSubjectFunc;
}

const subjectRegex = /^[A-Z]{3}\d{9}$/;

export function funcModuleSubject(func: DataModuleFunc): DataSubjectFunc {
  return async (i, service, data, topic) => {
    const items = topic.split('/');
    const moduleId = items[items.length - 2];
    // valide le moduleId
    if (subjectRegex.test(moduleId)) {
      return func(i, moduleId, service, data, topic);
    }
    return () => console.error("failed to parse module id " + moduleId);
  };
}
