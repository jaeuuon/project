export interface SubMenu {
    icon: JSX.Element;
    label: string;
    path: string;
    isOpen? : boolean;
};

export interface Detail {
    icon: JSX.Element;
    label: string;
    path: string;
    subMenus: SubMenu[];
};

export default interface Menu {
    HOME: Detail;
    INFORMATION: Detail;
};
