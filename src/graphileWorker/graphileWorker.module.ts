import { Module } from '@nestjs/common';
import { GraphileWorkerModule } from 'nestjs-graphile-worker';
import { HelloTaskListeners } from './jobs/hello.listeners';
import { HelloTask, HelloTask2 } from './jobs/hello.task';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getGraphileWorkerConfig } from 'src/configs/graphileWorker.config';

@Module({
    imports: [
        ConfigModule,
        GraphileWorkerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getGraphileWorkerConfig,
        }),
    ],
    providers: [HelloTask, HelloTask2, HelloTaskListeners]
})
export class GraphileModule { }
