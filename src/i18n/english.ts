import ITranslation from "./interface";

export const english: ITranslation = {
  translation: {
    submit: "submit",
    start: "start",
    yes: "yes",
    no: "no",
    projectsPage: {
      moreInfo: "more info",
      visitSite: "visit site",
      viewSource: "view source",
    },
    welcomePage: {
      parts: [
        "Hello there! Welcome to the world of CODéMON! My name is",
        "People call me the CODéMON PROF!*",
        "VISITOR! Your very own CODéMON legend is about to unfold! A world of dreams and adventures with CODéMON awaits! Let's go!",
      ],
      footnote: "No one actually calls me the Codemon Prof, or the anything Prof for that matter."
    },
    contactPage: {
      parts: [
        "If you'd like to get in touch, feel free to contact me!",
        "Write me an email:",
        "Connect with me on social media:",
        "Or just leave a quick comment with the form below. I enjoy the comments, especially when they're kind.",
      ],
      formName: "Name",
      formComment: "Comment",
      formError: "Sorry, something went wrong :(",
      formSuccess: "Thanks for your feedback :)",
    },
    cells: {
      treeCell: "Just an ordinary bush. Useful for keeping nosy adventurers on the right path.",
      hedgeCell: "Some hedges planted outside a building. Looks awfully like an ordinary bush.",
      resumeCell: "It's a copy of Colby's resume. Take a look?"
    },
    aboutPage: {
      thisSite: {
        title: "this site",
        main: {
          parts: [
            "This is the personal website of the author, Colby Birkhead. Yes, that's me!",
            "Its main purpose is to host the portfolio of my projects, but the site is also a project in and of itself.",
            "It was built mostly with React, but also communicates with some APIs to provide dynamic content.",
            "You can check out the source code",
            "if you're interested.",
            "There were three main features I wanted to build when creating this site."
          ],
          here: "here"
        },
        colorScheme: {
          title: "color schemes",
          parts: [
            "Those in the audience who grew up with a certain handheld gaming device might recognize the selection of color schemes available on this site.",
            "The new, color version of the device was backwards compatible with the 4-tone greyscale version that came before it.",
            "There was no data in the older games that would allow the newer version to colorize the older sprites, but you could select a color theme that would replace the old shading with a new palette.",
            "Some of those palettes could be quite offensive on the eyes, too. So if you don't appreciate the themes, it's not my fault. Blame Nint— I mean, blame the company that shall not be named here."
          ]
        },
        ditheringEffect: {
          title: "dithering effect",
          parts: [
            "Another feature — of the same device — that I wanted to implement, was image dithering.",
            "Image dithering is when, while constrained to a limited pallete of colors, the illusion of another color or shade can be created, by staggering pixels of different colors next to each other, in various patterns.",
            "It's similar to dot-drawing, where you can create all shades of grey, with nothing but black dots. Lots of black dots bunched together form a dark area, while spacing them out further apart makes a lighter color.",
            "Sprites in early games used this effect to create the illusion of shading, even when the hardware was limited to as few as 4 tones.",
            "Throughout this site, all the images go through a preprocessing algorithm that first blurs them slightly, and flattens them into greyscale:",
            "Then bands the image into distinct shades:",
            "Then bands the image into distinct shades:",
            "And finally 'dithers' regions that were close to the edge of their band — the areas of the image that were close to being another shade, if they had been just slightly lighter or darker — with a simple checkerboard pattern:",
            "(Some of the steps of the algorithm actually happen simultaneously for performance's sake, but this is the main idea.)",
            "This mimics the sprites of early video games quite nicely, if I do say so myself.",
            "The best part is, the algorithm runs in real time, so even images pulled from outside APIs (like on my Projects page) are converted on-the-fly."
          ]
        },
        navigationGame: {
          title: "navigation game",
          parts: [
            "I've been interested in new takes on site navigation for a while now.",
            "Of course, if you're designing a website for a business or organization, you want your navigation to be unobtrusive and easy to use. You probably don't even want your user to notice the nav at all.",
            "Which is unfortunate, because there's also a lot room for artistic expression in how you implement site navigation!",
            "When I decided on a retro game theme for the website, I originally thought about having a 2d character sprite moving between links on a standard navbar.",
            "But eventually I settled on the current nav, having the user navigate a small world to actually move between pages.",
            "I essentially had to write a small (and bad) game engine to get it working how I liked it.",
            "It was especially difficult to work in mobile support, which required me to implement click-to-move, which in turn required some kind of pathfinding algorithm. Talk about feature creep!",
            "In the end, however, I'm quite pleased with how it turned out. At least from a technical standpoint. My pixel art and animations can still use some improvement."
          ]
        }
      },
      me: {
        title: "me",
        parts: [
          "My name is Colby Birkhead. I'm an American expat.",
          "I like working with computers, games of all kinds, and reading.",
          "After high school, I somehow encountered Japanese culture, and became enthralled by it. This lead to studying the language, and eventually applying for and earning a scholarship to live and study in Nagoya, Japan for five years.",
          "I met my wife there, and after graduating with a Bachelor of Arts in Linguistics, I moved to South Korea, where we opened a small business and started a family together.",
          "In my free time, I've gotten back into coding. Now I'm looking to sell the business and move into software development full-time."
        ],
        callToAction: {
          part1: "So if you like what you see, check out my resume",
          here: "here",
          part2: ", or",
          contactMe: "contact me",
          period: "."
        }
      },
      myWork: {
        title: "my work",
        parts: [
          "Most of my life, I've been drawn by programming and programming-adjacent activities.",
          "I tinkered with BASIC on my VTech laptop when I was a kid, and spent more time in map and campaign editors than actually playing games growing up.",
          "I studied PERL, Python, and web technologies (HTML, CSS, JavaScript, PHP) in high school.",
          "After university, I tried out Unreal Engine, then Unity in my free time. Unity lead me to writing C#, which rekindled my joy for programming.",
          "Now, my focus is mainly on web applications, with the occasional vacation in game development. I've also created a few applications to help run my business.",
        ],
        final: "You can check out some of my proudest work",
        here: "here",
        period: "."
      }
    }
  }
}