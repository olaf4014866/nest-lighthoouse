import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LighthouseController } from './lighthouse/lighthouse.controller';

@Module({
  imports: [],
  controllers: [AppController, LighthouseController],
  providers: [AppService],
})
export class AppModule {}
