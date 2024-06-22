import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DiskHealthIndicator, HealthCheck, HealthCheckService, HttpHealthIndicator, TypeOrmHealthIndicator } from '@nestjs/terminus';

@ApiTags("health")
@Controller('health')
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private http: HttpHealthIndicator,
        private db: TypeOrmHealthIndicator,

        //@InjectConnection()
        //private defaultConnection: Connection,

        private readonly disk: DiskHealthIndicator,

    ) { }

    @Get()
    @HealthCheck()
    check() {
        return this.health.check([
            () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
            () => this.http.responseCheck(
                'crm-api-external',
                'https://www.keylogistics.cl/crmapi/swagger/index.html',
                (res) => res.status == 200
            ),
            //() => this.db.pingCheck('database'),
            //() => this.disk.checkStorage('storage', { path: '/', thresholdPercent: 0.9 }),

        ])
    }
}
