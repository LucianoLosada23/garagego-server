import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';
import Vehicle from './Vehicle.model';
import TipoServicio from './ServiceType.model';
import AppointmentTipoServicio from './AppointmentTipoServicio.model';

@Table
class Appointment extends Model {
  @ForeignKey(() => Vehicle)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare vehicleId: number;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  declare date: string;

  @Column({
    type: DataType.STRING(5), // formato HH:mm
    allowNull: false,
  })
  declare hora: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare status: string;

  @BelongsTo(() => Vehicle)
  vehicle!: Vehicle;

  @BelongsToMany(() => TipoServicio, () => AppointmentTipoServicio)
  tipoServicios: TipoServicio[];
}

export default Appointment;
