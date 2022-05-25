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
  Empleado,
} from '../models';
import {EncargadoRepository} from '../repositories';

export class EncargadoEmpleadoController {
  constructor(
    @repository(EncargadoRepository)
    public encargadoRepository: EncargadoRepository,
  ) { }

  @get('/encargados/{id}/empleado', {
    responses: {
      '200': {
        description: 'Empleado belonging to Encargado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empleado)},
          },
        },
      },
    },
  })
  async getEmpleado(
    @param.path.number('id') id: typeof Encargado.prototype.id,
  ): Promise<Empleado> {
    return this.encargadoRepository.Empleados(id);
  }
}
