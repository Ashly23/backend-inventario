import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Empleado,
  Solicitud,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoSolicitudController {
  constructor(
    @repository(EmpleadoRepository) protected empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/solicitud', {
    responses: {
      '200': {
        description: 'Array of Empleado has many Solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitud)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Solicitud>,
  ): Promise<Solicitud[]> {
    return this.empleadoRepository.solicitud(id).find(filter);
  }

  @post('/empleados/{id}/solicitud', {
    responses: {
      '200': {
        description: 'Empleado model instance',
        content: {'application/json': {schema: getModelSchemaRef(Solicitud)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Empleado.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {
            title: 'NewSolicitudInEmpleado',
            exclude: ['id'],
            optional: ['idEmpleado']
          }),
        },
      },
    }) solicitud: Omit<Solicitud, 'id'>,
  ): Promise<Solicitud> {
    return this.empleadoRepository.solicitud(id).create(solicitud);
  }

  @patch('/empleados/{id}/solicitud', {
    responses: {
      '200': {
        description: 'Empleado.Solicitud PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {partial: true}),
        },
      },
    })
    solicitud: Partial<Solicitud>,
    @param.query.object('where', getWhereSchemaFor(Solicitud)) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.empleadoRepository.solicitud(id).patch(solicitud, where);
  }

  @del('/empleados/{id}/solicitud', {
    responses: {
      '200': {
        description: 'Empleado.Solicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Solicitud)) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.empleadoRepository.solicitud(id).delete(where);
  }
}
