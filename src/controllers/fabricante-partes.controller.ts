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
  Fabricante,
  Partes,
} from '../models';
import {FabricanteRepository} from '../repositories';

export class FabricantePartesController {
  constructor(
    @repository(FabricanteRepository) protected fabricanteRepository: FabricanteRepository,
  ) { }

  @get('/fabricantes/{id}/partes', {
    responses: {
      '200': {
        description: 'Array of Fabricante has many Partes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Partes)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Partes>,
  ): Promise<Partes[]> {
    return this.fabricanteRepository.partes(id).find(filter);
  }

  @post('/fabricantes/{id}/partes', {
    responses: {
      '200': {
        description: 'Fabricante model instance',
        content: {'application/json': {schema: getModelSchemaRef(Partes)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Fabricante.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Partes, {
            title: 'NewPartesInFabricante',
            exclude: ['id'],
            optional: ['idFabricante']
          }),
        },
      },
    }) partes: Omit<Partes, 'id'>,
  ): Promise<Partes> {
    return this.fabricanteRepository.partes(id).create(partes);
  }

  @patch('/fabricantes/{id}/partes', {
    responses: {
      '200': {
        description: 'Fabricante.Partes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Partes, {partial: true}),
        },
      },
    })
    partes: Partial<Partes>,
    @param.query.object('where', getWhereSchemaFor(Partes)) where?: Where<Partes>,
  ): Promise<Count> {
    return this.fabricanteRepository.partes(id).patch(partes, where);
  }

  @del('/fabricantes/{id}/partes', {
    responses: {
      '200': {
        description: 'Fabricante.Partes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Partes)) where?: Where<Partes>,
  ): Promise<Count> {
    return this.fabricanteRepository.partes(id).delete(where);
  }
}
