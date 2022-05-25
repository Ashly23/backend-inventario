import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Encargado,
  Producto,
} from '../models';
import {EncargadoRepository} from '../repositories';

export class EncargadoProductoController {
  constructor(
    @repository(EncargadoRepository)
    public encargadoRepository: EncargadoRepository,
  ) { }

  @get('/encargados/{id}/producto', {
    responses: {
      '200': {
        description: 'Producto belonging to Encargado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Producto)},
          },
        },
      },
    },
  })
  async getProducto(
    @param.path.number('id') id: typeof Encargado.prototype.id,
  ): Promise<Producto> {
    return this.encargadoRepository.Productos(id);
  }
}
