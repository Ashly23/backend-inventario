import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Area} from './area.model';
import {Categorias} from './categorias.model';
import {Empleado} from './empleado.model';
import {Fabricante} from './fabricante.model';
import {EstadoProducto} from './estado-producto.model';
import {Partes} from './partes.model';

@model({settings: {idInjection: false, mssql: {schema: 'dbo', table: 'Producto'}}})
export class Producto extends Entity {
  @property({
    type: 'number',
    required: false,
    precision: 10,
    scale: 0,
    id: 1,
    mssql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'YES'},
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mssql: {columnName: 'idCategorias', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'NO'},
  })
  idCategorias: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mssql: {columnName: 'idEstadoProducto', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'NO'},
  })
  idEstadoProducto: number;
  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mssql: {columnName: 'idGarantia', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'NO'},
  })
  idGarantia: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mssql: {columnName: 'idPartes', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'NO'},
  })
  idPartes: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mssql: {columnName: 'idFabricante', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'NO'},
  })
  idFabricante: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mssql: {columnName: 'idEmpleado', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'NO'},
  })
  idEmpleado: number;

  @property({
    type: 'string',
    required: true,
    length: 50,
    mssql: {columnName: 'nombre', dataType: 'nvarchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  nombre: string;

  @property({
    type: 'number',
    required: true,
    precision: 53,
    mssql: {columnName: 'valor', dataType: 'float', dataLength: null, dataPrecision: 53, dataScale: null, nullable: 'NO'},
  })
  valor: number;

  @property({
    type: 'number',
    required: true,
    precision: 53,
    mssql: {columnName: 'vidaUtil', dataType: 'float', dataLength: null, dataPrecision: 53, dataScale: null, nullable: 'NO'},
  })
  vidaUtil: number;

  @property({
    type: 'number',
    required: true,
    precision: 53,
    mssql: {columnName: 'valorDepreciado', dataType: 'float', dataLength: null, dataPrecision: 53, dataScale: null, nullable: 'NO'},
  })
  valorDepreciado: number;

  @property({
    type: 'number',
    required: true,
    precision: 53,
    mssql: {columnName: 'anioDepreciados', dataType: 'float', dataLength: null, dataPrecision: 53, dataScale: null, nullable: 'NO'},
  })
  anioDepreciados: number;

  @property({
    type: 'string',
    length: 50,
    mssql: {columnName: 'modelo', dataType: 'nchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  modelo?: string;

  @property({
    type: 'string',
    length: 50,
    mssql: {columnName: 'etiquetaServ', dataType: 'nchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  etiquetaServ?: string;

  @belongsTo(() => Area)
  areaId: number;

  @belongsTo(() => Categorias)
  categoriasId: number;

  @belongsTo(() => Empleado)
  empleadoId: number;

  @belongsTo(() => Fabricante)
  fabricanteId: number;

  @belongsTo(() => EstadoProducto)
  estadoProductoId: number;

  @belongsTo(() => Partes)
  partesId: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Producto>) {
    super(data);
  }
}

export interface ProductoRelations {
  // describe navigational properties here
}

export type ProductoWithRelations = Producto & ProductoRelations;
