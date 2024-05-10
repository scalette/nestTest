import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';

export const getMongoConfig = async (configService: ConfigService): Promise<TypegooseModuleOptions> => {
	return {
		uri: getMongoString(configService),
		...getMongoOptions()
	};
};

const getMongoString = (configService: ConfigService) => 'mongodb://' +
	configService.get('database.mongo.login') +
	':' +
	configService.get('database.mongo.password') +
	'@' +
	configService.get('database.mongo.host') +
	':' +
	configService.get('database.mongo.port') +
	'/' +
	configService.get('database.mongo.authDataBase')


const getMongoOptions = () => ({
	useNewUrlParser: true,
	useUnifiedTopology: true
});