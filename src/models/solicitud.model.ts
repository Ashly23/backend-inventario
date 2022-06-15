import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Empleado} from './empleado.model';
import {Partes} from './partes.model';

@model({settings: {idInjection: false, mssql: {schema: 'dbo', table: 'Solicitud'}}})
export class Solicitud extends Entity {
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
    mssql: {columnName: 'partes', dataType: 'nchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  partes: string;

  @property({
    type: 'string',
    required: true,
    length: 100,
    mssql: {columnName: 'descripcion', dataType: 'nchar', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  descripcion: string;

  @belongsTo(() => Empleado, {name: 'Empleados'})
  idEmpleado: number;



  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
