import { LoggingBackend } from "../backend/LoggingBackend";

/**
 * The settings for a logger. This
 * includes, for example, the level at
 * which messages are logged at.
 */
export interface LoggerConfiguration {
	/**
	 * The logging level. All messages with
	 * a level *above or equal* to this will
	 * be logged.
	 */
	level?: number;
	/**
	 * The logger's name. Usually this is either
	 * the file name or the type name.
	 */
	name?: string;
	/**
	 * The message sink that accepts the
	 * final message strings.
	 */
	backend?: LoggingBackend;
}
