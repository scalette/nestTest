import { ConfigService } from '@nestjs/config';
import { HelloTask } from '../graphileWorker/jobs/hello.task'

export const getPostgreConfig = async (configService: ConfigService) => {
    return {
        connectionString: getPostgreConnectionString(configService),
        taskList: {
            hello: HelloTask,
        },
    };
};
const getPostgreConnectionString = (configService: ConfigService) => 'jdbc:postgresql://admin:admin@localhost:5444/default'
// 'jdbc:postgresql://' +
//   configService.get('POSTGRE_USER') +
//   ':' +
//   configService.get('POSTGRE_PASSWORD') +
//   '@' +
//   configService.get('DOMAIN') +
//   ':' +
//   configService.get('POSTGRE_PORT') +
//   '/' +
//   configService.get('POSTGRE_DB');
