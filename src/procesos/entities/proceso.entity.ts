import { Column, Entity, Long, PrimaryGeneratedColumn } from "typeorm";

@Entity('procesos', {schema:'sistema_compras'})
export class Proceso {
    @PrimaryGeneratedColumn('identity')
    id: number;

    @Column({ name: 'Referencia', type: "varchar", length: "MAX", nullable: false })
    referencia: string;

    @Column({ name: 'CentroCostoId', type: "bigint", nullable: false })
    centroCostoId: number;

    @Column({ name: 'FechaCreacion', type: 'datetime2', nullable: false })
    fechaCreacion!: Date;
}
