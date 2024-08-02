import { Typography as MaterialTypography } from '@mui/material';

import type Component from 'types/components/pages/typography';

const Typography = ({
    variant = 'h6', content
}: Component) => {
    return (
        <MaterialTypography variant={variant} gutterBottom>{content}</MaterialTypography>
    );
};

export default Typography;
