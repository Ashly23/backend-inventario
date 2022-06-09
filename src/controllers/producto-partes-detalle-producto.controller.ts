import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ProductoPartesDetalle,
  Producto,
} from '../models';
import {ProductoPartesDetalleRepository} from '../repositories';

export class ProductoPartesDetalleProductoController {
  constructor(
    @repository(ProductoPartesDetalleRepository)
    public productoPartesDetalleRepository: ProductoPartesDetalleRepository,
  ) { }

  @get('/producto-partes-detalles/{id}/producto', {
    responses: {
      '200': {
        description: 'Producto belonging to ProductoPartesDetalle',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Producto)},
          },
        },
      },
    },
  })
  async getProducto(
    @param.path.number('id') id: typeof ProductoPartesDetalle.prototype.id,
  ): Promise<Producto> {
    return this.productoPartesDetalleRepository.Productos(id);
  }
}
