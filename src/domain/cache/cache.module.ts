import { Global, Module } from '@nestjs/common';
import { CacheController } from './cache.controller';
import { CacheService } from './cache.service';

@Global()
@Module({
  providers: [CacheService],
  controllers: [CacheController],
  exports: [CacheService],
})
export class CacheModule {}
