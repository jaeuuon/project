import type { Roles } from '../enums/user';

import type CodeValue from './codeValue';

type Id = number | undefined;
type Name = string | undefined;

export default interface User {
    id: Id;
    name: Name;
    roles: CodeValue<Roles>[];
};
