import { Typography as MaterialTypography } from '@mui/material';

import type Component from 'types/components/pages/typography';

const Typography = ({
    variant = 'h6', content
}: Component) =>
    <MaterialTypography variant={variant} gutterBottom>{content}</MaterialTypography>
;

export default Typography;
