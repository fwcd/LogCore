import { LogLevel } from "./LogLevel";
import { Logger } from "./Logger";
import { LoggingBackend } from "./LoggingBackend";
import { LoggerConfiguration } from "./LoggerConfiguration";

/**
 * The default logger implementation that forwards
 * calls to level-specific logging methods to the
 * generic 'log' method and automatically substitutes
 * parameters by their provided arguments.
 * 
 * This means that subclasses only have to implement
 * 'outputMessage'.
 */
export class DefaultLogger implements Logger {
	private config: LoggerConfiguration;
	
	/**
	 * Creates a new logger that outputs
	 * its messages to the specified backend.
	 * 
	 * @param config The logger configuration
	 */
	constructor(config: LoggerConfiguration) {
		this.config = config;
	}
	
	private outputMessage(msg: string) {
		if (this.config.backend) {
			this.config.backend.output(msg);
		} else {
			throw new Error(`Logger ${this.config.name} can not output messages without a backend`);
		}
	}
	
	private stringify(arg: any): string {
		if (typeof arg == "function") {
			return arg();
		} else {
			return "" + arg;
		}
	}
	
	async log(level: number, msg: string, ...args: any[]): Promise<void> {
		const parameterPattern = /\{(.*)\}/g;
		let match = parameterPattern.exec(msg);
		let result = "";
		
		while (match) {
			const isDebugMatch = match[1] === "?:";
			match = parameterPattern.exec(msg);
		}
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
