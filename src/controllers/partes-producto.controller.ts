import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Partes,
  Producto,
} from '../models';
import {PartesRepository} from '../repositories';

export class PartesProductoController {
  constructor(
    @repository(PartesRepository)
    public partesRepository: PartesRepository,
  ) { }

  @get('/partes/{id}/producto', {
    responses: {
      '200': {
        description: 'Producto belonging to Partes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Producto)},
          },
        },
      },
    },
  })
  async getProducto(
    @param.path.number('id') id: typeof Partes.prototype.id,
  ): Promise<Producto> {
    return this.partesRepository.Productos(id);
  }
}
