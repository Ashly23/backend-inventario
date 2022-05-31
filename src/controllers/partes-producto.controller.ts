import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  Partes,
  Producto
} from '../models';
import {PartesRepository} from '../repositories';

export class PartesProductoController {
  constructor(
    @repository(PartesRepository) protected partesRepository: PartesRepository,
  ) { }

  @get('/partes/{id}/productos', {
    responses: {
      '200': {
        description: 'Array of Partes has many Producto',
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
    return this.partesRepository.productos(id).find(filter);
  }

  @post('/partes/{id}/productos', {
    responses: {
      '200': {
        description: 'Partes model instance',
        content: {'application/json': {schema: getModelSchemaRef(Producto)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Partes.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {
            title: 'NewProductoInPartes',
            exclude: ['id'],
            optional: ['idPartes']
          }),
        },
      },
    }) producto: Omit<Producto, 'id'>,
  ): Promise<Producto> {
    return this.partesRepository.productos(id).create(producto);
  }

  @patch('/partes/{id}/productos', {
    responses: {
      '200': {
        description: 'Partes.Producto PATCH success count',
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
    return this.partesRepository.productos(id).patch(producto, where);
  }

  @del('/partes/{id}/productos', {
    responses: {
      '200': {
        description: 'Partes.Producto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.partesRepository.productos(id).delete(where);
  }
}
