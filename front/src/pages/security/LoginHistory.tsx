import { useState } from 'react';

import { useQuery } from 'react-query';

import { Pagination } from '@mui/material';

import type { Params, Content } from 'types/apis/pages/security/loginHistory';

import { list } from 'apis/pages/security/loginHistory';

import Loading from 'components/pages/Loading';

const queryKey = {
    LIST: 'loginHistory/list',
} as const;

const LoginHistory = () => {
    const [params, setParams] = useState<Params>({});
    const [content, setContent] = useState<Content[]>([]);
    const [totalPages, setTotalPages] = useState(1);

    const onChange = (_event: React.ChangeEvent<unknown>, page: number) => {
        setParams({ ...params, page });
    };

    const { isLoading } = useQuery(
        [queryKey.LIST, params],
        () => list(params),
        {
            onSuccess({ data }) {
                setContent(data.content);
                setTotalPages(data.totalPages);
            }
        }
    );

    return (
        <>
            <Pagination count={totalPages} shape="rounded" size="small" siblingCount={2} onChange={onChange} />
            {isLoading &&
                <Loading />
            }
        </>
    );
};

export default LoginHistory;
