import { memo } from 'react';

import { Pagination as MaterialPagination } from '@mui/material';

import type PaginationType from 'types/components/list/pagination';

const Pagination = ({
    totalPages, onChange
}: PaginationType) => {
    return (
        <MaterialPagination count={totalPages} siblingCount={2} size="small" shape="rounded" onChange={onChange} />
    );
};

export default memo(Pagination);
