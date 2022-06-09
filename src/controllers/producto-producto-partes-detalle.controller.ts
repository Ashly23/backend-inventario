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
  Producto,
  ProductoPartesDetalle,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoProductoPartesDetalleController {
  constructor(
    @repository(ProductoRepository) protected productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/producto-partes-detalles', {
    responses: {
      '200': {
        description: 'Array of Producto has many ProductoPartesDetalle',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProductoPartesDetalle)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ProductoPartesDetalle>,
  ): Promise<ProductoPartesDetalle[]> {
    return this.productoRepository.productoPartesDetalles(id).find(filter);
  }

  @post('/productos/{id}/producto-partes-detalles', {
    responses: {
      '200': {
        description: 'Producto model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProductoPartesDetalle)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Producto.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductoPartesDetalle, {
            title: 'NewProductoPartesDetalleInProducto',
            exclude: ['id'],
            optional: ['idProducto']
          }),
        },
      },
    }) productoPartesDetalle: Omit<ProductoPartesDetalle, 'id'>,
  ): Promise<ProductoPartesDetalle> {
    return this.productoRepository.productoPartesDetalles(id).create(productoPartesDetalle);
  }

  @patch('/productos/{id}/producto-partes-detalles', {
    responses: {
      '200': {
        description: 'Producto.ProductoPartesDetalle PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductoPartesDetalle, {partial: true}),
        },
      },
    })
    productoPartesDetalle: Partial<ProductoPartesDetalle>,
    @param.query.object('where', getWhereSchemaFor(ProductoPartesDetalle)) where?: Where<ProductoPartesDetalle>,
  ): Promise<Count> {
    return this.productoRepository.productoPartesDetalles(id).patch(productoPartesDetalle, where);
  }

  @del('/productos/{id}/producto-partes-detalles', {
    responses: {
      '200': {
        description: 'Producto.ProductoPartesDetalle DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ProductoPartesDetalle)) where?: Where<ProductoPartesDetalle>,
  ): Promise<Count> {
    return this.productoRepository.productoPartesDetalles(id).delete(where);
  }
}
