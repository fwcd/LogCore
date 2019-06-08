import { LoggerConfiguration } from "./LoggerConfiguration";
import { LogLevel } from "./LogLevel";
import { LoggingBackend } from "../backend/LoggingBackend";

/**
 * A logging configuration that inherits another
 * configuration. Setting the values will
 * override the parent configuration.
 */
export class HierarchialLoggerConfiguration implements LoggerConfiguration {
	private parent?: LoggerConfiguration;
	private local: LoggerConfiguration = {};
	
	constructor(parent?: LoggerConfiguration) {
		this.parent = parent;
	}
	
	set level(newLevel: LogLevel) {
		this.local.level = newLevel;
	}
	
	get level(): LogLevel {
		return (this.local.level != null) ? this.local.level : this.parent.level;
	}
	
	set name(newName: string) {
		this.local.name = newName;
	}
	
	get name(): string {
		return (this.local.name != null) ? this.local.name : this.parent.name;
	}
	
	set backend(newBackend: LoggingBackend) {
		this.local.backend = newBackend;
	}
	
	get backend(): LoggingBackend {
		return (this.local.backend != null) ? this.local.backend : this.parent.backend;
	}
}
