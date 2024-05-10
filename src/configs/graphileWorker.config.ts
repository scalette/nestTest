import { ConfigService } from '@nestjs/config';
import { path } from 'app-root-path';
import { GraphileWorkerConfiguration } from 'nestjs-graphile-worker';

export const getGraphileWorkerConfig = async (configService: ConfigService): Promise<GraphileWorkerConfiguration> => {
    return {
        connectionString: 'postgresql://admin:admin@localhost:5444/default',
        forbiddenFlags: ['hello'],
        schema: 'graphileWorkerNewSchema',
        concurrency: 11,
        crontabFile: `${path}/src/graphileWorker/.crontab`,
    };
};