import { LoggerConfiguration } from "./LoggerConfiguration";
import { LogLevel } from "./LogLevel";

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
		if (this.local.level != null) {
			return this.local.level;
		} else {
			return this.parent.level;
		}
	}
	
	set name(newName: string) {
		this.local.name = newName;
	}
	
	get name(): string {
		if (this.local.name != null) {
			return this.local.name;
		} else {
			return this.parent.name;
		}
	}
}
