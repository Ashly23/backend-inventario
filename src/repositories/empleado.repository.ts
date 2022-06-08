import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {CannDataSource} from '../datasources';
import {Empleado, EmpleadoRelations, Area} from '../models';
import {AreaRepository} from './area.repository';

export class EmpleadoRepository extends DefaultCrudRepository<
  Empleado,
  typeof Empleado.prototype.id,
  EmpleadoRelations
> {

  public readonly Areas: BelongsToAccessor<Area, typeof Empleado.prototype.id>;

  constructor(
    @inject('datasources.cann') dataSource: CannDataSource, @repository.getter('AreaRepository') protected areaRepositoryGetter: Getter<AreaRepository>,
  ) {
    super(Empleado, dataSource);
    this.Areas = this.createBelongsToAccessorFor('Areas', areaRepositoryGetter,);
    this.registerInclusionResolver('Areas', this.Areas.inclusionResolver);

  }
}
