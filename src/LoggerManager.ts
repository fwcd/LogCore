import { Logger } from "./Logger";
import { DefaultLogger } from "./DefaultLogger";
import { HierarchialLoggerConfiguration } from "./HierarchialLoggerConfiguration";
import { LoggerConfiguration } from "./LoggerConfiguration";

/**
 * Creates loggers and manages a configuration
 * that is shared by all loggers generated
 * through the `LoggerManager`.
 * 
 * A common use case is to have a global `LoggerManager`
 * instance in your application that serves as a
 * starting point for new loggers.
 */
export class LoggerManager {
	readonly config: LoggerConfiguration;
	
	loggerWithName(name: string): Logger {
		const subConfig = new HierarchialLoggerConfiguration(this.config);
		subConfig.name = name;
		return new DefaultLogger(subConfig);
	}
}
