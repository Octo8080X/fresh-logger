import { type MiddlewareHandlerContext, nanoid } from "../deps.ts";

export type RemoteLogSenderFunction = (
  level: LogLevel,
  logBody: string,
) => void;
export type LogLevel = "log" | "info" | "error" | "warn";

export class LogModule {
  #id: string;
  #remoteLogSenderFunction?: RemoteLogSenderFunction;
  constructor(remoteLogSenderFunction?: RemoteLogSenderFunction) {
    this.#id = nanoid();

    if (!remoteLogSenderFunction) return;
    this.#remoteLogSenderFunction = remoteLogSenderFunction;
  }

  log(param: string) {
    const logLevel = "log";
    const logText = this.#buildText(logLevel, param);
    console.log(logText);

    if (!this.#remoteLogSenderFunction) return;
    this.#remoteLogSenderFunction(logLevel, logText);
  }
  info(param: string) {
    const logLevel = "info";
    const logText = this.#buildText(logLevel, param);
    console.info(logText);

    if (!this.#remoteLogSenderFunction) return;
    this.#remoteLogSenderFunction("info", logText);
  }
  error(param: string) {
    const logLevel = "error";
    const logText = this.#buildText(logLevel, param);
    console.error(logText);

    if (!this.#remoteLogSenderFunction) return;
    this.#remoteLogSenderFunction(logLevel, logText);
  }
  warn(param: string) {
    const logLevel = "warn";
    const logText = this.#buildText(logLevel, param);
    console.warn(logText);

    if (!this.#remoteLogSenderFunction) return;
    this.#remoteLogSenderFunction(logLevel, logText);
  }
  #buildText(level: LogLevel, param: string) {
    return Deno.inspect({
      log_id: this.#id,
      level,
      body: param,
    }).replace(/\n/g, "").replace(/  /g, " ");
  }
}

export interface Logger {
  logger: LogModule;
}

export function loggerHandler(
  _req: Request,
  ctx: MiddlewareHandlerContext<Logger>,
) {
  ctx.state.logger = new LogModule();
  return ctx.next();
}
