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
  Area,
  Empleado,
} from '../models';
import {AreaRepository} from '../repositories';

export class AreaEmpleadoController {
  constructor(
    @repository(AreaRepository) protected areaRepository: AreaRepository,
  ) { }

  @get('/areas/{id}/empleados', {
    responses: {
      '200': {
        description: 'Array of Area has many Empleado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empleado)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Empleado>,
  ): Promise<Empleado[]> {
    return this.areaRepository.empleados(id).find(filter);
  }

  @post('/areas/{id}/empleados', {
    responses: {
      '200': {
        description: 'Area model instance',
        content: {'application/json': {schema: getModelSchemaRef(Empleado)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Area.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {
            title: 'NewEmpleadoInArea',
            exclude: ['id'],
            optional: ['idArea']
          }),
        },
      },
    }) empleado: Omit<Empleado, 'id'>,
  ): Promise<Empleado> {
    return this.areaRepository.empleados(id).create(empleado);
  }

  @patch('/areas/{id}/empleados', {
    responses: {
      '200': {
        description: 'Area.Empleado PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {partial: true}),
        },
      },
    })
    empleado: Partial<Empleado>,
    @param.query.object('where', getWhereSchemaFor(Empleado)) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.areaRepository.empleados(id).patch(empleado, where);
  }

  @del('/areas/{id}/empleados', {
    responses: {
      '200': {
        description: 'Area.Empleado DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Empleado)) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.areaRepository.empleados(id).delete(where);
  }
}
