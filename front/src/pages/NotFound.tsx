import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import { ErrorOutline } from '@mui/icons-material';

import { group } from 'enums/layout/header/menu';

import Popup from 'layout/Popup';

import styles from 'assets/styles/pages/not-found.module.scss';

const NotFound = () => {
    const [seconds, setSeconds] = useState(5);

    const navigate = useNavigate();

    const theme = useTheme();

    const setVisibleFalse = () => navigate(group.HOME.PATH);

    const timer = () => {
        if (seconds === 0) {
            setVisibleFalse();
        } else {
            setSeconds(seconds - 1);
        }
    };

    setTimeout(() => timer(), 1000);

    return (
        <Popup isVisible={true} setVisibleFalse={setVisibleFalse} width={340} severity="error" icon={<ErrorOutline />} label="Error"
            content={
                <>
                    <p id={styles.message} style={{ color: theme.palette.error.main }}>잘못된 경로 또는 권한이 없습니다.</p>
                    <p id={styles.seconds}>({seconds}초 후에 메인 페이지로 이동합니다.)</p>
                </>
            }
        />
    );
};

export default NotFound;
