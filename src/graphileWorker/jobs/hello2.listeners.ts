import { Injectable, Logger } from '@nestjs/common';
import { WorkerEventMap } from 'graphile-worker';
import { GraphileWorkerListener, OnWorkerEvent } from 'nestjs-graphile-worker';

@Injectable()
@GraphileWorkerListener()
export class Hello2TaskListeners {
   private readonly logger = new Logger(Hello2TaskListeners.name);

   @OnWorkerEvent('job:success')
   onJobSuccess({ job }: WorkerEventMap['job:success']) {
      this.logger.debug(`dupa_dupa_dupa: #${job.id} finished, job object: ${JSON.stringify(job)}`);
   }

   @OnWorkerEvent('job:error')
   onJobError({ job, error }: WorkerEventMap['job:error']) {
      this.logger.error(`dupa_dupa_dupa: #${job.id} fail ${JSON.stringify(error)}`);
   }

}