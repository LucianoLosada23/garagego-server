import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import Cliente from "./Client.model";
import Servicio from "./Service.model";
import Appointment from "./Appointments.model";
import User from "./User.model";

@Table({ tableName: "vehiculo" })
class Vehiculo extends Model {
  
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare userId: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare marca: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare modelo: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  declare patente: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare nroChasis: string;  // Número de chasis agregado

  @Column({
    type: DataType.STRING(30),  // Ajusta el tamaño según lo necesites
  })
  declare color: string;  // Columna de color agregada

  @Column({
    type: DataType.INTEGER,
  })
  declare año: number;  // Columna de año agregada

  @Column({
    type : DataType.STRING(30),
  })
  declare motor: string;  // Columna de motor agregada

  @ForeignKey(() => Cliente)
  @Column({
    type: DataType.INTEGER, // o BIGINT si usás eso como ID
    allowNull: false,
  })
  declare clienteId: number;

  @BelongsTo(() => User)
  declare user: User;

  @BelongsTo(() => Cliente)
  declare cliente: Cliente;

  @HasMany(() => Servicio)
  declare servicios: Servicio[];

  // Relación con Appointment (Cita)
  @HasMany(() => Appointment)
  declare appointments: Appointment[];
}

export default Vehiculo;
