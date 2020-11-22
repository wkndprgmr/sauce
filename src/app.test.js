import http from "http";
import listen from "test-listen";
import test from "ava";
import { app } from "./app.js";

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
