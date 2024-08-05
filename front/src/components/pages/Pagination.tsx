import { Pagination as MaterialPagination } from '@mui/material';

import type Component from 'types/components/pages/pagination';

const Pagination = ({
    totalPages, onChange
}: Component) =>
    <MaterialPagination count={totalPages} siblingCount={2} size="small" shape="rounded" onChange={onChange} />
;

export default Pagination;
