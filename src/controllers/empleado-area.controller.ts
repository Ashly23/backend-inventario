import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Empleado,
  Area,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoAreaController {
  constructor(
    @repository(EmpleadoRepository)
    public empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/area', {
    responses: {
      '200': {
        description: 'Area belonging to Empleado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Area)},
          },
        },
      },
    },
  })
  async getArea(
    @param.path.number('id') id: typeof Empleado.prototype.id,
  ): Promise<Area> {
    return this.empleadoRepository.Areas(id);
  }
}
