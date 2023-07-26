# Fresh Logger

This logger is simple and advanced logger module for
[Deno Fresh](https://fresh.deno.dev/)

<a href="https://fresh.deno.dev">
   <img width="197" height="37" src="https://fresh.deno.dev/fresh-badge.svg" alt="Made with Fresh" />
</a>

## Usage

### Simple

```ts _middleware.ts
// _middleware.ts

import { loggerHandler } from "https://deno.land/x/fresh_logger@0.0.1/mod.ts";

export const handler = [loggerHandler];
```

### Remote log sender

```ts _middleware.ts
// _middleware.ts

import {LogModule, type Logger, type RemoteLogSenderFunction} from "https://deno.land/x/fresh_logger@0.0.1/mod.ts";

function logSender(level: LogLevel, logBody: string): void {
  // Filter log, omit "log"
  if (["info", "warn", "error"].indexOf(level) === -1) return;

  // Any log service
  fetch("[any url]", {
    method: "post",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: logBody,
    }),
  });
}


function loggerHandler(_req: Request, ctx: MiddlewareHandlerContext<Logger>) {
    ctx.state.logger = new LogModule()
    return ctx.next();
}
export const handler = [loggerHandler];
```

### For After Fresh 1.3.0

```ts main.ts
// main.ts

/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import "$std/dotenv/load.ts";

import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";

import twindPlugin from "$fresh/plugins/twind.ts";
import twindConfig from "./twind.config.ts";

import { getLoggerHandler } from "https://deno.land/x/fresh_logger@0.0.2/mod.ts"; // <= import module

await start(manifest, {
  plugins: [
    getLoggerHandler(), // <= Set handler
    twindPlugin(twindConfig),
  ],
});

```