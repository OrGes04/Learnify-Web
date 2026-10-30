import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <section className="notfound">
            <h1>404</h1>
            <p>Sorry, we couldn't find that page.</p>
            <Link to="/" className="registerbut">Back home</Link>
        </section>
    );
}

export default NotFound;
