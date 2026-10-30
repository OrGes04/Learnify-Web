import { useState } from 'react';
import Field from '../components/Field.jsx';
import { isEmail, isPhone, validate } from '../data/validation.js';

const empty = { name: '', email: '', phone: '', message: '' };

const rules = {
    name: (value) => (value.trim().length < 2 ? 'Please enter your name.' : ''),
    email: (value) => (!isEmail(value) ? 'Please enter a valid email address.' : ''),
    phone: (value) => (value.trim() && !isPhone(value) ? 'Please enter a valid phone number.' : ''),
    message: (value) => (value.trim().length < 10 ? 'Your message should be at least 10 characters.' : ''),
};

function Contact() {
    const [values, setValues] = useState(empty);
    const [errors, setErrors] = useState({});
    const [sentTo, setSentTo] = useState('');

    const onChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
        if (errors[name]) setErrors({ ...errors, [name]: rules[name](value) });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const found = validate(values, rules);
        setErrors(found);
        if (Object.keys(found).length) {
            event.target.querySelector(`[name="${Object.keys(found)[0]}"]`).focus();
            return;
        }
        setSentTo(values.name.trim());
        setValues(empty);
    };

    return (
        <>
            <section className="contactsec" id="conpage">
                <div className="contactitle">
                    <div className="context">
                        <h1>We’re Just a <br /><span>Click</span> Away!</h1>
                        <p>
                            Have questions or need assistance? We're here to help! Whether you're looking for more
                            information about our services, have specific inquiries, or just want to connect, feel free
                            to reach out.
                        </p>
                    </div>
                    <div className="consocials">
                        <div className="conicons">
                            <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
                            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                            <a href="#" aria-label="X (Twitter)"><i className="fab fa-twitter"></i></a>
                            <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
                        </div>
                    </div>
                </div>
                <div className="contactmain">
                    {sentTo ? (
                        <div className="formdone" role="status">
                            <i className="fa-solid fa-circle-check"></i>
                            <h2>Thanks, {sentTo}!</h2>
                            <p>We got your message and will get back to you soon.</p>
                            <button className="readbut" type="button" onClick={() => setSentTo('')}>Send another</button>
                        </div>
                    ) : (
                        <form onSubmit={onSubmit} onReset={() => { setValues(empty); setErrors({}); }} noValidate>
                            <Field id="name" label="Name" placeholder="Your Name" value={values.name} onChange={onChange} error={errors.name} autoComplete="name" />
                            <Field id="email" label="Your Email" type="email" placeholder="Your Email" value={values.email} onChange={onChange} error={errors.email} autoComplete="email" />
                            <Field id="phone" label="Phone Number (optional)" type="tel" placeholder="Your Phone Number" value={values.phone} onChange={onChange} error={errors.phone} autoComplete="tel" />
                            <Field id="message" label="Message" as="textarea" placeholder="Message Us" value={values.message} onChange={onChange} error={errors.message} />
                            <div className="conbuttons">
                                <button className="readbut" id="conbut" type="submit">Submit</button>
                                <button className="registerbut" id="resetbut" type="reset">Reset</button>
                            </div>
                        </form>
                    )}
                </div>
            </section>
            <div className="harta">
                <iframe
                    title="Learnify location in Pristina"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46940.21160857412!2d21.117442215851028!3d42.66637268755855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13549ee605110927%3A0x9365bfdf385eb95a!2sPristina!5e0!3m2!1sen!2s!4v1733170070500!5m2!1sen!2s"
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </>
    );
}

export default Contact;
