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
  Partes,
} from '../models';
import {ProductoPartesDetalleRepository} from '../repositories';

export class ProductoPartesDetallePartesController {
  constructor(
    @repository(ProductoPartesDetalleRepository)
    public productoPartesDetalleRepository: ProductoPartesDetalleRepository,
  ) { }

  @get('/producto-partes-detalles/{id}/partes', {
    responses: {
      '200': {
        description: 'Partes belonging to ProductoPartesDetalle',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Partes)},
          },
        },
      },
    },
  })
  async getPartes(
    @param.path.number('id') id: typeof ProductoPartesDetalle.prototype.id,
  ): Promise<Partes> {
    return this.productoPartesDetalleRepository.Partes(id);
  }
}
