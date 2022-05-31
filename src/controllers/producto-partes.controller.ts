import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Partes, Producto
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoPartesController {
  constructor(
    @repository(ProductoRepository)
    public productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/partes', {
    responses: {
      '200': {
        description: 'Partes belonging to Producto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Partes)},
          },
        },
      },
    },
  })
  async getPartes(
    @param.path.number('id') id: typeof Producto.prototype.id,
  ): Promise<Partes> {
    return this.productoRepository.Parte(id);
  }
}
