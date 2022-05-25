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
  Fabricante,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoFabricanteController {
  constructor(
    @repository(ProductoRepository)
    public productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/fabricante', {
    responses: {
      '200': {
        description: 'Fabricante belonging to Producto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Fabricante)},
          },
        },
      },
    },
  })
  async getFabricante(
    @param.path.number('id') id: typeof Producto.prototype.id,
  ): Promise<Fabricante> {
    return this.productoRepository.Fabricantes(id);
  }
}
