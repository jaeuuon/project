import { Data } from 'types/apis/response';

export default interface List<T extends {}, U> {
    column: T;
    data?: Data<U>;
    onChange: (_event: React.ChangeEvent<unknown>, page: number) => void;
};
