import { Method } from './request';

type LoggingArgs = [Method, string, any];

const log = (title: string, color: string, ...args: any[]) => {
  process.env.NODE_ENV !== 'production' &&
    console.log(`%c:: ${title} :: `, `color: ${color}`, ...args);
};

const logging = {
  req: (...args: LoggingArgs) => log('📝 REQUEST', '#bada55', ...args),
  res: (...args: LoggingArgs) => log('📦 RESPONSE', '#00c5ff', ...args),
  err: (...args: LoggingArgs) => log('📦 ERROR', '#ff5757', ...args),
};

export default logging;
