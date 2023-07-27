import { ResourceLanguage } from "i18next"

export default interface ITranslation extends ResourceLanguage {
  translation: {
    submit: string,
    start: string,
    moreInfo: string,
    visitSite: string,
    viewSource: string,
    welcomeMessagePart1: string,
    welcomeMessagePart2: string,
    welcomeMessagePart3: string,
    welcomeFootnote: string,
    contactPart1: string,
    contactPart2: string,
    contactPart3: string,
    contactPart4: string,
    contactFormName: string,
    contactFormComment: string,
    contactFormError: string,
    contactFormSuccess: string
  }
}