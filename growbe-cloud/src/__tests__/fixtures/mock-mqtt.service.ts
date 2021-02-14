import { BindingScope, injectable } from "@loopback/context";
import { Observable, Subscription } from "rxjs";


@injectable({scope: BindingScope.TRANSIENT})
export class MockMQTTService {

  sendMessage: any[] = [];
  receivedMessage: any[] = [];
  sub: any;

  url = '';
  observable: Observable<{topic: string; message: Buffer}>;

  async connect() {
    this.observable = new Observable((sub) => (this.sub = sub));
  }

  async addSubscription(topic: string) {
    return [];
  }


  async send(topic: string, body: any) {
      this.sendMessage.push({topic, body})
  }


  receiveMessage(topic: string, message: Buffer) {
      const data = {topic, message};
      this.sub.next(data);
  }
}