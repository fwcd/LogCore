import "mocha";
import { expect } from "chai";
import { DefaultLogger } from "../src/logger/DefaultLogger";
import { LoggingBackend } from "../src/backend/LoggingBackend";
import { LoggingManager } from "../src/LoggingManager";

describe("LoggingTest", () => {
	// A backend for testing that writes all
	// output messages into an array
	const backend = <LoggingBackend> {
		messages: [] as string[],
		async output(msg: string): Promise<void> {
			this.messages.push(msg)
		}
	};
	const manager = new LoggingManager();
	
	// TODO
});
