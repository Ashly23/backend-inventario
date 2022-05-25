import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Producto,
  Categorias,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoCategoriasController {
  constructor(
    @repository(ProductoRepository)
    public productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/categorias', {
    responses: {
      '200': {
        description: 'Categorias belonging to Producto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Categorias)},
          },
        },
      },
    },
  })
  async getCategorias(
    @param.path.number('id') id: typeof Producto.prototype.id,
  ): Promise<Categorias> {
    return this.productoRepository.Categorias(id);
  }
}
