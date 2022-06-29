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
import {Partes, PartesWithRelations} from '../models';
import {PartesRepository} from '../repositories';

export class PartesController {
  constructor(
    @repository(PartesRepository)
    public partesRepository: PartesRepository,
  ) { }

  @post('/partes')
  @response(200, {
    description: 'Partes model instance',
    content: {'application/json': {schema: getModelSchemaRef(Partes)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Partes, {
            title: 'NewPartes',
            exclude: ['id'],
          }),
        },
      },
    })
    partes: Omit<Partes, 'id'>,
  ): Promise<Partes> {
    let item = await this.partesRepository.create(partes);
    //console.log(item)
    return this.partesRepository.findById(item.id, {"include": [{"relation": "Fabricantes"}, {"relation": "Productos"} ]});
  }

  @get('/partes/count')
  @response(200, {
    description: 'Partes model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Partes) where?: Where<Partes>,
  ): Promise<Count> {
    return this.partesRepository.count(where);
  }

  @get('/partes')
  @response(200, {
    description: 'Array of Partes model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Partes, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Partes) filter?: Filter<Partes>,
  ): Promise<Partes[]> {
    return this.partesRepository.find(filter);
  }

  @patch('/partes')
  @response(200, {
    description: 'Partes PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Partes, {partial: true}),
        },
      },
    })
    partes: Partes,
    @param.where(Partes) where?: Where<Partes>,
  ): Promise<Count> {
    return this.partesRepository.updateAll(partes, where);
  }

  @get('/partes/{id}')
  @response(200, {
    description: 'Partes model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Partes, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Partes, {exclude: 'where'}) filter?: FilterExcludingWhere<Partes>
  ): Promise<Partes> {
    return this.partesRepository.findById(id, filter);
  }

  @patch('/partes/{id}')
  @response(204, {
    description: 'Partes PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Partes, {partial: true}),
        },
      },
    })
    partes: Partes,
  ): Promise<PartesWithRelations> {
    await this.partesRepository.updateById(id, partes);
    //modificar
    return this.partesRepository.findById(id, {"include": [{"relation": "Fabricantes"}, {"relation": "Productos"}]}); 
  }

  @put('/partes/{id}')
  @response(204, {
    description: 'Partes PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() partes: Partes,
  ): Promise<void> {
    await this.partesRepository.replaceById(id, partes);
  }

  @del('/partes/{id}')
  @response(204, {
    description: 'Partes DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.partesRepository.deleteById(id);
  }
}
