import { Module } from '@nestjs/common';
import { VpcService } from './vpc.service';
import { AwsService } from 'src/aws/aws.service';
import { VpcProviders } from './providers/vpc.providers';
import { VpcController } from './vpc.controller';
@Module({
  providers: [VpcService, ...VpcProviders],
  controllers: [VpcController],
  exports: [VpcService, ...VpcProviders],
})
export class VpcModule {}
