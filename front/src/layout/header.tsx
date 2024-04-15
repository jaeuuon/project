import { useState, useEffect } from 'react';

const Header = () => {
    const [isTop, setTop] = useState(true);

    const handleScrollY = () => setTop(window.scrollY == 0 ? true : false);

    useEffect(() => {
        window.addEventListener('scroll', handleScrollY);

        return () => window.removeEventListener('scroll', handleScrollY);
    }, []);

    return (
        <div id="div-layout-header" className={isTop ? 'box-shadow-none' : ''}>
            <div id="div-layout-header-content">Header</div>
        </div>
    );
};

export default Header;
