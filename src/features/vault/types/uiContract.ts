import { ChainIds } from '../../wallet/constants';

export interface UIContract {
  chainId: ChainIds;
  address: string;
}
