import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {CannDataSource} from '../datasources';
import {Fabricante, Partes, PartesRelations} from '../models';
import {FabricanteRepository} from './fabricante.repository';

export class PartesRepository extends DefaultCrudRepository<
  Partes,
  typeof Partes.prototype.id,
  PartesRelations
> {

  public readonly Fabricantes: BelongsToAccessor<Fabricante, typeof Partes.prototype.id>;

  constructor(
    @inject('datasources.cann') dataSource: CannDataSource, @repository.getter('FabricanteRepository') protected fabricanteRepositoryGetter: Getter<FabricanteRepository>,
  ) {
    super(Partes, dataSource);
    this.Fabricantes = this.createBelongsToAccessorFor('Fabricantes', fabricanteRepositoryGetter,);
    this.registerInclusionResolver('Fabricantes', this.Fabricantes.inclusionResolver);
  }
}
