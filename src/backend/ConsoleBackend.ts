import { LoggingBackend } from "./LoggingBackend";

/**
 * A minimalistic backend that writes messages
 * to the console.
 */
export class ConsoleBackend implements LoggingBackend {
	async output(msg: string): Promise<void> {
		console.log(msg);
	}
}
