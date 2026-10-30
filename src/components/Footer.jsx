import { Link } from 'react-router-dom';

const socials = [
    { label: 'Facebook', icon: 'fab fa-facebook' },
    { label: 'Instagram', icon: 'fab fa-instagram' },
    { label: 'X (Twitter)', icon: 'fab fa-twitter' },
    { label: 'YouTube', icon: 'fab fa-youtube' },
];

function Footer() {
    return (
        <footer>
            <div className="footup">
                <Link to="/" className="footlogo">
                    <img src="/Logo/Learnify White LG.svg" alt="" />
                    <span>Learnify</span>
                </Link>
                <div className="footcol">
                    <h2>Links</h2>
                    <hr className="listhr" />
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/courses">Courses</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/resources">Resources</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>
                <div className="footcol">
                    <h2>Terms & Conditions</h2>
                    <hr className="listhr" />
                    <ul>
                        <li><a href="#">Terms & Conditions</a></li>
                        <li><a href="#">Cookie Policy</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Pricing</a></li>
                    </ul>
                </div>
                <div className="footlast">
                    <h2>Follow Us</h2>
                    <hr className="listhr" />
                    <div className="socials">
                        {socials.map((social) => (
                            <a key={social.label} href="#" aria-label={social.label}>
                                <i className={social.icon}></i>
                            </a>
                        ))}
                    </div>
                    <Link to="/contact" className="footcontact">
                        <i className="fa-regular fa-envelope"></i> Get in touch
                    </Link>
                </div>
            </div>
            <hr className="mainfoothr" />
            <div className="footdown">
                <p>© 2024 Learnify. All Rights Reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
