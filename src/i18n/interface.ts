import { ResourceLanguage } from "i18next"

export default interface ITranslation extends ResourceLanguage {
  translation: {
    moreInfo: string,
    visitSite: string,
    viewSource: string,
    welcomeMessagePart1: string,
    welcomeMessagePart2: string
  }
}