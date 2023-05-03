const Arena = require('bull-arena');
const Bull = require('bull');
const express = require('express');
const router = express.Router();

const arena = Arena({
    Bull,
    redis: {
        url: process.env.QUEUE_STORAGE_URL,
    },
    queues: [
        {
            hostId: 'local',
            type: 'bull',
            name: "jobs",
        },
    ],
});

router.use('/', arena);