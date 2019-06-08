import { LoggerConfiguration } from "./LoggerConfiguration";

/**
 * A logging interface that consumes
 * parameterized messages of arbitrary
 * log levels.
 * 
 * The most common log levels have convenience
 * methods that should be delegated to 'log'.
 */
export interface Logger {
	readonly config: LoggerConfiguration;
	
	/**
	 * Logs a message at the desired level, automatically
	 * substituting parameters in the message by the
	 * arguments passed as rest parameters.
	 * 
	 * Currently two placeholders are supported:
	 * 
	 * * `{}` indicates that the object should be converted
	 * to a normal string representation
	 * 
	 * * `{?:}` indicates that a JSON representation of
	 * the output should be used
	 * 
	 * @param level The logging level (highest: never, lowest: always)
	 * @param msg The parameterized message to log
	 * @param args The arguments which are inserted into the parameters
	 */
	log(level: number, msg: string, ...args: any[]): Promise<void>;
	
	/**
	 * Logs a message at the `Error` level. For more
	 * detailed documentation regarding the format
	 * of these messages see the `log` method.
	 */
	error(msg: string, ...args: any[]): Promise<void>;
	
	/**
	 * Logs a message at the `Warn` level. For more
	 * detailed documentation regarding the format
	 * of these messages see the `log` method.
	 */
	warn(msg: string, ...args: any[]): Promise<void>;
	
	/**
	 * Logs a message at the `Info` level. For more
	 * detailed documentation regarding the format
	 * of these messages see the `log` method.
	 */
	info(msg: string, ...args: any[]): Promise<void>;
	
	/**
	 * Logs a message at the `Debug` level. For more
	 * detailed documentation regarding the format
	 * of these messages see the `log` method.
	 */
	debug(msg: string, ...args: any[]): Promise<void>;
	
	/**
	 * Logs a message at the `Trace` level. For more
	 * detailed documentation regarding the format
	 * of these messages see the `log` method.
	 */
	trace(msg: string, ...args: any[]): Promise<void>;
	
	/**
	 * Logs a message at the `DeepTrace` level. For more
	 * detailed documentation regarding the format
	 * of these messages see the `log` method.
	 */
	deepTrace(msg: string, ...args: any[]): Promise<void>;
}
