export default interface Menu {
    HOME: Detail;
    INFORMATION: Detail;
};

export interface Detail {
    icon: JSX.Element;
    label: string;
    path: string;
    subMenus: SubMenu[];
};

export interface SubMenu {
    icon: JSX.Element;
    label: string;
    path: string;
    isOpen? : boolean;
};
