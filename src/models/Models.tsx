
export interface TechStack {
    catagory: string,
    techs: Tech[]
}

export interface Tech {
    title: string,
    image: string,
    route: string
}

export interface Lesson {
    title: string;
    fileName: string;
    subTitles: Lesson[];
}

export interface Topic {
    title: string,
    subTitles: SubTopic[],
    fileName: string
}

export interface SubTopic {
    displayName: string,
    fileName: string
}
