import { useId, useState } from 'react';
import { isEmail } from '../data/validation.js';

function NewsletterForm() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [sent, setSent] = useState(false);
    const id = useId();

    const onSubmit = (event) => {
        event.preventDefault();
        if (!isEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        setError('');
        setSent(true);
    };

    if (sent) {
        return (
            <p className="formsuccess" role="status">
                <i className="fa-solid fa-circle-check"></i> Thanks! We'll keep {email} posted.
            </p>
        );
    }

    return (
        <div className="ademail">
            <form onSubmit={onSubmit} noValidate>
                <input
                    type="email"
                    placeholder="Send your email"
                    aria-label="Email address"
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? `${id}-error` : undefined}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <button className="readbut" id="adbut" type="submit">Send</button>
            </form>
            {error && <p className="formerror" id={`${id}-error`}>{error}</p>}
        </div>
    );
}

export default NewsletterForm;
