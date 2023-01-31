import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'COUCOU COMMENT TU VAS ?';
  }
}
