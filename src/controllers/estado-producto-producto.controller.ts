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
  EstadoProducto,
  Producto,
} from '../models';
import {EstadoProductoRepository} from '../repositories';

export class EstadoProductoProductoController {
  constructor(
    @repository(EstadoProductoRepository) protected estadoProductoRepository: EstadoProductoRepository,
  ) { }

  @get('/estado-productos/{id}/productos', {
    responses: {
      '200': {
        description: 'Array of EstadoProducto has many Producto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Producto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Producto>,
  ): Promise<Producto[]> {
    return this.estadoProductoRepository.productos(id).find(filter);
  }

  @post('/estado-productos/{id}/productos', {
    responses: {
      '200': {
        description: 'EstadoProducto model instance',
        content: {'application/json': {schema: getModelSchemaRef(Producto)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof EstadoProducto.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {
            title: 'NewProductoInEstadoProducto',
            exclude: ['id'],
            optional: ['estadoProductoId']
          }),
        },
      },
    }) producto: Omit<Producto, 'id'>,
  ): Promise<Producto> {
    return this.estadoProductoRepository.productos(id).create(producto);
  }

  @patch('/estado-productos/{id}/productos', {
    responses: {
      '200': {
        description: 'EstadoProducto.Producto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {partial: true}),
        },
      },
    })
    producto: Partial<Producto>,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.estadoProductoRepository.productos(id).patch(producto, where);
  }

  @del('/estado-productos/{id}/productos', {
    responses: {
      '200': {
        description: 'EstadoProducto.Producto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.estadoProductoRepository.productos(id).delete(where);
  }
}
