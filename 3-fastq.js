import { ToadScheduler, AsyncTask, CronJob } from 'toad-scheduler'
import fastq, { promise } from 'fastq'
import { setTimeout as sleep } from 'node:timers/promises'

const scheduler = new ToadScheduler()
const queue = promise(worker, 3)
const resolverStorage = {
  resolver: null
}

let i = 0

queue.drain = () => {
  const { resolver } = resolverStorage
  if (resolver) resolver()
  resolverStorage.resolver = null
  console.log(`resolved ${++i}`, new Date().toTimeString())
}

const task = new AsyncTask('fastq', () => {
  console.log('start next job', new Date().toTimeString())
  const { promise, resolve } = deferred()
  resolverStorage.resolver = resolve
  for (let i = 0; i < 10; i++) queue.push()
  return promise
})

const job = new CronJob(
  { cronExpression: '*/5 * * * * *' },
  task,
  { preventOverrun: true }
)

scheduler.addCronJob(job)

async function worker (arg) {
  await sleep(1000)
  console.log('task resolved')
}

function deferred () {
  let resolve, reject
  const promise = new Promise((_resolve, _reject) => {
    resolve = _resolve
    reject = _reject
  })

  return { resolve, reject, promise }
}
