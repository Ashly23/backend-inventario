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
  Partes,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoPartesController {
  constructor(
    @repository(ProductoRepository) protected productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/partes', {
    responses: {
      '200': {
        description: 'Array of Producto has many Partes',
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
    return this.productoRepository.partes(id).find(filter);
  }

  @post('/productos/{id}/partes', {
    responses: {
      '200': {
        description: 'Producto model instance',
        content: {'application/json': {schema: getModelSchemaRef(Partes)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Producto.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Partes, {
            title: 'NewPartesInProducto',
            exclude: ['id'],
            optional: ['idProducto']
          }),
        },
      },
    }) partes: Omit<Partes, 'id'>,
  ): Promise<Partes> {
    return this.productoRepository.partes(id).create(partes);
  }

  @patch('/productos/{id}/partes', {
    responses: {
      '200': {
        description: 'Producto.Partes PATCH success count',
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
    return this.productoRepository.partes(id).patch(partes, where);
  }

  @del('/productos/{id}/partes', {
    responses: {
      '200': {
        description: 'Producto.Partes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Partes)) where?: Where<Partes>,
  ): Promise<Count> {
    return this.productoRepository.partes(id).delete(where);
  }
}
