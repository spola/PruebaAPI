import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { ProcesosModule } from './procesos/procesos.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { PruebasModule } from './pruebas/pruebas.module';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    DatabaseModule,
    HealthModule,
    //ProcesosModule,
    DatabaseModule,
    PruebasModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
