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
  Area,
  Producto,
} from '../models';
import {AreaRepository} from '../repositories';

export class AreaProductoController {
  constructor(
    @repository(AreaRepository) protected areaRepository: AreaRepository,
  ) { }

  @get('/areas/{id}/productos', {
    responses: {
      '200': {
        description: 'Array of Area has many Producto',
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
    return this.areaRepository.productos(id).find(filter);
  }

  @post('/areas/{id}/productos', {
    responses: {
      '200': {
        description: 'Area model instance',
        content: {'application/json': {schema: getModelSchemaRef(Producto)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Area.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {
            title: 'NewProductoInArea',
            exclude: ['id'],
            optional: ['areaId']
          }),
        },
      },
    }) producto: Omit<Producto, 'id'>,
  ): Promise<Producto> {
    return this.areaRepository.productos(id).create(producto);
  }

  @patch('/areas/{id}/productos', {
    responses: {
      '200': {
        description: 'Area.Producto PATCH success count',
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
    return this.areaRepository.productos(id).patch(producto, where);
  }

  @del('/areas/{id}/productos', {
    responses: {
      '200': {
        description: 'Area.Producto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.areaRepository.productos(id).delete(where);
  }
}
