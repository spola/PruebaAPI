import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DetalleEntity } from "./detalle.entity";

@Entity('Pruebas', { schema: 'sistema_compras' })
export class PruebaEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'nvarchar', length: 'MAX', nullable: false })
    detalle: string;

    @Column({ name: 'Creacion', type: 'datetime2', nullable: false })
    creacion: Date;

    @Column({ name: 'Fecha', type: 'datetime2', nullable: true })
    fecha!: Date;

    @Column({ name: 'Cantidad', type: 'int', nullable: true })
    cantidad: number;

    @CreateDateColumn({ type: 'datetime2', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'datetime2', name: 'updated_at' })
    updatedAt: Date;

    @Column({ type: 'datetime2', name: 'deleted_at', nullable: true })
    deletedAt: Date;

    @OneToMany((type) => DetalleEntity, (detalle) => detalle.prueba, {
        cascade: true
    })
    detalles: DetalleEntity[]
}
