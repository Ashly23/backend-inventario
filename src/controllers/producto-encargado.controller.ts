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
  Encargado,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoEncargadoController {
  constructor(
    @repository(ProductoRepository) protected productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/encargados', {
    responses: {
      '200': {
        description: 'Array of Producto has many Encargado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Encargado)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Encargado>,
  ): Promise<Encargado[]> {
    return this.productoRepository.encargados(id).find(filter);
  }

  @post('/productos/{id}/encargados', {
    responses: {
      '200': {
        description: 'Producto model instance',
        content: {'application/json': {schema: getModelSchemaRef(Encargado)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Producto.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Encargado, {
            title: 'NewEncargadoInProducto',
            exclude: ['id'],
            optional: ['idProducto']
          }),
        },
      },
    }) encargado: Omit<Encargado, 'id'>,
  ): Promise<Encargado> {
    return this.productoRepository.encargados(id).create(encargado);
  }

  @patch('/productos/{id}/encargados', {
    responses: {
      '200': {
        description: 'Producto.Encargado PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Encargado, {partial: true}),
        },
      },
    })
    encargado: Partial<Encargado>,
    @param.query.object('where', getWhereSchemaFor(Encargado)) where?: Where<Encargado>,
  ): Promise<Count> {
    return this.productoRepository.encargados(id).patch(encargado, where);
  }

  @del('/productos/{id}/encargados', {
    responses: {
      '200': {
        description: 'Producto.Encargado DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Encargado)) where?: Where<Encargado>,
  ): Promise<Count> {
    return this.productoRepository.encargados(id).delete(where);
  }
}
