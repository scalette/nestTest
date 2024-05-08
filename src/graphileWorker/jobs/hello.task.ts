import { Injectable, Logger } from '@nestjs/common';
import { Helpers } from 'graphile-worker';
import { Task, TaskHandler } from 'nestjs-graphile-worker';

@Injectable()
@Task('hello')
export class HelloTask {
  private logger = new Logger(HelloTask.name);

  @TaskHandler()
  async handler(payload: any, _helpers: Helpers) {
    await new Promise((res) => { setTimeout(() => res('task Done'), 23000) })
    this.logger.log(`JOB TASK RUN: payload ${JSON.stringify(payload)}`);
  }
}