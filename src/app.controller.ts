import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { WorkerService } from 'nestjs-graphile-worker';

@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
		private readonly graphileWorker: WorkerService
	) { }

	@Get('0')
	async getHello() {
		await this.graphileWorker.addJob('hello', { hello1232222: 'world434234' }, { queueName: 'ziro', flags: ['hello2'] });
		return this.appService.getHello();
	}
	@Get('1')
	async getHello1() {
		await this.graphileWorker.addJob('hello', { hello1232222: 'world434234' }, { queueName: 'first', flags: ['hello2'] });
		return this.appService.getHello();
	}
	@Get('2')
	async getHello2() {
		await this.graphileWorker.addJob('hello', { hello1232222: 'world434234' }, { queueName: 'second', flags: ['hello2'] });
		return this.appService.getHello();
	}
}
