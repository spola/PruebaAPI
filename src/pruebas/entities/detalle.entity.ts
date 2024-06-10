import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PruebaEntity } from "./prueba.entity";

@Entity("Pruebas_Detalles", { schema: "sistema_compras" })
export class DetalleEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'nvarchar', length: 'MAX', nullable: false })
    descripcion: string;

    @ManyToOne((type) => PruebaEntity, (prueba) => prueba.detalles, {
        cascade: false
    })
    @JoinColumn({ name: "PruebaId" })
    prueba: PruebaEntity

    @CreateDateColumn({ type: 'datetime2', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'datetime2', name: 'updated_at' })
    updatedAt: Date;
}