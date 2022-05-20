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
  Area,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoAreaController {
  constructor(
    @repository(ProductoRepository)
    public productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/area', {
    responses: {
      '200': {
        description: 'Area belonging to Producto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Area)},
          },
        },
      },
    },
  })
  async getArea(
    @param.path.number('id') id: typeof Producto.prototype.id,
  ): Promise<Area> {
    return this.productoRepository.area(id);
  }
}
