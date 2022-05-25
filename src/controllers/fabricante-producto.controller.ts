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
  Fabricante,
  Producto,
} from '../models';
import {FabricanteRepository} from '../repositories';

export class FabricanteProductoController {
  constructor(
    @repository(FabricanteRepository) protected fabricanteRepository: FabricanteRepository,
  ) { }

  @get('/fabricantes/{id}/productos', {
    responses: {
      '200': {
        description: 'Array of Fabricante has many Producto',
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
    return this.fabricanteRepository.productos(id).find(filter);
  }

  @post('/fabricantes/{id}/productos', {
    responses: {
      '200': {
        description: 'Fabricante model instance',
        content: {'application/json': {schema: getModelSchemaRef(Producto)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Fabricante.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {
            title: 'NewProductoInFabricante',
            exclude: ['id'],
            optional: ['idFabricante']
          }),
        },
      },
    }) producto: Omit<Producto, 'id'>,
  ): Promise<Producto> {
    return this.fabricanteRepository.productos(id).create(producto);
  }

  @patch('/fabricantes/{id}/productos', {
    responses: {
      '200': {
        description: 'Fabricante.Producto PATCH success count',
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
    return this.fabricanteRepository.productos(id).patch(producto, where);
  }

  @del('/fabricantes/{id}/productos', {
    responses: {
      '200': {
        description: 'Fabricante.Producto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.fabricanteRepository.productos(id).delete(where);
  }
}
