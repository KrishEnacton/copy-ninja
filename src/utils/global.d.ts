/// <reference types="vite/client" />

declare const __APP_VERSION__: string


export interface IconProps {
    className?: string
}

export interface QueryProps {
    isCta?: boolean
    answer?: string
    cta?: string
}

export interface TopicParams {
    id?: number
    folderId?: number
    topic?: string
    answer?: string
    cta?: string
}