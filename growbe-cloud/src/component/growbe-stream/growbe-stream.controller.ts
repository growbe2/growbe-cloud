import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, param, post, requestBody} from '@loopback/rest';
import axios from 'axios';
import {createHash} from 'crypto';
import {GrowbeStream} from './growbe-stream.model';
import {GrowbeStreamRepository} from './growbe-stream.repository';
import {NMSBindings} from './keys';

export class GrowbeStreamController {
  constructor(
    @inject(NMSBindings.NMS_KEY)
    private key: string,
    @inject(NMSBindings.NMS_PASSWORD)
    private password: string,
    @inject(NMSBindings.NMS_USERNAME)
    private username: string,
    @inject(NMSBindings.NMS_URL)
    private url: string,
    @repository(GrowbeStreamRepository)
    private growbeStreamRepository: GrowbeStreamRepository,
  ) {}

  @get('/growbeStreams/{id}/live', {
    responses: {
      '200': {
        'application/json': {
          schema: getModelSchemaRef(GrowbeStream),
        },
      },
    },
  })
  @authenticate('jwt')
  getLiveStream(
    @param.path.string('id') growbeId: string,
  ): Promise<GrowbeStream[]> {
    return Promise.all([
      this.growbeStreamRepository.find({where: {growbeMainboardId: growbeId}}),
      axios.get(`${this.url}/api/streams`, {
        auth: {
          password: this.password,
          username: this.username,
        },
      }),
    ]).then(([streams, liveStreams]) => {
      return streams.map(stream => {
        stream.active =
          liveStreams.data?.live?.[stream.streamName] !== undefined;
        return stream;
      });
    });
  }

  @post('/growbeStreams')
  @authenticate('jwt')
  createStream(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GrowbeStream, {
            exclude: ['id', 'active', 'expiredAt', 'key'],
          }),
        },
      },
    })
    stream: Partial<GrowbeStream>,
  ) {
    stream.active = false;
    const expiredDate = new Date();
    expiredDate.setMonth(expiredDate.getMonth() + 1);
    stream.expiredAt = expiredDate.getTime();
    const hash = createHash('md5');
    hash.update(`/live/${stream.streamName}-${stream.expiredAt}-${this.key}`);
    const md5Hash = hash.digest('hex').toString();
    stream.url = `?sign=${stream.expiredAt}-${md5Hash}`;
    return this.growbeStreamRepository.save(stream as GrowbeStream);
  }
}
