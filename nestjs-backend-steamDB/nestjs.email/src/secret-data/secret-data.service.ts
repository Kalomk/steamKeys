// secret-data.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostSecret, SecretData } from './secret-data.schema';

@Injectable()
export class SecretDataService {
  constructor(
    @InjectModel(PostSecret.name)
    private readonly postSecretModel: Model<PostSecret>,
  ) {}

  async fetchSecretData(): Promise<SecretData> {
    try {
      // Fetch the last data from the post_secret collection using Mongoose methods
      const lastData = await this.postSecretModel
        .findOne({}, {}, { sort: { _id: -1 } })
        .exec();

      if (!lastData) {
        return null;
      }

      // Map the retrieved data to the SecretData interface
      const secretData: SecretData = {
        email: lastData.email,
        secretKey: lastData.secretKey,
      };

      return secretData;
    } catch (error) {
      console.error('Error fetching secret data:', error);
      throw new Error('Error fetching secret data');
    }
  }
}
