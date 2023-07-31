import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { ItemAddedValidation } from './item-added.model';
import { AxiosResponse } from 'axios';

interface ItemAddedResponseTypes {
  Dashboard_id: string;
  price: string;
  title: string;
  sender: string;
  description: string;
}
const query =
  'query MyQuery {itemAddeds { sender description title price Dashboard_id}}';

@Injectable()
export class ItemAddedService {
  constructor(private httpService: HttpService) {}

  async fetchItemAddedDataFn(): Promise<ItemAddedValidation> {
    const itemAddedFromResponse: any = (
      await lastValueFrom(
        this.httpService.post<Promise<AxiosResponse>>(
          'https://api.studio.thegraph.com/query/47308/steamkeys/version/latest',
          {
            query,
          },
        ),
      )
    ).data;
    const findMaxIdItem: ItemAddedResponseTypes =
      itemAddedFromResponse.data.itemAddeds.reduce(
        (max: any, item: any) =>
          +item.Dashboard_id > +max.Dashboard_id ? item : max,
        itemAddedFromResponse.data.itemAddeds[0],
      );

    return findMaxIdItem;
  }
}
