import { ResourceLanguage } from "i18next"

export default interface ITranslation extends ResourceLanguage {
  translation: {
    yes: string,
    no: string,
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
    contactFormSuccess: string,
    cells: {
      treeCell: string,
      hedgeCell: string,
      resumeCell: string
    }
  }
}