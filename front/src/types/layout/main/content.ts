import { IsInit, Roles } from 'types/layout/header/user';

export interface Main extends IsInit, Roles {
    isRequiredInit: boolean;
};
