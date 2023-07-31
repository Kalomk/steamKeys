import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://padov6666:lublukiski777@cluster0.nh6yehy.mongodb.net/?retryWrites=true&w=majority',
    ),
  ],
})
export class MongoModule {}
