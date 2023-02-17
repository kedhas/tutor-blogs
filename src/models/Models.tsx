
export interface Lesson {
    title: string;
    fileName: string;
    subTitles: {
        displayName: string;
        fileName: string;
    }[];
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
