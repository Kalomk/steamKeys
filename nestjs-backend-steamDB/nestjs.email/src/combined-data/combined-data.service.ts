import { Injectable } from '@nestjs/common';
import { ItemAddedService } from 'src/item-added/item-added.service';
import { SecretDataService } from 'src/secret-data/secret-data.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CombinedData } from './combined-data.schema';
import { EmailService } from 'src/email/email.service';
@Injectable()
export class CombinedDataService {
  constructor(
    private secretDataService: SecretDataService,
    private itemAddedService: ItemAddedService,
    private emailService: EmailService,
    @InjectModel(CombinedData.name)
    private readonly combinedDataModel: Model<CombinedData>, // Inject the CombinedData model
  ) {}
  async createCombinedData() {
    const secretData = await this.secretDataService.fetchSecretData();
    const itemAddedData = await this.itemAddedService.fetchItemAddedDataFn();
    const combinedData = { ...secretData, ...itemAddedData };

    //save combined data to db
    // Perform an upsert operation based on the Dashboard_id
    await this.combinedDataModel.findOneAndUpdate(
      { Dashboard_id: combinedData.Dashboard_id },
      combinedData,
      { upsert: true }, // Set upsert option to true to insert if not found
    );

    return [combinedData];
  }
  async getCombinedDataById(id: string, buyerEmail: string, userName: string) {
    try {
      const searchedCD: any = await this.combinedDataModel
        .findOne({ Dashboard_id: id })
        .lean()
        .exec();
      if (!searchedCD) {
        throw new Error(`No data found for ID: ${id}`);
      }
      // add a buyerEmail field
      searchedCD.buyerEmail = buyerEmail;
      searchedCD.userName = userName;

      //   Send emails and perform other actions
      this.emailService.ownerEmailSend(searchedCD);
      this.emailService.buyerEmailSend(searchedCD);
      // Delete the data
      await this.combinedDataModel.deleteOne({ Dashboard_id: id }).exec();
      console.log(searchedCD);
      return [searchedCD];
    } catch (error) {
      console.log(error);
      throw new Error('Error retrieving data by ID');
    }
  }
}
