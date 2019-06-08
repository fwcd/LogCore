import { Logger } from "./logger/Logger";
import { DefaultLogger } from "./logger/DefaultLogger";
import { HierarchialLoggerConfiguration } from "./logger/HierarchialLoggerConfiguration";
import { LoggerConfiguration } from "./logger/LoggerConfiguration";
import { ConsoleBackend } from "./backend/ConsoleBackend";
import { LogLevel } from "./logger/LogLevel";

/**
 * Creates loggers and manages a configuration
 * that is shared by all loggers generated
 * through the `LoggingManager`.
 * 
 * A common use case is to have a global `LoggingManager`
 * instance in your application that serves as a
 * starting point for new loggers.
 */
export class LoggingManager {
	/**
	 * The shared logger configuration.
	 * Custom loggers can override these
	 * settings by specifying own values.
	 */
	readonly config: LoggerConfiguration;
	
	/**
	 * Creates a new logging managers with
	 * (optionally) a custom set of parameters.
	 * Any parameters that are left unspecified
	 * are substituted with the default values.
	 * 
	 * @param config The custom configuration entries
	 */
	constructor(config?: LoggerConfiguration) {
		// Setup default configuration
		this.config = {
			name: "Logger",
			backend: new ConsoleBackend(),
			level: LogLevel.Info
		};
		// If specified, assign custom configuration entries
		if (config) {
			Object.assign(this.config, config);
		}
	}
	
	/**
	 * Fetches a named logger that inherits
	 * the configuration of this manager.
	 * 
	 * @param name The name of the logger
	 */
	loggerWithName(name: string): Logger {
		const subConfig = new HierarchialLoggerConfiguration(this.config);
		subConfig.name = name;
		return new DefaultLogger(subConfig);
	}
}
