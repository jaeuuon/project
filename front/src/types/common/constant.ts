import type Menu from 'types/layout/menu';
import type Footer from 'types/layout/footer';

export default interface Constant {
    MENU: Menu;
    FOOTER: Footer;
    AUTHORIZATION: Authorization;
};

interface Authorization {
    TYPE: string;
    SESSION_STORAGE: SessionStorage;
}

interface SessionStorage {
    ACCESS: string;
    REFRESH: string;
}
