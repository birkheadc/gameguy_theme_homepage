import * as React from 'react';
import './AboutMyWork.css'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface IAboutMyWorkProps {

}

/**
*
* @returns {JSX.Element | null}
*/
export default function AboutMyWork(props: IAboutMyWorkProps): JSX.Element | null {

  const { t } = useTranslation();

  return (
    <div className='about-my-work-wrapper'>
      <div className="about-block-wrapper">
        {(t('aboutPage.myWork.parts', { returnObjects: true }) as Array<string>).map(
            part =>
            <p key={part}>{part}</p>
          )}
        <p>{t('aboutPage.myWork.final')} <Link to={'/projects'}>{t('aboutPage.myWork.here')}</Link>{t('aboutPage.myWork.period')}</p>
      </div>
    </div>
  );
}