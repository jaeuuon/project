import { memo } from 'react';

import { Pagination as MaterialPagination } from '@mui/material';

import type Component from 'types/components/pages/pagination';

const Pagination = ({
    totalPages, onChange
}: Component) => {
    return (
        <MaterialPagination count={totalPages} siblingCount={2} size="small" shape="rounded" onChange={onChange} />
    );
};

export default memo(Pagination);
