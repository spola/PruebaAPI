import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcesosModule } from './procesos/procesos.module';
import { Proceso } from './procesos/entities/proceso.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: '192.168.1.114',
      port: 1433,
      username: 'spola',
      password: '4you',
      database: 'CRM',
      options: {
        encrypt: false,
      },
      //synchronize: true, //use this with development enviroment
      entities: [Proceso]
    }),
    HealthModule,
    ProcesosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
