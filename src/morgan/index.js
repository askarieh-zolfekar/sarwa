const chalk = require('chalk');

module.exports = (tokens, req, res) => {
    const status = tokens.status(req, res);
    let statusColor;
    switch (true) {
        case status >= 500:
            statusColor = 'red';
            break;
        case status >= 400:
            statusColor = 'yellow';
            break;
        case status >= 300:
            statusColor = 'cyan';
            break;
        default:
            statusColor = 'green';
            break;
    }
    return `${tokens.method(req, res)} ${tokens.url(req, res)} - ${chalk[statusColor](status)} ${tokens['response-time'](
        req,
        res
    )} ms ${tokens['user-agent'](req, res)} - ${tokens['remote-addr'](req)} - Response status message: ${
        res.statusMessage
    }`;
};
