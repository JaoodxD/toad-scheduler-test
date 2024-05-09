import { ToadScheduler, Task, CronJob } from 'toad-scheduler'

const scheduler = new ToadScheduler()

const evenTask = new Task('simple task', () =>
  console.log('even', new Date().toTimeString())
)
const oddTask = new Task('simple task', () =>
  console.log('odd', new Date().toTimeString())
)

const job1 = new CronJob({ cronExpression: '*/5 */2 * * * *' }, evenTask)
const job2 = new CronJob({ cronExpression: '*/3 1-59/2 * * * *' }, oddTask)

scheduler.addCronJob(job1)
scheduler.addCronJob(job2)
