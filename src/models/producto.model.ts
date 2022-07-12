import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Area} from './area.model';
import {Categorias} from './categorias.model';
import {EstadoProducto} from './estado-producto.model';
import {Fabricante} from './fabricante.model';
import {Garantia} from './garantia.model';
import {Solicitud} from './solicitud.model';
import {Partes} from './partes.model';
import {Empleado} from './empleado.model';
import {Encargado} from './encargado.model';

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
    type: 'Date',
    required: true,
    length: 50,
    mssql: {columnName: 'fechaCompra', dataType: 'Date', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  fechaCompra: Date;

  @property({
    type: 'number',
    required: true,
    precision: 53,
    mssql: {columnName: 'valor', dataType: 'number', dataLength: null, dataPrecision: 53, dataScale: null, nullable: 'NO'},
  })
  valor: number;

  @property({
    type: 'number',
    required: true,
    precision: 53,
    mssql: {columnName: 'vidaUtil', dataType: 'number', dataLength: null, dataPrecision: 53, dataScale: null, nullable: 'NO'},
  })
  vidaUtil: number;

  @property({
    type: 'number',
    required: true,
    precision: 53,
    mssql: {columnName: 'valorDepreciado', dataType: 'number', dataLength: null, dataPrecision: 53, dataScale: null, nullable: 'NO'},
  })
  valorDepreciado: number;

  @property({
    type: 'number',
    required: true,
    precision: 53,
    mssql: {columnName: 'anioDepreciados', dataType: 'number', dataLength: null, dataPrecision: 53, dataScale: null, nullable: 'NO'},
  })
  anioDepreciados: number;

  @property({
    type: 'string',
    length: 50,
    mssql: {columnName: 'modelo', dataType: 'nvarchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  modelo?: string;

  @property({
    type: 'string',
    length: 50,
    mssql: {columnName: 'serie', dataType: 'nvarchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  serie?: string;

  @belongsTo(() => Area, {name: 'Areas'})
  idArea: number;

  @belongsTo(() => Categorias, {name: 'Categorias'})
  idCategorias: number;

  @belongsTo(() => EstadoProducto, {name: 'EstadoProductos'})
  idEstadoProducto: number;

  @belongsTo(() => Fabricante, {name: 'Fabricantes'})
  idFabricante: number;

  @hasMany(() => Garantia, {keyTo: 'idProducto'})
  garantias: Garantia[];

  @hasMany(() => Solicitud, {keyTo: 'idProducto'})
  solicitud: Solicitud[];

  @hasMany(() => Partes, {keyTo: 'idProducto'})
  partes: Partes[];

  @belongsTo(() => Empleado, {name: 'Empleados'})
  idEmpleado: number;

  @hasMany(() => Encargado, {keyTo: 'idProducto'})
  encargados: Encargado[];
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
