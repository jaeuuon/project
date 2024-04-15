import { useState, useEffect } from 'react';

const Header = () => {
    const [isVisibleShadow, setVisibleShadow] = useState(false);

    const handleScrollY = () => setVisibleShadow(window.scrollY > 0 ? true : false);

    useEffect(() => {
        window.addEventListener('scroll', handleScrollY);

        return () => window.removeEventListener('scroll', handleScrollY);
    }, []);

    return (
        <div id="div-layout-header" className={isVisibleShadow ? 'shadow-bottom' : ''}>
            <div id="div-layout-header-content">Header</div>
        </div>
    );
};

export default Header;
