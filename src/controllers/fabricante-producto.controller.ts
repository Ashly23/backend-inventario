import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Fabricante,
  Producto
} from '../models';
import {FabricanteRepository} from '../repositories';

export class FabricanteProductoController {
  constructor(
    @repository(FabricanteRepository)
    public fabricanteRepository: FabricanteRepository,
  ) { }

  @get('/fabricantes/{id}/producto', {
    responses: {
      '200': {
        description: 'Producto belonging to Fabricante',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Producto)},
          },
        },
      },
    },
  })
  async getProducto(
    @param.path.number('id') id: typeof Fabricante.prototype.id,
  ): Promise<Producto> {
    return this.fabricanteRepository.Productos(id);
  }
}
