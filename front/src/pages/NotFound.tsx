import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import { ErrorOutline } from '@mui/icons-material';

import { PATH } from 'constants/layout/header/menu';

import { useAppSelector } from 'hooks';

import { getGreyColor } from 'common/util';

import Popup from 'components/Popup';

import styles from 'assets/styles/pages/not-found.module.scss';

const NotFound = () => {
    const [seconds, setSeconds] = useState(5);

    const navigate = useNavigate();
    const setVisibleFalse = () => navigate(PATH.HOME);

    const timeout = () => {
        if (seconds > 0) {
            setSeconds(seconds - 1);
        } else {
            setVisibleFalse();
        }
    };

    setTimeout(timeout, 1000);

    const { palette } = useTheme();
    const mode = useAppSelector(({ palette: { mode } }) => mode);

    return (
        <Popup width={340} severity="error" icon={<ErrorOutline />} label="Error"
            content={
                <div id={styles.notFound}>
                    <p style={{ color: palette.error.main }}>잘못된 경로 또는 권한이 없습니다.</p>
                    <p style={{ color: getGreyColor(palette, mode) }}>({seconds}초 후에 메인 페이지로 이동합니다.)</p>
                </div>
            }
            isVisible={true} setVisibleFalse={setVisibleFalse}
        />
    );
};

export default NotFound;
