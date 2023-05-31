

export const setLocalStorage = (name: string, value: any)  => {
    localStorage.setItem(name, JSON.stringify(value))
}
export const getLocalStorage = (name: string)  => {
    return JSON.parse(localStorage.getItem(name) ?? "null") as any
}