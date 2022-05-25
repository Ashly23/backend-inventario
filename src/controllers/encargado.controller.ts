import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Encargado} from '../models';
import {EncargadoRepository} from '../repositories';

export class EncargadoController {
  constructor(
    @repository(EncargadoRepository)
    public encargadoRepository: EncargadoRepository,
  ) { }

  @post('/encargados')
  @response(200, {
    description: 'Encargado model instance',
    content: {'application/json': {schema: getModelSchemaRef(Encargado)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Encargado, {
            title: 'NewEncargado',
            exclude: ['id'],
          }),
        },
      },
    })
    encargado: Omit<Encargado, 'id'>,
  ): Promise<Encargado> {
    return this.encargadoRepository.create(encargado);
  }

  @get('/encargados/count')
  @response(200, {
    description: 'Encargado model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Encargado) where?: Where<Encargado>,
  ): Promise<Count> {
    return this.encargadoRepository.count(where);
  }

  @get('/encargados')
  @response(200, {
    description: 'Array of Encargado model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Encargado, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Encargado) filter?: Filter<Encargado>,
  ): Promise<Encargado[]> {
    return this.encargadoRepository.find(filter);
  }

  @patch('/encargados')
  @response(200, {
    description: 'Encargado PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Encargado, {partial: true}),
        },
      },
    })
    encargado: Encargado,
    @param.where(Encargado) where?: Where<Encargado>,
  ): Promise<Count> {
    return this.encargadoRepository.updateAll(encargado, where);
  }

  @get('/encargados/{id}')
  @response(200, {
    description: 'Encargado model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Encargado, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: number,
    @param.filter(Encargado, {exclude: 'where'}) filter?: FilterExcludingWhere<Encargado>
  ): Promise<Encargado> {
    return this.encargadoRepository.findById(id, filter);
  }

  @patch('/encargados/{id}')
  @response(204, {
    description: 'Encargado PATCH success',
  })
  async updateById(
    @param.path.string('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Encargado, {partial: true}),
        },
      },
    })
    encargado: Encargado,
  ): Promise<void> {
    await this.encargadoRepository.updateById(id, encargado);
  }

  @put('/encargados/{id}')
  @response(204, {
    description: 'Encargado PUT success',
  })
  async replaceById(
    @param.path.string('id') id: number,
    @requestBody() encargado: Encargado,
  ): Promise<void> {
    await this.encargadoRepository.replaceById(id, encargado);
  }

  @del('/encargados/{id}')
  @response(204, {
    description: 'Encargado DELETE success',
  })
  async deleteById(@param.path.string('id') id: number): Promise<void> {
    await this.encargadoRepository.deleteById(id);
  }
}
