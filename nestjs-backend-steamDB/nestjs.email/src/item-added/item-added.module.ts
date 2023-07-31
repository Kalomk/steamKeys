import { Module } from '@nestjs/common';
import { ItemAddedService } from './item-added.service';
import { HttpModule } from '@nestjs/axios';
@Module({
  providers: [ItemAddedService],
  imports: [
    HttpModule, // Import HttpModule to use HttpService
  ],
  exports: [ItemAddedService],
})
export class ItemAddedModule {}
