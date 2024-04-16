import { useState, useEffect } from 'react';

const Header = () => {
    const [isTop, setTop] = useState(true);

    useEffect(() => {
        const handleScrollY = () => setTop(window.scrollY === 0 ? true : false);

        window.addEventListener('scroll', handleScrollY);

        return () => window.removeEventListener('scroll', handleScrollY);
    }, []);

    return (
        <div id="div-header" className={isTop ? 'box-shadow-none' : ''}>
            <div id="div-header-content">Header</div>
        </div>
    );
};

export default Header;
