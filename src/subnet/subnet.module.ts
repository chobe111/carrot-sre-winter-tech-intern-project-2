import { Module } from '@nestjs/common';
import { AwsService } from 'src/aws/aws.service';
import { DatabaseModule } from 'src/database/database.module';
import { SubnetService } from './subnet.service';
@Module({
  imports: [DatabaseModule],
  providers: [SubnetService, AwsService],
})
export class SubnetModule {}
