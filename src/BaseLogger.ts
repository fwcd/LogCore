import { LogLevel } from "./LogLevel";
import { Logger } from "./Logger";

/**
 * An empty logger implementation that forwards
 * calls to level-specific logging methods to the
 * generic 'log' method.
 */
export class BaseLogger implements Logger {
	async log(level: number, msg: string, ...args: any[]): Promise<void> {
		// Do nothing by default
	}
	
	async error(msg: string, ...args: any[]): Promise<void> {
		await this.log(LogLevel.Error, msg, ...args);
	}
	
	async warn(msg: string, ...args: any[]): Promise<void> {
		await this.log(LogLevel.Warn, msg, ...args);
	}
	
	async info(msg: string, ...args: any[]): Promise<void> {
		await this.log(LogLevel.Info, msg, ...args);
	}
	
	async debug(msg: string, ...args: any[]): Promise<void> {
		await this.log(LogLevel.Debug, msg, ...args);
	}
	
	async trace(msg: string, ...args: any[]): Promise<void> {
		await this.log(LogLevel.Trace, msg, ...args);
	}
	
	async deepTrace(msg: string, ...args: any[]): Promise<void> {
		await this.log(LogLevel.DeepTrace, msg, ...args);
	}
}
