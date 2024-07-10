import type { Data } from 'types/apis/response';

export default interface Table<T extends unknown, U extends {}> extends Data<T> {
    column: U;
    onChange: (_event: React.ChangeEvent<unknown>, page: number) => void;
};
