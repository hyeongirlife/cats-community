import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    return (
      next
        .handle()
        //   .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
        .pipe(
          map((data) => ({
            success: true,
            data,
          })),
        )
    );
  }
}
