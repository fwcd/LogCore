/**
 * A logging interface that consumes
 * parameterized messages of arbitrary
 * log levels.
 * 
 * The most common log levels have convenience
 * methods that should be delegated to 'log'.
 */
export interface Logger {
	/**
	 * 
	 * 
	 * @param level The logging level (highest: never, lowest: always)
	 * @param msg The parameterized message to log
	 * @param args The arguments which are inserted into the parameters
	 */
	log(level: number, msg: string, ...args: any[]): Promise<void>;
	
	error(msg: string, ...args: any[]): Promise<void>;
	
	warn(msg: string, ...args: any[]): Promise<void>;
	
	info(msg: string, ...args: any[]): Promise<void>;
	
	debug(msg: string, ...args: any[]): Promise<void>;
	
	trace(msg: string, ...args: any[]): Promise<void>;
	
	deepTrace(msg: string, ...args: any[]): Promise<void>;
}
