import { Module } from '@nestjs/common';
import { AwsService } from 'src/aws/aws.service';
import { DatabaseModule } from 'src/database/database.module';
import { subnetProviders } from './providers/subnet.providers';
import { SubnetController } from './subnet.controller';
import { SubnetService } from './subnet.service';
@Module({
  providers: [SubnetService, ...subnetProviders],
  controllers: [SubnetController],
  exports: [SubnetService, ...subnetProviders],
})
export class SubnetModule {}
