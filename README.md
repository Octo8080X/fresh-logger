# Fresh Logger

This logger is simple and advanced logger module for [Deno Fresh](https://fresh.deno.dev/)

## Usage

## Simple 

```ts _middleware.ts
import {loggerHandler} from "https://deno.land/x/fresh_logger@0.0.1/mod.ts";

export const handler = [loggerHandler];
```

## Remote log sender

```ts _middleware.ts
import {LogModule, type Logger, type RemoteLogSenderFunction} from "https://deno.land/x/fresh_logger@0.0.1/mod.ts";


function logSender(level: LogLevel, logBody: string):void{

}


function loggerHandler(_req: Request, ctx: MiddlewareHandlerContext<Logger>) {
    ctx.state.logger = new LogModule()
    return ctx.next();
}
export const handler = [loggerHandler];

```

