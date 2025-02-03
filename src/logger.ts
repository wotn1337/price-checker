import path from "path";
import pino from "pino";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileTransport = pino.transport({
  targets: [
    {
      target: "pino-pretty",
      options: { destination: path.resolve(__dirname, "..", "bot.log") },
    },
    {
      target: "pino-pretty",
    },
  ],
});

export const logger = pino({}, fileTransport);
