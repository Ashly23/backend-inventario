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
  Garantia,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoGarantiaController {
  constructor(
    @repository(ProductoRepository)
    public productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/garantia', {
    responses: {
      '200': {
        description: 'Garantia belonging to Producto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Garantia)},
          },
        },
      },
    },
  })
  async getGarantia(
    @param.path.number('id') id: typeof Producto.prototype.id,
  ): Promise<Garantia> {
    return this.productoRepository.Garantias(id);
  }
}
