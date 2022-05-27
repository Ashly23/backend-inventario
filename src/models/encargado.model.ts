import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Empleado} from './empleado.model';
import {Producto} from './producto.model';

@model({settings: {idInjection: false, mssql: {schema: 'dbo', table: 'Encargado'}}})
export class Encargado extends Entity {
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
    type: 'string',
    required: true,
    length: 50,
    mssql: {columnName: 'fechaInicial', dataType: 'nchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  fechaInicial: string;

  @property({
    type: 'string',
    required: true,
    length: 50,
    mssql: {columnName: 'fechaFinal', dataType: 'nchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  fechaFinal: string;

  @belongsTo(() => Producto, {name: 'Productos'})
  idProducto: number;

  @belongsTo(() => Empleado, {name: 'Empleados'})
  idEmpleado: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;


  constructor(data?: Partial<Encargado>) {
    super(data);
  }
}

export interface EncargadoRelations {
  // describe navigational properties here
}

export type EncargadoWithRelations = Encargado & EncargadoRelations;
