import * as React from 'react';
import './AboutSite.css'
import CollapsibleImplementation from '../../../shared/collapsibleImplementation/CollapsibleImplementation';
import ProcessedImage from '../../../shared/processedImage/ProcessedImage';
import { ImageProcessShaderMode } from '../../../../types/imageProcessShaderMode';
import { ImageProcessShaderEffect } from '../../../../types/imageProcessShaderEffect';

interface IAboutSiteProps {
  image: HTMLImageElement
}

/**
*
* @returns {JSX.Element | null}
*/
export default function AboutSite(props: IAboutSiteProps): JSX.Element | null {
  return (
    <div className='about-site-wrapper'>
      <div className="about-block-wrapper">
        <p>This is the personal website of the author, Colby Birkhead. Yes, that's me!</p>
        <p>Its main purpose is to host the portfolio of my projects, but the site is also a project in and of itself.</p>
        <p>It was built mostly with React, but also communicates with some APIs to provide dynamic content.</p>
        <p>You can check out the source code <a href='https://github.com/birkheadc/gameguy_theme_homepage' target='_blank' rel='noreferrer'>here</a> if you're interested.</p>
      </div>
      <div className='about-site-features-wrapper'>
        <h2>There were three main features I wanted to build when creating this site.</h2>
        <CollapsibleImplementation collapseOnOpenOther={true} triggerClassName={'about-site-collapsible-trigger'} triggerTitle={'Color schemes'} id={'gameboy-color-schemes'}>
          <div className='about-block-wrapper' id='gameboy-color-schemes'>
            <p>Those in the audience who grew up with a certain handheld gaming device might recognize the selection of color schemes available on this site.</p>
            <p>The new, color version of the device was backwards compatible with the 4-tone greyscale version that came before it.</p>
            <p>There was no data in the older games that would allow the newer version to colorize the older sprites, but you could select a color theme that would replace the old shading with a new palette.</p>
            <p>Some of those palettes could be quite offensive on the eyes, too. So if you don't appreciate the themes, it's not my fault. Blame Nint— I mean, blame the company that shall not be named here.</p>
          </div>
        </CollapsibleImplementation>
        <CollapsibleImplementation collapseOnOpenOther={true} triggerClassName={'about-site-collapsible-trigger'} triggerTitle={'Dithering effect'} id={'dither-effect'}>
          <div className="about-block-wrapper" id='dither-effect'>
            <p>Another feature — of the same device — that I wanted to implement, was image dithering.</p>
            <p>Image dithering is when, while constrained to a limited pallete of colors, the illusion of another color or shade can be created, by staggering pixels of different colors next to each other, in various patterns.</p>
            <p>It's similar to dot-drawing, where you can create all shades of grey, with nothing but black dots. Lots of black dots bunched together form a dark area, while spacing them out further apart makes a lighter color.</p>
            <p>Sprites in early games used this effect to create the illusion of shading, even when the hardware was limited to as few as 4 tones.</p>
            <p>Throughout this site, all the images go through a preprocessing algorithm that first blurs them slightly, and flattens them into greyscale:</p>
            <ProcessedImage className={'dither-explanation-image'} imageSrc={props.image} shaderMode={ImageProcessShaderMode.NORMAL} effect={ImageProcessShaderEffect.GREYSCALE} pixelateLevel={DITHER_EXPLANATION_IMAGE_PIXELATE_LEVEL} />
            <p>Then bands the image into distinct shades:</p>
            <ProcessedImage className={'dither-explanation-image'} imageSrc={props.image} shaderMode={ImageProcessShaderMode.NORMAL} effect={ImageProcessShaderEffect.BAND} pixelateLevel={DITHER_EXPLANATION_IMAGE_PIXELATE_LEVEL} />
            <p>Then shades each band to match the current theme:</p>
            <ProcessedImage className={'dither-explanation-image'} imageSrc={props.image} shaderMode={ImageProcessShaderMode.NORMAL} effect={ImageProcessShaderEffect.SHADE} pixelateLevel={DITHER_EXPLANATION_IMAGE_PIXELATE_LEVEL} />
            <p>And finally 'dithers' regions that were close to the edge of their band — the areas of the image that were close to being another shade, if they had been just slightly lighter or darker — with a simple checkerboard pattern:</p>
            <ProcessedImage className={'dither-explanation-image'} imageSrc={props.image} shaderMode={ImageProcessShaderMode.NORMAL} effect={ImageProcessShaderEffect.DITHER} pixelateLevel={DITHER_EXPLANATION_IMAGE_PIXELATE_LEVEL} />
            <p>(Some of the steps of the algorithm actually happen simultaneously for performance's sake, but this is the main idea.)</p>
            <p>This mimics the sprites of early video games quite nicely, if I do say so myself.</p>
            <p>The best part is, the algorithm runs in real time, so even images pulled from outside APIs (like on my Projects page) are converted on-the-fly.</p>
          </div>
        </CollapsibleImplementation>
        <CollapsibleImplementation collapseOnOpenOther={true} triggerClassName={'about-site-collapsible-trigger'} triggerTitle={'Navigation game'} id={'gameboy-style-navigation'}>
          <div className="about-block-wrapper" id='gameboy-style-navigation'>
            <p>I've been interested in new takes on site navigation for a while now.</p>
            <p>Of course, if you're designing a website for a business or organization, you want your navigation to be unobtrusive and easy to use. You probably don't even want your user to notice the nav at all.</p>
            <p>Which is unfortunate, because there's also a lot room for artistic expression in how you implement site navigation!</p>
            <p>When I decided on a retro game theme for the website, I originally thought about having a 2d character sprite moving between links on a standard navbar.</p>
            <p>But eventually I settled on the current nav, having the user navigate a small world to actually move between pages.</p>
            <p>I essentially had to write a small (and bad) game engine to get it working how I liked it.</p>
            <p>It was especially difficult to work in mobile support, which required me to implement click-to-move, which in turn required some kind of pathfinding algorithm. Talk about feature creep!</p>
            <p>In the end, however, I'm quite pleased with how it turned out. At least from a technical standpoint. My pixel art and animations can still use some improvement.</p>
          </div>
        </CollapsibleImplementation>
      </div>
    </div>
  );
}

// Helpers

const DITHER_EXPLANATION_IMAGE_PIXELATE_LEVEL = 1.5;