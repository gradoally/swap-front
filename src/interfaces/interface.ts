import { StaticImageData } from "next/image";

export interface IContent<Type> {
  status: string;
  loading: boolean;
  content: Type;
  message: string;
  progress: number;
}

export interface IToken {
  name: string;
  icon: StaticImageData;
  balance: number;
}