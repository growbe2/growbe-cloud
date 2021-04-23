import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {Filter, repository} from '@loopback/repository';
import {get, getModelSchemaRef, param, post, requestBody} from '@loopback/rest';
import {createHash} from 'crypto';
import {GrowbeStream} from './growbe-stream.model';
import {GrowbeStreamRepository} from './growbe-stream.repository';
import {NMSBindings} from './keys';

export class GrowbeStreamController {
  constructor(
    @inject(NMSBindings.NMS_KEY)
    private key: string,
    @repository(GrowbeStreamRepository)
    private growbeStreamRepository: GrowbeStreamRepository,
  ) {}

  @post('/growbeStream')
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

  @get('/growbeStream', {
    responses: {
      '200': {
        'application/json': {
          type: 'array',
          items: getModelSchemaRef(GrowbeStream),
        },
      },
    },
  })
  @authenticate('jwt')
  getStreams(@param.filter(GrowbeStream) filter: Filter<GrowbeStream>) {
    return this.growbeStreamRepository.find(filter);
  }
}
