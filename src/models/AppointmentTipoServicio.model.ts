import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import Appointment from './Appointments.model';
import TipoServicio from './ServiceType.model';

@Table
class AppointmentTipoServicio extends Model {
  @ForeignKey(() => Appointment)
  @Column
  declare appointmentId: number;

  @ForeignKey(() => TipoServicio)
  @Column
  declare tipoServicioId: number;
}

export default AppointmentTipoServicio;
