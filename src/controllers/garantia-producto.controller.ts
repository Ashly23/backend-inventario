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
  Garantia,
  Producto,
} from '../models';
import {GarantiaRepository} from '../repositories';

export class GarantiaProductoController {
  constructor(
    @repository(GarantiaRepository) protected garantiaRepository: GarantiaRepository,
  ) { }

  @get('/garantias/{id}/productos', {
    responses: {
      '200': {
        description: 'Array of Garantia has many Producto',
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
    return this.garantiaRepository.productos(id).find(filter);
  }

  @post('/garantias/{id}/productos', {
    responses: {
      '200': {
        description: 'Garantia model instance',
        content: {'application/json': {schema: getModelSchemaRef(Producto)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Garantia.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {
            title: 'NewProductoInGarantia',
            exclude: ['id'],
            optional: ['idGarantia']
          }),
        },
      },
    }) producto: Omit<Producto, 'id'>,
  ): Promise<Producto> {
    return this.garantiaRepository.productos(id).create(producto);
  }

  @patch('/garantias/{id}/productos', {
    responses: {
      '200': {
        description: 'Garantia.Producto PATCH success count',
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
    return this.garantiaRepository.productos(id).patch(producto, where);
  }

  @del('/garantias/{id}/productos', {
    responses: {
      '200': {
        description: 'Garantia.Producto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.garantiaRepository.productos(id).delete(where);
  }
}
