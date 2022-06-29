import {
  repository
} from '@loopback/repository';
import {
  get,
} from '@loopback/rest'
import {AreaRepository} from '../repositories';;

export class ReportesController {
  constructor(
    @repository(AreaRepository)
    public areaRepository: AreaRepository,

  ) {}

  @get('/equiposDepart')
  async equiposDepart (): Promise<any> {
    let datos=await this.areaRepository.execute(
    `select p.nombre as Producto, a.nombre as Area, c.nombre as Categorias from Producto as p
    inner join Area as a on p.idArea = a.id
    inner join Categorias as c on p.idCategorias = c.id
    `
    )
  return datos;
  }

}
