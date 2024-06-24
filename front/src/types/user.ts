import type { Roles } from 'enums/user';

import type CodeValue from 'types/codeValue';

type Id = number | undefined;
type Email = string | undefined;
type Name = string | undefined;
type Exp = number | undefined;

export default interface User {
    id: Id;
    email: Email;
    name: Name;
    roles: CodeValue<Roles>[];
    exp: Exp;
};
