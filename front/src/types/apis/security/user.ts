import type { Pageable } from 'types/apis/request';
import type { StringIndex } from 'types/signature';

export interface Params extends Pageable {};

interface Address {
    postalCode: string;
    address: string;
    addressDetail: string;
};

export interface Content extends StringIndex {
    id: number;
    email: string;
    name: string;
    address: Address;
};
