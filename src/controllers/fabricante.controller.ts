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
import {Fabricante} from '../models';
import {FabricanteRepository} from '../repositories';

export class FabricanteController {
  constructor(
    @repository(FabricanteRepository)
    public fabricanteRepository: FabricanteRepository,
  ) { }

  @post('/fabricantes')
  @response(200, {
    description: 'Fabricante model instance',
    content: {'application/json': {schema: getModelSchemaRef(Fabricante)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Fabricante, {
            title: 'NewFabricante',
            exclude: ['id'],
          }),
        },
      },
    })
    fabricante: Omit<Fabricante, 'id'>,
  ): Promise<Fabricante> {
    return this.fabricanteRepository.create(fabricante);
  }

  @get('/fabricantes/count')
  @response(200, {
    description: 'Fabricante model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Fabricante) where?: Where<Fabricante>,
  ): Promise<Count> {
    return this.fabricanteRepository.count(where);
  }

  @get('/fabricantes')
  @response(200, {
    description: 'Array of Fabricante model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Fabricante, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Fabricante) filter?: Filter<Fabricante>,
  ): Promise<Fabricante[]> {
    return this.fabricanteRepository.find(filter);
  }

  @patch('/fabricantes')
  @response(200, {
    description: 'Fabricante PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Fabricante, {partial: true}),
        },
      },
    })
    fabricante: Fabricante,
    @param.where(Fabricante) where?: Where<Fabricante>,
  ): Promise<Count> {
    return this.fabricanteRepository.updateAll(fabricante, where);
  }

  @get('/fabricantes/{id}')
  @response(200, {
    description: 'Fabricante model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Fabricante, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Fabricante, {exclude: 'where'}) filter?: FilterExcludingWhere<Fabricante>
  ): Promise<Fabricante> {
    return this.fabricanteRepository.findById(id, filter);
  }

  @patch('/fabricantes/{id}')
  @response(204, {
    description: 'Fabricante PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Fabricante, {partial: true}),
        },
      },
    })
    fabricante: Fabricante,
  ): Promise<void> {
    await this.fabricanteRepository.updateById(id, fabricante);

    /* let filter = {"include": [{"relation": "Productos"}]}
     await this.fabricanteRepository.updateById(id, fabricante);
     let item = this.fabricanteRepository.findById(id, filter);
     console.log(item)
     return item
     */
  }

  @put('/fabricantes/{id}')
  @response(204, {
    description: 'Fabricante PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() fabricante: Fabricante,
  ): Promise<void> {
    await this.fabricanteRepository.replaceById(id, fabricante);
  }

  @del('/fabricantes/{id}')
  @response(204, {
    description: 'Fabricante DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.fabricanteRepository.deleteById(id);
  }
}
