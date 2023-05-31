import { atom, atomFamily } from "recoil";
import { QueryProps } from "../../utils/global";


export const topicType = atomFamily({
    key:"topicType",
    default: id => '' as string,
})

export const selectedType = atom({
    key: 'selectedType',
    default: 'random' as string
})

export const queryParams = atom({
    key: 'queryParams',
    default: { answer: '', cta: '', isCta: false } as QueryProps
})

export const selectedFolder = atom({
    key: 'selectedFolder',
    default: null as any
})