import { Table, Column, Model, DataType, HasMany, ForeignKey, BelongsTo, BelongsToMany } from "sequelize-typescript";
import Servicio from "./Service.model";
import  ServicioTipoServicio  from "./ServicioTipoServicio.model";
import Appointment from "./Appointments.model";
import AppointmentTipoServicio from "./AppointmentTipoServicio.model";
import User from "./User.model";

@Table({ tableName: "tipo_servicio" })
class TipoServicio extends Model {
  
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare userId: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
  })
  declare nombre: string;

  @BelongsTo(() => User)
  declare user: User;

  @BelongsToMany(() => Servicio, () => ServicioTipoServicio)
  servicios: Servicio[];

  @BelongsToMany(() => Appointment, () => AppointmentTipoServicio)
  appointments: Appointment[];
}

export default TipoServicio;
 