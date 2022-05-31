import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Garantia,
  Producto
} from '../models';
import {GarantiaRepository} from '../repositories';

export class GarantiaProductoController {
  constructor(
    @repository(GarantiaRepository)
    public garantiaRepository: GarantiaRepository,
  ) { }

  @get('/garantias/{id}/producto', {
    responses: {
      '200': {
        description: 'Producto belonging to Garantia',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Producto)},
          },
        },
      },
    },
  })
  async getProducto(
    @param.path.number('id') id: typeof Garantia.prototype.id,
  ): Promise<Producto> {
    return this.garantiaRepository.Productos(id);
  }
}
