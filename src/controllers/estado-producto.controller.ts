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
import {EstadoProducto} from '../models';
import {EstadoProductoRepository} from '../repositories';

export class EstadoProductoController {
  constructor(
    @repository(EstadoProductoRepository)
    public estadoProductoRepository: EstadoProductoRepository,
  ) { }

  @post('/estado-productos')
  @response(200, {
    description: 'EstadoProducto model instance',
    content: {'application/json': {schema: getModelSchemaRef(EstadoProducto)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoProducto, {
            title: 'NewEstadoProducto',
            exclude: ['id'],
          }),
        },
      },
    })
    estadoProducto: Omit<EstadoProducto, 'id'>,
  ): Promise<EstadoProducto> {
    return this.estadoProductoRepository.create(estadoProducto);
  }

  @get('/estado-productos/count')
  @response(200, {
    description: 'EstadoProducto model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EstadoProducto) where?: Where<EstadoProducto>,
  ): Promise<Count> {
    return this.estadoProductoRepository.count(where);
  }

  @get('/estado-productos')
  @response(200, {
    description: 'Array of EstadoProducto model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EstadoProducto, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EstadoProducto) filter?: Filter<EstadoProducto>,
  ): Promise<EstadoProducto[]> {
    return this.estadoProductoRepository.find(filter);
  }

  @patch('/estado-productos')
  @response(200, {
    description: 'EstadoProducto PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoProducto, {partial: true}),
        },
      },
    })
    estadoProducto: EstadoProducto,
    @param.where(EstadoProducto) where?: Where<EstadoProducto>,
  ): Promise<Count> {
    return this.estadoProductoRepository.updateAll(estadoProducto, where);
  }

  @get('/estado-productos/{id}')
  @response(200, {
    description: 'EstadoProducto model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EstadoProducto, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EstadoProducto, {exclude: 'where'}) filter?: FilterExcludingWhere<EstadoProducto>
  ): Promise<EstadoProducto> {
    return this.estadoProductoRepository.findById(id, filter);
  }

  @patch('/estado-productos/{id}')
  @response(204, {
    description: 'EstadoProducto PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoProducto, {partial: true}),
        },
      },
    })
    estadoProducto: EstadoProducto,
  ): Promise<void> {
    await this.estadoProductoRepository.updateById(id, estadoProducto);
  }

  @put('/estado-productos/{id}')
  @response(204, {
    description: 'EstadoProducto PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() estadoProducto: EstadoProducto,
  ): Promise<void> {
    await this.estadoProductoRepository.replaceById(id, estadoProducto);
  }

  @del('/estado-productos/{id}')
  @response(204, {
    description: 'EstadoProducto DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.estadoProductoRepository.deleteById(id);
  }
}
