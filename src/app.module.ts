import { Module } from '@nestjs/common';
import { SubnetModule } from './domain/subnet/subnet.module';
import { ConfigModule } from '@nestjs/config';
import { AwsModule } from './aws/aws.module';
import configuration from './configs/configuration';
import { DatabaseModule } from './database/database.module';
import { VpcModule } from './domain/vpc/vpc.module';

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
})
export class AppModule {}
