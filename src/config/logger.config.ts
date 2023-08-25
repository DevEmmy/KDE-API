import pino from "pino";
import PinoPretty from "pino-pretty";

const logger = pino(PinoPretty());

export default logger;
