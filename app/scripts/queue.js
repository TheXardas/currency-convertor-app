const dotenv = require('dotenv').config()
const Queue = require('bull');
const freeCurrencyApiController = require('../src/modules/currencies/controllers/freeCurrencyApiController');

const queue = new Queue('jobs', process.env.QUEUE_STORAGE_URL);

const JOBS = {
    LOAD_CURRENCIES: 'LOAD_CURRENCIES',
    LOAD_LATEST: 'LOAD_LATEST',
    LOAD_HISTORY: 'LOAD_HISTORY',
}

const JOBS_SCHEDULE = {
    [JOBS.LOAD_CURRENCIES]: 24 * 60 * 60 * 1000, // day
    [JOBS.LOAD_LATEST]: 60 * 60 * 1000, // hour
    [JOBS.LOAD_HISTORY]: 24 * 60 * 60 * 1000, // day
};

(async() => {
    queue.process(JOBS.LOAD_CURRENCIES, async (job) => {
        return await freeCurrencyApiController.loadCurrencies();
    })
    queue.process(JOBS.LOAD_LATEST, async (job) => {
        return await freeCurrencyApiController.loadLatest();
    })
    queue.process(JOBS.LOAD_HISTORY, async (job) => {
        return await freeCurrencyApiController.loadLastYear();
    })

    queue.on('completed', (job) => {
        console.log('COMPLETED', job.name);
    })
    queue.on('failed', (job, error) => {
        console.log(`ERROR in ${job.name}:\n`, error);
    })
    queue.on('active', (job) => {
        console.log('ACTIVE', job.name);
    })

    const jobs = await queue.getRepeatableJobs()
    for (const jobName in JOBS) {
        const schedule = JOBS_SCHEDULE[jobName];

        const existingJob = jobs.find(j => j.name === jobName);
        if (existingJob) {
            console.log(`Job ${jobName} exists`)
            if (existingJob.every === schedule) {
                return;
            }

            console.log(`Removing job, as ${jobName} has different repeat pattern. Current: ${existingJob.every}, should be: ${schedule}`);
            await queue.removeRepeatableByKey(existingJob.key);
        }

        console.log(`Initializing job ${jobName}`);
        await queue.add(jobName, '', {
            repeat: {
                every: schedule,
            },
            delay: jobName === JOBS.LOAD_CURRENCIES ? 0 : 10000,
        })
        console.log(`Job ${jobName} initialized`);

        // Run it first time immediately after initialization
        // We need to force currencies first, because we have a dependency
        await queue.add(jobName, '', { delay: jobName === JOBS.LOAD_CURRENCIES ? 0 : 10000 });
    }

    console.log('Job Queue Started. Queue stored in: ' + process.env.QUEUE_STORAGE_URL);
})()