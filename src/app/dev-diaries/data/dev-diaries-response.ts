import { IDevDiary } from "./dev-diaries.model";

export interface IDevDiariesResponse {
    total_entries: number;
    dev_diaries: IDevDiary[];
}