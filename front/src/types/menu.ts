import SubMenu from './menu/subMenu';

interface Detail {
    icon: JSX.Element;
    label: string;
    path: string;
    subMenus: SubMenu[];
}

interface Menu {
    HOME: Detail;
    INFORMATION: Detail;
}

export default Menu;
