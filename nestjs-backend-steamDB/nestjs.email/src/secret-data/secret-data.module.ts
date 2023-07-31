import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SecretDataService } from './secret-data.service';
import { PostSecret, PostSecretSchema } from './secret-data.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PostSecret.name, schema: PostSecretSchema },
    ]),
  ],
  providers: [SecretDataService],
  exports: [SecretDataService],
})
export class SecretDataModule {}
