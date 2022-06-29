import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Solicitud,
  Producto,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudProductoController {
  constructor(
    @repository(SolicitudRepository)
    public solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicitud/{id}/producto', {
    responses: {
      '200': {
        description: 'Producto belonging to Solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Producto)},
          },
        },
      },
    },
  })
  async getProducto(
    @param.path.number('id') id: typeof Solicitud.prototype.id,
  ): Promise<Producto> {
    return this.solicitudRepository.Productos(id);
  }
}
