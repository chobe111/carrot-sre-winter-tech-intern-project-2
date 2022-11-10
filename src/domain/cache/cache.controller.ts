import { Controller, Get, Post } from '@nestjs/common';
import { CacheService } from './cache.service';

@Controller('carrot/v1/cache')
export class CacheController {
  constructor(private readonly cacheService: CacheService) {}

  @Get()
  async syncCache() {
    this.cacheService.syncDatabase();
  }
}
