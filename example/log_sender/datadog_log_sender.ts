import { MiddlewareHandlerContext } from "../../deps.ts";
import { type Logger, type LogLevel, LogModule } from "../../mod.ts";

function logSender(level: LogLevel, logBody: string): void {
  if (["info", "warn", "error"].indexOf(level) === -1) return;

  fetch("https://http-intake.logs.datadoghq.com/api/v2/logs", {
    method: "post",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "DD-API-KEY": Deno.env.get("DATADOG_API_KEY")!,
    },
    body: JSON.stringify({
      "ddsource": "Deno Deploy",
      "ddtags": "env:prod,version:5.1",
      "hostname": "deno deploy",
      "service": "application",
      "message": logBody,
      "status": level,
      "date": new Date().getTime()
    }),
  });
}

export function loggerHandler(
  _req: Request,
  ctx: MiddlewareHandlerContext<Logger>,
) {
  ctx.state.logger = new LogModule(logSender);
  return ctx.next();
}
