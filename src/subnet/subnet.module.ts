import { Module } from '@nestjs/common';
import { AwsService } from 'src/aws/aws.service';
import { DatabaseModule } from 'src/database/database.module';
import { SubnetController } from './subnet.controller';
import { SubnetService } from './subnet.service';
@Module({
  providers: [SubnetService],
  controllers: [SubnetController],
})
export class SubnetModule {}
