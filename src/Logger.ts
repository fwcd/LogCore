export interface Logger {
	log(level: number, msg: string, ...args: any[]): Promise<void>;
	
	error(msg: string, ...args: any[]): Promise<void>;
	
	warn(msg: string, ...args: any[]): Promise<void>;
	
	info(msg: string, ...args: any[]): Promise<void>;
	
	debug(msg: string, ...args: any[]): Promise<void>;
	
	trace(msg: string, ...args: any[]): Promise<void>;
	
	deepTrace(msg: string, ...args: any[]): Promise<void>;
}
