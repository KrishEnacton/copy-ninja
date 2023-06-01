export const setLocalStorage = (name: string, value: any) => {
  localStorage.setItem(name, JSON.stringify(value))
}
export const getLocalStorage = (name: string) => {
  return JSON.parse(localStorage.getItem(name) ?? 'null') as any
}

export function pickRandomVariable(text: string) {
  const regex = /{([^{}]+)}/g
  return text.replace(regex, (match, group) => {
    const options = group.split('|')
    const randomIndex = Math.floor(Math.random() * options.length)
    return options[randomIndex]
  })
}

// Generate a random sentence by replacing the variables
export function generateRandomSentence(sentenceTemplate?: string) {
  if (sentenceTemplate) return pickRandomVariable(sentenceTemplate)
}
