import * as React from 'react';
import './ContactForm.css';

interface ContactFormProps {

}
/**
 * 
 * @param {} props
 * @returns {JSX.Element | null}
 */
function ContactForm(props: ContactFormProps): JSX.Element | null {

  const [formData, setFormData] = React.useState<{ name: string, body: string}>({ name: '', body: ''});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Todo
  }

  return (
    <form className='contact-form-wrapper' onSubmit={handleSubmit}>
      <div className='inline-label-input-wrapper'>
        <label htmlFor='contact-name'>Name</label>
        <input id='contact-name' type='text'></input>
      </div>
      <div className='inline-label-input-wrapper'>
        <label htmlFor='contact-body'>Comment</label>
        <textarea id='contact-body' rows={4} ></textarea>
      </div>
      <div>
        <button type='submit'>Submit</button>
      </div>
    </form>
  );
}

export default ContactForm;