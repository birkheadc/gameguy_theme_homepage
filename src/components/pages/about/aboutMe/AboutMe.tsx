import * as React from 'react';
import './AboutMe.css'
import { useTranslation } from 'react-i18next';

interface IAboutMeProps {

}

/**
*
* @returns {JSX.Element | null}
*/
export default function AboutMe(props: IAboutMeProps): JSX.Element | null {

  const { t } = useTranslation();

  return (
    <div className='about-me-wrapper'>
      <div className="about-block-wrapper">
        {(t('aboutPage.me.parts', { returnObjects: true }) as Array<string>).map(
          part =>
          <p key={part}>{part}</p>
        )}
      </div>
    </div>
  );
}