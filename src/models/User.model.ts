import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import Client from "./Client.model";
import Vehiculo from "./Vehicle.model";
import Servicio from "./Service.model";
import Appointment from "./Appointments.model";
import Repuesto from "./Repuesto.model";

@Table({tableName: "user"})
class User extends Model{

    @Column({
        type: DataType.STRING(50),
        allowNull: false,
    })
    declare name: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: false,
    })
    declare lastname: string;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        unique: true,
    })
    declare email: string;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    declare password: string;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    declare phone: string;

    @Column({
        type: DataType.BOOLEAN(),
        allowNull: false,
    })
    declare isActive: boolean;

    @Column({
        type: DataType.STRING(20),
        allowNull: false,
    })
    declare cuit: bigint;

    @HasMany(() => Client)
    declare clientes: Client[];
  
    @HasMany(() => Vehiculo)
    declare vehiculos: Vehiculo[];
  
    @HasMany(() => Servicio)
    declare servicios: Servicio[];
  
    @HasMany(() => Appointment)
    declare appointments: Appointment[];
  
    @HasMany(() => Repuesto)
    declare repuestos: Repuesto[];
}

export default User;