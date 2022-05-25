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
  Categorias,
  Producto,
} from '../models';
import {CategoriasRepository} from '../repositories';

export class CategoriasProductoController {
  constructor(
    @repository(CategoriasRepository) protected categoriasRepository: CategoriasRepository,
  ) { }

  @get('/categorias/{id}/productos', {
    responses: {
      '200': {
        description: 'Array of Categorias has many Producto',
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
    return this.categoriasRepository.productos(id).find(filter);
  }

  @post('/categorias/{id}/productos', {
    responses: {
      '200': {
        description: 'Categorias model instance',
        content: {'application/json': {schema: getModelSchemaRef(Producto)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Categorias.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {
            title: 'NewProductoInCategorias',
            exclude: ['id'],
            optional: ['idCategorias']
          }),
        },
      },
    }) producto: Omit<Producto, 'id'>,
  ): Promise<Producto> {
    return this.categoriasRepository.productos(id).create(producto);
  }

  @patch('/categorias/{id}/productos', {
    responses: {
      '200': {
        description: 'Categorias.Producto PATCH success count',
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
    return this.categoriasRepository.productos(id).patch(producto, where);
  }

  @del('/categorias/{id}/productos', {
    responses: {
      '200': {
        description: 'Categorias.Producto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.categoriasRepository.productos(id).delete(where);
  }
}
