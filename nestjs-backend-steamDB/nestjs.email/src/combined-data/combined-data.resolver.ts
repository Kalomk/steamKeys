import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { CombinedDataService } from './combined-data.service';
import { CombinedData, ItemBuyed } from './combinedData.model';

@Resolver((of) => CombinedData)
export class CombinedDataResolver {
  constructor(private combinedDataService: CombinedDataService) {}
  @Query((returns) => [CombinedData])
  getCombinedData() {
    return this.combinedDataService.createCombinedData();
  }
  @Mutation((returns) => [ItemBuyed])
  async getCombinedDataById(
    @Args('id') id: string,
    @Args('buyerEmail') buyerEmail: string,
    @Args('userName') userName: string,
  ) {
    return this.combinedDataService.getCombinedDataById(
      id,
      buyerEmail,
      userName,
    );
  }
}
