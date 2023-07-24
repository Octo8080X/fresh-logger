import {
  type Plugin,
  type MiddlewareHandlerContext,
  type MiddlewareHandler,
} from "../deps.ts";
import {
  LogModule,
  type Logger,
  type RemoteLogSenderFunction,
} from "./loggerModule.ts";

export function getLoggerHandler(logSender?: RemoteLogSenderFunction): Plugin {
  const handler: MiddlewareHandler<Logger> = async function (
    _req: Request,
    ctx: MiddlewareHandlerContext<Logger>
  ) {
    ctx.state.logger = new LogModule(logSender);
    return await ctx.next();
  };

  return {
    name: "loggerPlugin",
    middlewares: [
      {
        middleware: {
          handler: handler as MiddlewareHandler<Record<"logger", unknown>>,
        },
        path: "/",
      },
    ],
  };
}
