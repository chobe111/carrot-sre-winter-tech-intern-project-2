import { Module } from '@nestjs/common';
import { VpcService } from './vpc.service';

@Module({
  providers: [VpcService]
})
export class VpcModule {}
