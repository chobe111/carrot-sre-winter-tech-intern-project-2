import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VpcController } from './vpc/vpc.controller';
import { VpcService } from './vpc/vpc.service';
import { VpcModule } from './vpc/vpc.module';
import { SubnetController } from './subnet/subnet.controller';
import { SubnetService } from './subnet/subnet.service';
import { SubnetModule } from './subnet/subnet.module';
import { RegionService } from './region/region.service';
import { ConfigModule } from '@nestjs/config';
import { AwsService } from './aws/aws.service';
import { AwsModule } from './aws/aws.module';
import configuration from './configs/configuration';
import { DatabaseModule } from './database/database.module';
@Module({
  imports: [
    VpcModule,
    DatabaseModule,
    AwsModule,
    SubnetModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
