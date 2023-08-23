import { ResourceLanguage } from "i18next"

export default interface ITranslation extends ResourceLanguage {
  translation: {
    yes: string,
    no: string,
    submit: string,
    start: string,
    projectsPage: {
      moreInfo: string,
      visitSite: string,
      viewSource: string,
    },
    welcomePage: {
      parts: string[],
      footnote: string
    },
    contactPage: {
      parts: string[]
      formName: string,
      formComment: string,
      formError: string,
      formSuccess: string
    },
    aboutPage: {
      thisSite: {
        title: string
        main: {
          parts: string[]
          here: string,
        },
        colorScheme: {
          title: string,
          parts: string[]
        },
        ditheringEffect: {
          title: string,
          parts: string[]
        },
        navigationGame: {
          title: string,
          parts: string[]
        }
      },
      me: {
        title: string,
        parts: string[],
        callToAction: {
          part1: string,
          here: string,
          part2: string,
          contactMe: string,
          period: string
        }
      },
      myWork: {
        title: string,
        parts: string[],
        final: string,
        here: string,
        period: string
      },

    }
    cells: {
      treeCell: string,
      hedgeCell: string,
      resumeCell: string
    }
  }
}