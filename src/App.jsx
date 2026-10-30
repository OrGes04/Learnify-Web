import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import BackToTop from './components/BackToTop.jsx';
import Home from './pages/Home.jsx';
import Courses from './pages/Courses.jsx';
import CourseDetail from './pages/CourseDetail.jsx';
import About from './pages/About.jsx';
import Resources from './pages/Resources.jsx';
import Contact from './pages/Contact.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import NotFound from './pages/NotFound.jsx';

const titles = {
    '/': 'Learnify Academy',
    '/courses': 'Courses | Learnify Academy',
    '/about': 'About | Learnify Academy',
    '/resources': 'Resources | Learnify Academy',
    '/contact': 'Contact | Learnify Academy',
    '/login': 'Log In | Learnify Academy',
    '/signup': 'Sign Up | Learnify Academy',
};

function App() {
    const { pathname, hash } = useLocation();
    const isHome = pathname === '/';

    useEffect(() => {
        if (hash) {
            document.querySelector(hash)?.scrollIntoView({ behavior: 'instant' });
        } else {
            window.scrollTo({ top: 0, behavior: 'instant' });
        }
        if (titles[pathname]) document.title = titles[pathname];
    }, [pathname, hash]);

    return (
        <>
            <a href="#main" className="skiplink">Skip to content</a>
            <Nav />
            <main id="main" className={isHome ? '' : 'subpage'}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/courses/:slug" element={<CourseDetail />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/resources" element={<Resources />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            <Footer />
            <BackToTop />
        </>
    );
}

export default App;
