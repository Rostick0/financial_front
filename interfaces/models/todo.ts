import type { IUserBelongWithDateModel } from "../utils/userBelong";

export interface ITodoView extends IUserBelongWithDateModel {
    id: number,
    title: string,
    description?: string;
    sum: number,
    categoryId: number,
    category?: null
}
