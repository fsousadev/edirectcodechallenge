process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

const { AccessTokenHandler } = require('node-accesstoken-validation');

const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IlRXUlMwNHJjd2tqVnlCQkJnY3ZrdmciLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE1ODk0NzIzODYsImV4cCI6MTU4OTQ3NTk4NiwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NTAwMSIsImF1ZCI6IndlYl9hcGlfcmVzb3VyY2UiLCJjbGllbnRfaWQiOiJqcyIsInN1YiI6IjEiLCJhdXRoX3RpbWUiOjE1ODk0NzEyODcsImlkcCI6ImxvY2FsIiwiSWRlbnRpZmllciI6ImZzb3VzYWRldkBnbWFpbC5jb20iLCJzY29wZSI6WyJ3ZWJfYXBpIl0sImFtciI6WyJwd2QiXX0.FLUqD3THa8KNxX7qVbHRPtLbGbGrzVuTAcjzxQA_mwPVGOh5MmNHIFEfoev5Ig13qG9RZ8iDzHftARwoZwHVylwazRqErjyxW2l0_-F1-vcgcwNEljuVLMqh2czgSdDD0dQ2bCuMcbhcx2rdG9D0Dkgp3uUpvgSGKkcgz7TfnnEDTRlkvK_x0cNgATUEbNbeC_PphgTu3-bh-gUN81pMMNa7MsQCjNYRmy6-V8G1BEmTaj9OJ2OAUpeQHZ-K3AhDgDISWqHJrpO9ASs7jYYYTZCGWyniMYlBcivkX4WSYc1AQJe3mQeNNd0aNFlzzP3qh_XGqkrttqIt8yB32tt6qg';

var at_validation = new AccessTokenHandler({
    authority: 'https://localhost:5001',
    apiName: 'web_api_resource',
});

at_validation.Handle('bearer ' + token).then(s => {
    console.log("s");
}).catch(s => console.log(s));
