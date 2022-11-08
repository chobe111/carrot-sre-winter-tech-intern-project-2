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

@Module({
  imports: [VpcModule, SubnetModule, ConfigModule.forRoot()],
  controllers: [AppController, VpcController, SubnetController],
  providers: [AppService, VpcService, SubnetService, RegionService],
})
export class AppModule {}
