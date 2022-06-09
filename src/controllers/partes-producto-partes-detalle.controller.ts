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
  ProductoPartesDetalle,
} from '../models';
import {PartesRepository} from '../repositories';

export class PartesProductoPartesDetalleController {
  constructor(
    @repository(PartesRepository) protected partesRepository: PartesRepository,
  ) { }

  @get('/partes/{id}/producto-partes-detalles', {
    responses: {
      '200': {
        description: 'Array of Partes has many ProductoPartesDetalle',
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
    return this.partesRepository.productoPartesDetalles(id).find(filter);
  }

  @post('/partes/{id}/producto-partes-detalles', {
    responses: {
      '200': {
        description: 'Partes model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProductoPartesDetalle)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Partes.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductoPartesDetalle, {
            title: 'NewProductoPartesDetalleInPartes',
            exclude: ['id'],
            optional: ['idParte']
          }),
        },
      },
    }) productoPartesDetalle: Omit<ProductoPartesDetalle, 'id'>,
  ): Promise<ProductoPartesDetalle> {
    return this.partesRepository.productoPartesDetalles(id).create(productoPartesDetalle);
  }

  @patch('/partes/{id}/producto-partes-detalles', {
    responses: {
      '200': {
        description: 'Partes.ProductoPartesDetalle PATCH success count',
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
    return this.partesRepository.productoPartesDetalles(id).patch(productoPartesDetalle, where);
  }

  @del('/partes/{id}/producto-partes-detalles', {
    responses: {
      '200': {
        description: 'Partes.ProductoPartesDetalle DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ProductoPartesDetalle)) where?: Where<ProductoPartesDetalle>,
  ): Promise<Count> {
    return this.partesRepository.productoPartesDetalles(id).delete(where);
  }
}
