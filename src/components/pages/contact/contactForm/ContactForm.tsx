import * as React from 'react';
import './ContactForm.css';
import { Comment } from '../../../../types/comment';
import WorkingOverlay from '../../../shared/workingOverlay/WorkingOverlay';

interface ContactFormProps {
  submit: (comment: Comment) => Promise<boolean>
}
/**
 * 
 * @param {} props
 * @returns {JSX.Element | null}
 */
function ContactForm(props: ContactFormProps): JSX.Element | null {

  const [comment, setComment] = React.useState<Comment>({ site: 'birkheadc.me', name: '', body: ''});
  const [status, setStatus] = React.useState<string>('init');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newComment = {...comment};
    newComment[event.currentTarget.name] = event.currentTarget.value;
    setComment(newComment);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('working');
    const didPost = await props.submit(comment);
    if (didPost === true) setStatus('success');
    else setStatus('fail');
  }

  return (
    <div className='contact-form-wrapper'>
      <WorkingOverlay isVisible={status === 'working'} />
      { status === 'fail' && <span className='error center full-width'>Sorry, something went wrong :(</span> }
      { status === 'success' && <span className='accent center full-width'>Thanks for your feedback :)</span> }
      <form className={'contact-form' + ((status === 'working' || status === 'success') ? ' fade': '')} onSubmit={handleSubmit}>
        <div className='inline-label-input-wrapper'>
          <label htmlFor='contact-name'>Name</label>
          <input name='name' id='contact-name' type='text' onChange={handleChange} value={comment.name}></input>
        </div>
        <div className='inline-label-input-wrapper'>
          <label htmlFor='contact-body'>Comment</label>
          <textarea name='body' id='contact-body' rows={4} onChange={handleChange} value={comment.body} ></textarea>
        </div>
        <div>
          <button disabled={status === 'working'} type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;