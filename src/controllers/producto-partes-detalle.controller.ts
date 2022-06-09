import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {ProductoPartesDetalle} from '../models';
import {ProductoPartesDetalleRepository} from '../repositories';

export class ProductoPartesDetalleController {
  constructor(
    @repository(ProductoPartesDetalleRepository)
    public productoPartesDetalleRepository : ProductoPartesDetalleRepository,
  ) {}

  @post('/producto-partes-detalles')
  @response(200, {
    description: 'ProductoPartesDetalle model instance',
    content: {'application/json': {schema: getModelSchemaRef(ProductoPartesDetalle)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductoPartesDetalle, {
            title: 'NewProductoPartesDetalle',
            exclude: ['id'],
          }),
        },
      },
    })
    productoPartesDetalle: Omit<ProductoPartesDetalle, 'id'>,
  ): Promise<ProductoPartesDetalle> {
    return this.productoPartesDetalleRepository.create(productoPartesDetalle);
  }

  @get('/producto-partes-detalles/count')
  @response(200, {
    description: 'ProductoPartesDetalle model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ProductoPartesDetalle) where?: Where<ProductoPartesDetalle>,
  ): Promise<Count> {
    return this.productoPartesDetalleRepository.count(where);
  }

  @get('/producto-partes-detalles')
  @response(200, {
    description: 'Array of ProductoPartesDetalle model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ProductoPartesDetalle, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ProductoPartesDetalle) filter?: Filter<ProductoPartesDetalle>,
  ): Promise<ProductoPartesDetalle[]> {
    return this.productoPartesDetalleRepository.find(filter);
  }

  @patch('/producto-partes-detalles')
  @response(200, {
    description: 'ProductoPartesDetalle PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductoPartesDetalle, {partial: true}),
        },
      },
    })
    productoPartesDetalle: ProductoPartesDetalle,
    @param.where(ProductoPartesDetalle) where?: Where<ProductoPartesDetalle>,
  ): Promise<Count> {
    return this.productoPartesDetalleRepository.updateAll(productoPartesDetalle, where);
  }

  @get('/producto-partes-detalles/{id}')
  @response(200, {
    description: 'ProductoPartesDetalle model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ProductoPartesDetalle, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ProductoPartesDetalle, {exclude: 'where'}) filter?: FilterExcludingWhere<ProductoPartesDetalle>
  ): Promise<ProductoPartesDetalle> {
    return this.productoPartesDetalleRepository.findById(id, filter);
  }

  @patch('/producto-partes-detalles/{id}')
  @response(204, {
    description: 'ProductoPartesDetalle PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductoPartesDetalle, {partial: true}),
        },
      },
    })
    productoPartesDetalle: ProductoPartesDetalle,
  ): Promise<void> {
    await this.productoPartesDetalleRepository.updateById(id, productoPartesDetalle);
  }

  @put('/producto-partes-detalles/{id}')
  @response(204, {
    description: 'ProductoPartesDetalle PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() productoPartesDetalle: ProductoPartesDetalle,
  ): Promise<void> {
    await this.productoPartesDetalleRepository.replaceById(id, productoPartesDetalle);
  }

  @del('/producto-partes-detalles/{id}')
  @response(204, {
    description: 'ProductoPartesDetalle DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.productoPartesDetalleRepository.deleteById(id);
  }
}
