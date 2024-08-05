import { memo } from 'react';

import { Typography as MuiTypography } from '@mui/material';

import type Component from 'types/components/pages/typography';

const Typography = memo(({
    variant = 'h6', content
}: Component) =>
    <MuiTypography variant={variant} gutterBottom>{content}</MuiTypography>
);

export default Typography;
