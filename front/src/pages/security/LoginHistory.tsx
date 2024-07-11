import { useState } from 'react';
import { useQuery } from 'react-query';

import type { Params } from 'types/apis/pages/security/loginHistory';

import { list } from 'apis/pages/security/loginHistory';

import Pagination from 'components/Pagination';
import Loading from 'components/Loading';

const queryKey = {
    LIST: 'loginHistory/list',
} as const;

const LoginHistory = () => {
    const [params, setParams] = useState<Params>({});
    const [totalPages, setTotalPages] = useState(1);

    const { isLoading, data: response } = useQuery([queryKey.LIST, params], () => list(params), { onSuccess({ data }) { setTotalPages(data.totalPages); } });

    const onChange = (_event: React.ChangeEvent<unknown>, page: number) => setParams({ ...params, page });

    console.log(totalPages);

    return (
        <>
            <Pagination totalPages={totalPages} onChange={onChange} />
            {isLoading &&
                <Loading />
            }
        </>
    );
};

export default LoginHistory;
