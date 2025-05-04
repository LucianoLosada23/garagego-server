import {Table,Column,Model,DataType, ForeignKey,BelongsTo} from 'sequelize-typescript';
import ServicioTipoServicio from './ServicioTipoServicio.model';
import Servicio from './Service.model';
import User from './User.model';
  
  
@Table({tableName: 'repuesto'})

class Repuesto extends Model {
    @Column({
    type: DataType.BIGINT,
    })
    declare codigo: number;

    @ForeignKey(() => User)
    @Column({
      type: DataType.INTEGER,
      allowNull: true,
    })
    declare userId: number;

    @Column({
    type: DataType.STRING(100),
    })
    declare name: string;

    @Column({
    type: DataType.DOUBLE,
    })
    declare precio: number;
    
    @ForeignKey(() => Servicio)
    @Column({
        type: DataType.INTEGER, 
        allowNull: false,
    })
    declare servicioId: number;

    @BelongsTo(() => User)
    declare user: User;

    @BelongsTo(() => Servicio)
    declare servicio: Servicio;
  }

export default Repuesto;
  