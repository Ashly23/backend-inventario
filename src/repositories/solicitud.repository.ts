import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {CannDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, Empleado, Partes} from '../models';
import {EmpleadoRepository} from './empleado.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.id,
  SolicitudRelations
> {

  public readonly Empleados: BelongsToAccessor<Empleado, typeof Solicitud.prototype.id>;

  constructor(
    @inject('datasources.cann') dataSource: CannDataSource, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>, 
  ) {
    super(Solicitud, dataSource);
    this.Empleados = this.createBelongsToAccessorFor('Empleados', empleadoRepositoryGetter,);
    this.registerInclusionResolver('Empleados', this.Empleados.inclusionResolver);
  }
}
