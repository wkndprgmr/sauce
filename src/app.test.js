const http = require("http");
const listen = require("test-listen");
const test = require("ava");
const app = require("./app");

test.before(async (t) => {
  t.context.server = http.createServer(app);
  t.context.serverUrl = await listen(t.context.server);
});

test.after.always((t) => {
  t.context.server.close();
});

test.cb("get /", (t) => {
  http
    .get(`${t.context.serverUrl}/`, (res) => {
      t.is(res.statusCode, 200);
      t.end();
    })
    .on("error", (err) => {
      throw err;
    });
});
