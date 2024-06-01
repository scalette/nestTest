import { ConfigService } from '@nestjs/config';
import { path } from 'app-root-path';
import { GraphileWorkerConfiguration } from 'nestjs-graphile-worker';

export const getGraphileWorkerConfig = async (configService: ConfigService): Promise<GraphileWorkerConfiguration> => {
    return {
        connectionString: getPostgreConnectionString(configService),
        forbiddenFlags: ['hello'],
        schema: 'graphileWorkerNewSchema',
        concurrency: 2,
        crontabFile: `${path}/src/graphileWorker/.crontab`,
    };
};

const getPostgreConnectionString = (configService: ConfigService) => 'postgresql://' +
    configService.get('database.postgreSQL.login') +
    ':' +
    configService.get('database.postgreSQL.password') +
    '@' +
    configService.get('database.postgreSQL.host') +
    ':' +
    configService.get('database.postgreSQL.port') +
    '/' +
    configService.get('database.postgreSQL.authDataBase');