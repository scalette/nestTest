import { Injectable, Logger } from '@nestjs/common';
import { WorkerEventMap } from 'graphile-worker';
import { GraphileWorkerListener, OnWorkerEvent } from 'nestjs-graphile-worker';

@Injectable()
@GraphileWorkerListener()
export class HelloTaskListeners {
  private readonly logger = new Logger(HelloTaskListeners.name);

  @OnWorkerEvent('job:success')
  onJobSuccess({ job }: WorkerEventMap['job:success']) {
    this.logger.debug(`FROM LISTENER FUNCTION: #${job.id} finished, job object: ${JSON.stringify(job)}`);
  }

  @OnWorkerEvent('job:error')
  onJobError({ job, error }: WorkerEventMap['job:error']) {
    this.logger.error(`FROM LISTENER FUNCTION: #${job.id} fail ${JSON.stringify(error)}`);
  }
}