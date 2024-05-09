import { ToadScheduler, AsyncTask, CronJob } from 'toad-scheduler'
import { setTimeout as sleep } from 'node:timers/promises'

const scheduler = new ToadScheduler()

const evenTask = new AsyncTask('simple task', () =>
  sleep(10000).then(() => console.log('even', new Date().toTimeString()))
)
const oddTask = new AsyncTask('simple task', () =>
  sleep(3500).then(() => console.log('odd', new Date().toTimeString()))
)

const job1 = new CronJob({ cronExpression: '*/5 */2 * * * *' }, evenTask, {
  preventOverrun: true
})
const job2 = new CronJob({ cronExpression: '*/3 1-59/2 * * * *' }, oddTask, {
  preventOverrun: true
})

scheduler.addCronJob(job1)
scheduler.addCronJob(job2)
