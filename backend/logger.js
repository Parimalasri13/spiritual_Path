// logger.js
const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, 'logs', 'events.log');

// Ensure logs directory exists
fs.mkdirSync(path.dirname(logFilePath), { recursive: true });

const logEvent = (message) => {
    const dateTime = new Date().toISOString();
    const logItem = `${dateTime} - ${message}\n`;
    fs.appendFile(logFilePath, logItem, (err) => {
        if (err) {
            console.error('Failed to write to log file', err);
        }
    });
};

module.exports = logEvent;
