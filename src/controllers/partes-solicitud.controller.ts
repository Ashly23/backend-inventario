import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Partes,
  Solicitud,
} from '../models';
import {PartesRepository} from '../repositories';

export class PartesSolicitudController {
  constructor(
    @repository(PartesRepository) protected partesRepository: PartesRepository,
  ) { }

  @get('/partes/{id}/solicitud', {
    responses: {
      '200': {
        description: 'Array of Partes has many Solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitud)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Solicitud>,
  ): Promise<Solicitud[]> {
    return this.partesRepository.solicitud(id).find(filter);
  }

  @post('/partes/{id}/solicitud', {
    responses: {
      '200': {
        description: 'Partes model instance',
        content: {'application/json': {schema: getModelSchemaRef(Solicitud)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Partes.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {
            title: 'NewSolicitudInPartes',
            exclude: ['id'],
            optional: ['idPartes']
          }),
        },
      },
    }) solicitud: Omit<Solicitud, 'id'>,
  ): Promise<Solicitud> {
    return this.partesRepository.solicitud(id).create(solicitud);
  }

  @patch('/partes/{id}/solicitud', {
    responses: {
      '200': {
        description: 'Partes.Solicitud PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {partial: true}),
        },
      },
    })
    solicitud: Partial<Solicitud>,
    @param.query.object('where', getWhereSchemaFor(Solicitud)) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.partesRepository.solicitud(id).patch(solicitud, where);
  }

  @del('/partes/{id}/solicitud', {
    responses: {
      '200': {
        description: 'Partes.Solicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Solicitud)) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.partesRepository.solicitud(id).delete(where);
  }
}
