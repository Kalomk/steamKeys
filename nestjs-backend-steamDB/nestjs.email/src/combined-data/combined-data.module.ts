import { Module } from '@nestjs/common';
import { CombinedDataResolver } from './combined-data.resolver';
import { CombinedDataService } from './combined-data.service';
import { ItemAddedModule } from 'src/item-added/item-added.module';
import { SecretDataModule } from 'src/secret-data/secret-data.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CombinedDataSchema, CombinedData } from './combined-data.schema'; // Import the CombinedDataSchema
import { EmailModule } from 'src/email/email.module';

@Module({
  providers: [CombinedDataResolver, CombinedDataService],
  imports: [
    ItemAddedModule,
    SecretDataModule,
    EmailModule,
    MongooseModule.forFeature([
      { name: CombinedData.name, schema: CombinedDataSchema },
    ]),
  ],
})
export class CombinedDataModule {}
