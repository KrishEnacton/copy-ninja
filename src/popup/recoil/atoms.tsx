import { atom, atomFamily } from 'recoil'
import { QueryProps } from '../../utils/global'
import { getLocalStorage } from '../../utils'

export const topicType = atomFamily({
  key: 'topicType',
  default: (id) => '' as string,
})

export const queryParams = atom({
  key: 'queryParams',
  default: { answer: '', cta: '', isCta: false } as QueryProps,
})

export const selectedFolderState = atom({
  key: 'selectedFolderState',
  default: null as any,
})

export const searchInputState = atom({
  key: 'searchInputState',
  default: '' as string,
})
export const selectedFolder = atom({
  key: 'selectedFolder',
  default:
    (getLocalStorage('defaultSelectedFolder') as any) ||
    (getLocalStorage('allFolders')?.[0] as any) ||
    ({} as any),
})

export const allFoldersAtom = atom({
  key: 'allFoldersAtom',
  default: [] as any,
})
export const selectedType = atom({
  key: 'selectedType',
  default: { key: 'random', name: 'Random' } as { key: string; name: string },
})

export const selectedAnswerState = atom({
  key: 'selectedAnswerState',
  default: {} as any
})

export const selectedCTAState = atom({
  key: 'selectedCTAState',
  default: {} as any
})

export const generatedAnswerState = atom({
  key: 'generatedAnswer',
  default: "" as string
})

export const generatedCTAState = atom({
  key: 'generatedAnswer',
  default: "" as string | undefined
})