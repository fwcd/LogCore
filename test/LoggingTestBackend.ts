import { LoggingBackend } from "../src/backend/LoggingBackend";

export class LoggingTestBackend implements LoggingBackend {
	readonly messages: string[] = [];
	
	async output(msg: string): Promise<void> {
		this.messages.push(msg);
	}
}
