import type { IUserBelongWithDateModel } from "../utils/userBelong";
import type { ICategoryView, TypeCategory } from "./category";

export interface ITodoView extends IUserBelongWithDateModel {
  id: number;
  title: string;
  description?: string;
  sum: number;
  date: Date;
  categoryId: number;
  category: ICategoryView | null;
}

export interface ITodoPeriodView extends ITodoView {
  total: number;
}

export interface ITodoMutation {
  type: TypeCategory;
  title?: string | null;
  description?: string | null;
  sum: string | null;
  date: any;
  categoryId: number | null;
  img?: any;
}