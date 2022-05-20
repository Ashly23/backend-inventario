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
  Partes,
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
    return this.productoRepository.partes(id);
  }
}
