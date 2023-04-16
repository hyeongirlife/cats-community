import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    // console.log('req.ip', req.ip);
    // console.log('req.originalUrl', req.originalUrl);
    res.on('finish', () => {
      this.logger.log(req);
      this.logger.log(`${req.ip} ${req.originalUrl} ${res.statusCode}`);
    });
    next();
  }
}
