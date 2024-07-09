import { useState } from 'react';

import { Pagination } from '@mui/material';

import type { Params } from 'types/apis/pages/security/loginHistory';

import { list } from 'apis/pages/security/loginHistory';

const LoginHistory = () => {
    const [params, setParams] = useState<Params>({});

    const onChange = (_event: React.ChangeEvent<unknown>, page: number) => {
        setParams({ ...params, page });
    };

    return (
        <>
            <Pagination count={10} shape="rounded" onChange={onChange} />
        </>
    );
};

export default LoginHistory;
