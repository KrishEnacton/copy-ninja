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

export const selectedFolderState = atom({
    key: 'selectedFolderState',
    default: null as any
})

export const searchInputState = atom({
    key: 'searchInputState',
    default: ""  as string
})