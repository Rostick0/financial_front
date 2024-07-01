import type { IUserBelongWithDateModel } from "../utils/userBelong";
import type { ICategoryView } from "./category";

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
