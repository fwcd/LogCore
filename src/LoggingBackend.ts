/**
 * A sink for the final log messages that
 * can be directly output to some destination,
 * e.g. the console or a log file.
 */
export interface LoggingBackend {
	/**
	 * Directly outputs a message.
	 * 
	 * @param msg The message to output
	 */
	output(msg: string): Promise<void>;
}
