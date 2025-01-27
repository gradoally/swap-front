import { ISimulate } from "./interface";
import { IStonfiPool } from "./stonfi";

export interface IRequestProps {
  url: string;
  progress?: (progress: number) => void;
}

export interface IPostRequestProps extends IRequestProps {
  data?: any;
}

export interface IResponse<T> {
  status: string;
  data: T | null;
  message: string;
}

export interface IJettonBalancesRes<T> {
  balances: T;
}

export interface IStonfiPoolsRes {
  pool_list: IStonfiPool[];
}

export interface IStonfiPoolRes {
  found: boolean;
  inverted: boolean;
  pool: IStonfiPool;
}

export interface ISimulateRes {
  status: string;
  data: ISimulate | null;
}

export interface IReserveRes {
  swapable: boolean;
  reserves: [string, string];
}
