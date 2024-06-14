export default interface Footer {
    SKILL_BADGES: SkillBadge[]; 
    THEME_COLOR: string;
    CREATOR: Creator;
};

interface SkillBadge {
    SRC: string;
    ALT: string;
    URL: string;
};

interface Creator {
    URL: string;
    NAME: string;
};
