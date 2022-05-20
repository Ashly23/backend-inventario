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
import {Categorias} from '../models';
import {CategoriasRepository} from '../repositories';

export class CategoriasController {
  constructor(
    @repository(CategoriasRepository)
    public CategoriasRepository: CategoriasRepository,
  ) { }

  @post('/Categorias')
  @response(200, {
    description: 'Categorias model instance',
    content: {'application/json': {schema: getModelSchemaRef(Categorias)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Categorias, {
            title: 'NewCategorias',
            exclude: ['id'],
          }),
        },
      },
    })
    Categorias: Omit<Categorias, 'id'>,
  ): Promise<Categorias> {
    return this.CategoriasRepository.create(Categorias);
  }

  @get('/Categorias/count')
  @response(200, {
    description: 'Categorias model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Categorias) where?: Where<Categorias>,
  ): Promise<Count> {
    return this.CategoriasRepository.count(where);
  }

  @get('/Categorias')
  @response(200, {
    description: 'Array of Categorias model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Categorias, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Categorias) filter?: Filter<Categorias>,
  ): Promise<Categorias[]> {
    return this.CategoriasRepository.find(filter);
  }

  @patch('/Categorias')
  @response(200, {
    description: 'Categorias PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Categorias, {partial: true}),
        },
      },
    })
    Categorias: Categorias,
    @param.where(Categorias) where?: Where<Categorias>,
  ): Promise<Count> {
    return this.CategoriasRepository.updateAll(Categorias, where);
  }

  @get('/Categorias/{id}')
  @response(200, {
    description: 'Categorias model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Categorias, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Categorias, {exclude: 'where'}) filter?: FilterExcludingWhere<Categorias>
  ): Promise<Categorias> {
    return this.CategoriasRepository.findById(id, filter);
  }

  @patch('/Categorias/{id}')
  @response(204, {
    description: 'Categorias PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Categorias, {partial: true}),
        },
      },
    })
    Categorias: Categorias,
  ): Promise<void> {
    await this.CategoriasRepository.updateById(id, Categorias);
  }

  @put('/Categorias/{id}')
  @response(204, {
    description: 'Categorias PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() Categorias: Categorias,
  ): Promise<void> {
    await this.CategoriasRepository.replaceById(id, Categorias);
  }

  @del('/Categorias/{id}')
  @response(204, {
    description: 'Categorias DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.CategoriasRepository.deleteById(id);
  }
}
