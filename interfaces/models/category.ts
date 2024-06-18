export enum TypeCategoryEnum {
  "Expenses",
  "Income",
}

export interface ICategoryView {
  id: number;
  title: string;
  type: TypeCategoryEnum;
  iconUrl?: string;
  color: string;
}
