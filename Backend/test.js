const { AccessTokenHandler } = require('node-accesstoken-validation');

const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImJwU1hmWGpNWlBMRjVmLTl3YkdVUEEiLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE1ODkzODAzOTksImV4cCI6MTU4OTM4Mzk5OSwiaXNzIjoiaHR0cHM6Ly9hdXRoc2VydmVyLWZzb3VzYS5henVyZXdlYnNpdGVzLm5ldCIsImF1ZCI6IndlYl9hcGkiLCJjbGllbnRfaWQiOiJjbGllbnQiLCJzY29wZSI6WyJ3ZWJfYXBpIl19.YR1whyQqG3QT9fd4Pdd61KqmNWYhbmoc5cwFQ-bcmHU3KJ0wiVpOpTO3zZtPpe8G3AT42UaXvMIklDo55CRqYTsOnQu6qpc1S_iw6PDm5NkI-tNeyYulnJLZBdr1GvaMcnW99ZUslx2LzPKBgBltGesc4ztIRwjr3M32fHsRssviAsmKkbV86kDMo7PaOCIfbtdJ9I9eeWpb4ejzyCmm7OVq-vS1AhWZ5-YJJehl7bbP55qzhL9MgEX3ZBcUxa3Np7RFmXjvKBRF9jyg5wKF7R8NvBzh-6aqSY9YGKxRjO9zxwh4X0DqjOmqLuZdne_iP-y0Q19OWhne8qsr1B_YWw';

var at_validation = new AccessTokenHandler({
    authority: 'https://authserver-fsousa.azurewebsites.net',
    apiName: 'web_api',
});

at_validation.Handle('bearer ' + token).then(s => {
    console.log("s");
    next();
}).catch(s => console.log("e"));
