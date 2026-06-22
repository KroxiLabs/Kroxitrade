export type TranslationParams = Record<string, string | number>
export type TranslationValue = string | ((params: TranslationParams) => string)
