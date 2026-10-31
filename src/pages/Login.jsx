import { useState } from 'react';
import { Link } from 'react-router-dom';
import Field from '../components/Field.jsx';
import { isEmail, validate } from '../data/validation.js';

const rules = {
    email: (value) => (!isEmail(value) ? 'Please enter a valid email address.' : ''),
    password: (value) => (value.length < 6 ? 'Your password should be at least 6 characters.' : ''),
};

function Login() {
    const [values, setValues] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [done, setDone] = useState(false);

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
        setDone(true);
    };

    return (
        <div className="loginmain">
            <div className="loginfoto">
                <img src="/LogIn-SignUp/Login bck 5.webp" alt="" />
            </div>
            <div className="loginsec">
                <div className="logintext">
                    <h1>Welcome Back</h1>
                    <p>Welcome back! Please enter your credentials to log in.</p>
                </div>
                <div className="login">
                    {done ? (
                        <div className="formdone" role="status">
                            <i className="fa-solid fa-circle-check"></i>
                            <h2>You're logged in</h2>
                            <p>Pick up where you left off.</p>
                            <Link to="/courses" className="readbut">Browse courses</Link>
                        </div>
                    ) : (
                        <form onSubmit={onSubmit} noValidate>
                            <Field id="email" label="Email" type="email" placeholder="Your Email" value={values.email} onChange={onChange} error={errors.email} autoComplete="email" />
                            <Field id="password" label="Password" type="password" placeholder="Your Password" value={values.password} onChange={onChange} error={errors.password} autoComplete="current-password" />
                            <div className="logincheck">
                                <div className="check">
                                    <input type="checkbox" id="checkbox" name="remember" />
                                    <label id="checklabel" htmlFor="checkbox">Remember Me</label>
                                </div>
                                <a href="#">Forgot Password?</a>
                            </div>
                            <div className="logbuttons">
                                <button className="readbut" type="submit">Login</button>
                                <div className="orline">
                                    <div className="logline"></div>
                                    <p>or</p>
                                    <div className="logline"></div>
                                </div>
                                <button className="registerbut" id="gmailbut" type="button">
                                    <img src="/LogIn-SignUp/Google logo.webp" alt="" /> Login with Google
                                </button>
                            </div>
                        </form>
                    )}
                    <div className="loglast">
                        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
