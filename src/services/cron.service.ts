import cron from "node-cron";

class CronService {
  private _nextJobID: number;
  private _jobs: Map<number, cron.ScheduledTask>;

  constructor() {
    this._nextJobID = 0;
  }

  public scheduleRecurringJob(job: () => any, minutes: number = 1): number {
    const task = cron.schedule(`*/${minutes} * * * *`, () => {
      job();
    });

    const jobId = this._nextJobID;
    this._jobs.set(jobId, task);
    this._nextJobID += 1;

    return jobId;
  }

  public cancelJob(jobId: number) {
    const task = this._jobs.get(jobId);

    task.stop();
  }
}

export default new CronService();