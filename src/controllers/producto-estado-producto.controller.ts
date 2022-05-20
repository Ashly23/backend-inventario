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
  EstadoProducto,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoEstadoProductoController {
  constructor(
    @repository(ProductoRepository)
    public productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/estado-producto', {
    responses: {
      '200': {
        description: 'EstadoProducto belonging to Producto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(EstadoProducto)},
          },
        },
      },
    },
  })
  async getEstadoProducto(
    @param.path.number('id') id: typeof Producto.prototype.id,
  ): Promise<EstadoProducto> {
    return this.productoRepository.estadoProducto(id);
  }
}
