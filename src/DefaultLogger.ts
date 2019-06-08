import { LogLevel } from "./LogLevel";
import { Logger } from "./Logger";
import { LoggingBackend } from "./LoggingBackend";
import { LoggerConfiguration } from "./LoggerConfiguration";
import { stringContainsAtIndex } from "./StringUtilities";

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
	private supportedPlaceholders = {
		"{}": arg => this.stringify(arg),
		"{?:}": arg => JSON.stringify(arg)
	};
	
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
	
	/**
	 * Transforms the argument into a string
	 * resprentation. If a function is passed,
	 * it is evaluated before converting the
	 * result to a string.
	 */
	private stringify(arg: any): string {
		if (typeof arg == "function") {
			return this.stringify(arg());
		} else {
			return "" + arg;
		}
	}
	
	async log(level: number, msg: string, ...args: any[]): Promise<void> {
		let result = "";
		let parameterIndex = 0;
		let charIndex = 0;
		
		function validateParameterLength() {
			if (parameterIndex >= args.length) {
				throw new Error(`Too few parameters specified in log invocation, message '${msg}' requires more than ${parameterIndex + 1}, only got ${args.length} (${args}) though.`);
			}
		}
		
		// Iterate character-by-character through the message
		while (charIndex < msg.length) {
			let foundPlaceholder = false;
			
			// Substitute placeholder if found
			for (const placeholder in this.supportedPlaceholders) {
				if (stringContainsAtIndex(msg, placeholder, charIndex)) {
					validateParameterLength();
					
					const stringifier = this.supportedPlaceholders[placeholder];
					result += stringifier(args[parameterIndex]);
					
					parameterIndex++;
					charIndex += placeholder.length;
					foundPlaceholder = true;
					break;
				}
			}
			
			// If no placeholder was found, just append the character
			if (!foundPlaceholder) {
				result += msg.charAt(charIndex);
				charIndex++;
			}
		}
		
		this.outputMessage(result);
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
