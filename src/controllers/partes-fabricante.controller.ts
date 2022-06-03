import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Partes,
  Fabricante,
} from '../models';
import {PartesRepository} from '../repositories';

export class PartesFabricanteController {
  constructor(
    @repository(PartesRepository)
    public partesRepository: PartesRepository,
  ) { }

  @get('/partes/{id}/fabricante', {
    responses: {
      '200': {
        description: 'Fabricante belonging to Partes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Fabricante)},
          },
        },
      },
    },
  })
  async getFabricante(
    @param.path.number('id') id: typeof Partes.prototype.id,
  ): Promise<Fabricante> {
    return this.partesRepository.Fabricantes(id);
  }
}
