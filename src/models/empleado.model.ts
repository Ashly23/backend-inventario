import {Entity, hasMany, model, property, belongsTo} from '@loopback/repository';
import {Encargado} from './encargado.model';
import {Area} from './area.model';
import {Solicitud} from './solicitud.model';

@model({settings: {idInjection: false, mssql: {schema: 'dbo', table: 'Empleado'}}})
export class Empleado extends Entity {
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
    mssql: {columnName: 'nombre', dataType: 'nvarchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
    length: 50,
    mssql: {columnName: 'correo', dataType: 'nvarchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
    length: 50,
    mssql: {columnName: 'telefono', dataType: 'nvarchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  telefono: string;

  @property({
    type: 'boolean',
    required: true,
    mssql: {columnName: 'estado', dataType: 'bit', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  estado: boolean;

  @hasMany(() => Encargado, {keyTo: 'idEmpleado'})
  encargados: Encargado[];

  @belongsTo(() => Area, {name: 'Areas'})
  idArea: number;

  @hasMany(() => Solicitud, {keyTo: 'idEmpleado'})
  solicitud: Solicitud[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Empleado>) {
    super(data);
  }
}

export interface EmpleadoRelations {
  // describe navigational properties here
}

export type EmpleadoWithRelations = Empleado & EmpleadoRelations;
