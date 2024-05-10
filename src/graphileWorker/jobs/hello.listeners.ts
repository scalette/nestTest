import { Injectable, Logger } from '@nestjs/common';
import { WorkerEventMap } from 'graphile-worker';
import { GraphileWorkerListener, OnWorkerEvent } from 'nestjs-graphile-worker';

@Injectable()
@GraphileWorkerListener()
export class HelloTaskListeners {
   private readonly logger = new Logger(HelloTaskListeners.name);

   @OnWorkerEvent('job:success')
   onJobSuccess({ job }: WorkerEventMap['job:success']) {
      switch (job.task_identifier) {
         case 'hello2':
            this.logger.debug(`FROM LISTENER FUNCTION  for dupa hello2: #${job.id} finished, job object: ${JSON.stringify(job)}`);
            break
         case 'hello':
            this.logger.debug(`FROM LISTENER FUNCTION for hello: #${job.id} finished, job object: ${JSON.stringify(job)}`);
            break

      }
   }

   @OnWorkerEvent('job:error')
   onJobError({ job, error }: WorkerEventMap['job:error']) {
      this.logger.error(`FROM LISTENER FUNCTION: #${job.id} fail ${JSON.stringify(error)}`);
   }

}