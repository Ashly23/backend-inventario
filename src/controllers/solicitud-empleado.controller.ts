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
  Empleado,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudEmpleadoController {
  constructor(
    @repository(SolicitudRepository)
    public solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicitud/{id}/empleado', {
    responses: {
      '200': {
        description: 'Empleado belonging to Solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empleado)},
          },
        },
      },
    },
  })
  async getEmpleado(
    @param.path.number('id') id: typeof Solicitud.prototype.id,
  ): Promise<Empleado> {
    return this.solicitudRepository.Empleados(id);
  }
}
