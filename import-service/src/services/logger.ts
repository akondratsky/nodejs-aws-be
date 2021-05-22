import { createLogger, transports, format } from 'winston';

const isDebugEnabled = process.env.ENV_DEBUG === 'true';

export const logger = createLogger({
  level: isDebugEnabled ? 'debug' : 'error',
  format: format.combine(
    format.timestamp(),
    format.simple()
  ),
  transports: [
    new transports.Console()
  ]
});
