import { Module } from '@nestjs/common';
import { VpcService } from './vpc.service';
import { AwsService } from 'src/aws/aws.service';
import { DatabaseModule } from 'src/database/database.module';
@Module({
  imports: [DatabaseModule],
  providers: [VpcService, AwsService],
})
export class VpcModule {}
