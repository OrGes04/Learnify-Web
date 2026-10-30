import { useState } from 'react';
import { Link } from 'react-router-dom';
import Field from '../components/Field.jsx';
import { isEmail, validate } from '../data/validation.js';

const rules = {
    name: (value) => (value.trim().length < 2 ? 'Please enter your name.' : ''),
    email: (value) => (!isEmail(value) ? 'Please enter a valid email address.' : ''),
    password: (value) =>
        value.length < 8 || !/[0-9]/.test(value) ? 'Use at least 8 characters, including a number.' : '',
    terms: (value) => (!value ? 'Please accept the Terms and Conditions.' : ''),
};

function SignUp() {
    const [values, setValues] = useState({ name: '', email: '', password: '', terms: false });
    const [errors, setErrors] = useState({});
    const [done, setDone] = useState('');

    const onChange = (event) => {
        const { name, value, type, checked } = event.target;
        const next = type === 'checkbox' ? checked : value;
        setValues({ ...values, [name]: next });
        if (errors[name]) setErrors({ ...errors, [name]: rules[name](next) });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const found = validate(values, rules);
        setErrors(found);
        if (Object.keys(found).length) {
            event.target.querySelector(`[name="${Object.keys(found)[0]}"]`).focus();
            return;
        }
        setDone(values.name.trim());
    };

    return (
        <div className="loginmain">
            <div className="loginfoto">
                <img src="/LogIn-SignUp/Login bck 3.jpg" alt="" />
            </div>
            <div className="loginsec">
                <div className="logintext">
                    <h1>Get Started</h1>
                    <p>Join now to access courses that help you succeed.</p>
                </div>
                <div className="login">
                    {done ? (
                        <div className="formdone" role="status">
                            <i className="fa-solid fa-circle-check"></i>
                            <h2>Welcome to Learnify, {done}!</h2>
                            <p>Your account is ready. Find your first course.</p>
                            <Link to="/courses" className="readbut">Browse courses</Link>
                        </div>
                    ) : (
                        <form onSubmit={onSubmit} noValidate>
                            <Field id="name" label="Name" placeholder="Your Name" value={values.name} onChange={onChange} error={errors.name} autoComplete="name" />
                            <Field id="email" label="Email" type="email" placeholder="Your Email" value={values.email} onChange={onChange} error={errors.email} autoComplete="email" />
                            <Field id="password" label="Password" type="password" placeholder="Your Password" value={values.password} onChange={onChange} error={errors.password} autoComplete="new-password" />
                            <div className="logincheck">
                                <div className="check">
                                    <input
                                        type="checkbox"
                                        id="checkbox"
                                        name="terms"
                                        checked={values.terms}
                                        onChange={onChange}
                                        aria-invalid={Boolean(errors.terms)}
                                        aria-describedby={errors.terms ? 'terms-error' : undefined}
                                    />
                                    <label id="checklabel" htmlFor="checkbox">I agree to the <a href="#">Terms and Conditions</a></label>
                                </div>
                            </div>
                            {errors.terms && <p className="formerror" id="terms-error">{errors.terms}</p>}
                            <div className="logbuttons">
                                <button className="readbut" type="submit">Create Account</button>
                                <div className="orline">
                                    <div className="logline"></div>
                                    <p>or</p>
                                    <div className="logline"></div>
                                </div>
                                <div className="socialbut">
                                    <button className="registerbut" id="gmailbut" type="button">
                                        <img src="/LogIn-SignUp/Google logo.png" alt="" /> Sign Up with Google
                                    </button>
                                    <button className="registerbut" id="gmailbut" type="button">
                                        <img src="/LogIn-SignUp/Facebook logo.png" alt="" /> Sign Up with Facebook
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}
                    <div className="loglast">
                        <p>Already have an account? <Link to="/login">Log in</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
