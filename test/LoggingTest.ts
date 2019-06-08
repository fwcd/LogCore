import "mocha";
import { expect } from "chai";
import { DefaultLogger } from "../src/logger/DefaultLogger";
import { LoggingBackend } from "../src/backend/LoggingBackend";
import { LoggingManager } from "../src/LoggingManager";
import { LoggingTestBackend } from "./LoggingTestBackend";

describe("LoggingTest", () => {
	it("should log messages to inherited backend", () => {
		const parentBackend = new LoggingTestBackend();
		const manager = new LoggingManager({ backend: parentBackend });
		const log = manager.loggerWithName("sample");
		
		log.info("test");
		log.info("123");
		expect(parentBackend.messages).to.deep.equal(["test", "123"]);
	});
	it("should log messages to custom backend", () => {
		const backend = new LoggingTestBackend();
		const log = new LoggingManager().logger();
		log.config.backend = backend;
		
		log.info("abc");
		log.info("def");
		expect(backend.messages).to.deep.equal(["abc", "def"]);
	});
	it("should log parameterized messages", () => {
		const backend = new LoggingTestBackend();
		const log = new LoggingManager().logger();
		log.config.backend = backend;
		
		log.info("4 + {} = {}, a {}: {?:}", 5, 9, "JSON object", {test: 123, demo: true});
		expect(backend.messages).to.deep.equal(["4 + 5 = 9, a JSON object: {\"test\":123,\"demo\":true}"]);
	});
});
