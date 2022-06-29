import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Solicitud,
  Partes,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudPartesController {
  constructor(
    @repository(SolicitudRepository)
    public solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicitud/{id}/partes', {
    responses: {
      '200': {
        description: 'Partes belonging to Solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Partes)},
          },
        },
      },
    },
  })
  async getPartes(
    @param.path.number('id') id: typeof Solicitud.prototype.id,
  ): Promise<Partes> {
    return this.solicitudRepository.Partes(id);
  }
}
