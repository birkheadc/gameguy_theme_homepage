import * as React from 'react';
import './AboutMe.css'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

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
        <p>{t('aboutPage.me.callToAction.part1')} <a href={process.env.RESUME_URL} target='_blank' rel='noreferrer'>{t('aboutPage.me.callToAction.here')}</a>{t('aboutPage.me.callToAction.part2')} <Link to={'/contact'}>{t('aboutPage.me.callToAction.contactMe')}</Link>{t('aboutPage.me.callToAction.period')}</p>
      </div>
    </div>
  );
}