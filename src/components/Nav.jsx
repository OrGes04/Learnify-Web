import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { categories } from '../data/categories.js';
import { categorySlug } from '../data/helpers.js';

const links = [
    { to: '/', label: 'Home' },
    { to: '/courses', label: 'Courses' },
    { to: '/about', label: 'About' },
    { to: '/resources', label: 'Resources' },
    { to: '/contact', label: 'Contact' },
];

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function Logo({ white }) {
    return (
        <Link to="/" className="navlogo">
            <img src={white ? '/Logo/Learnify White LG.svg' : '/Logo/Learnify Blue LG.svg'} alt="" />
            <span>Learnify</span>
        </Link>
    );
}

function Nav() {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const menuRef = useRef(null);
    const toggleRef = useRef(null);
    const closeRef = useRef(null);
    const { pathname } = useLocation();

    const openMenu = () => {
        setIsVisible(true);
        setIsOpen(true);
    };

    const closeMenu = (returnFocus = true) => {
        setIsOpen(false);
        if (returnFocus) toggleRef.current?.focus();
    };

    useEffect(() => {
        const menu = menuRef.current;
        if (!menu || !isVisible) return;

        if (isOpen) {
            document.documentElement.classList.add('menu-locked');
            closeRef.current?.focus();
            if (reduceMotion()) return;

            menu.animate(
                [{ clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)' }],
                { duration: 550, easing: 'cubic-bezier(0.65, 0, 0.35, 1)' }
            );
            menu.querySelectorAll('.menulinks li, .menubuttons').forEach((item, i) => {
                item.animate(
                    [{ opacity: 0, transform: 'translateY(40px)' }, { opacity: 1, transform: 'translateY(0)' }],
                    { duration: 600, delay: 250 + i * 70, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'backwards' }
                );
            });
            return;
        }

        document.documentElement.classList.remove('menu-locked');
        if (reduceMotion()) {
            setIsVisible(false);
            return;
        }
        const animation = menu.animate(
            [{ clipPath: 'inset(0 0 0% 0)' }, { clipPath: 'inset(0 0 100% 0)' }],
            { duration: 400, easing: 'cubic-bezier(0.65, 0, 0.35, 1)' }
        );
        animation.onfinish = () => setIsVisible(false);
    }, [isOpen, isVisible]);

    useEffect(() => {
        if (!isOpen) return;

        const onKeyDown = (event) => {
            if (event.key === 'Escape') closeMenu();

            if (event.key === 'Tab') {
                const focusable = menuRef.current.querySelectorAll('a, button');
                const first = focusable[0];
                const last = focusable[focusable.length - 1];

                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault();
                    first.focus();
                }
            }
        };
        const onResize = () => {
            if (window.innerWidth > 1023) closeMenu(false);
        };

        document.addEventListener('keydown', onKeyDown);
        window.addEventListener('resize', onResize);
        return () => {
            document.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('resize', onResize);
        };
    }, [isOpen]);

    useEffect(() => {
        return () => document.documentElement.classList.remove('menu-locked');
    }, []);

    return (
        <>
            <nav>
                <Logo />
                <button
                    ref={toggleRef}
                    className="menu-toggle"
                    type="button"
                    aria-label="Open menu"
                    aria-expanded={isOpen}
                    aria-controls="mobilemenu"
                    onClick={openMenu}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <div className="navright">
                    <ul>
                        {links.map((link, i) => (
                            <li key={link.to} className={link.to === '/courses' ? 'navdrop' : undefined}>
                                <NavLink to={link.to} end={link.to === '/'}>
                                    {link.label}
                                    {link.to === '/courses' && <i className="fa-solid fa-chevron-down"></i>}
                                </NavLink>
                                {link.to === '/courses' && (
                                    <div className="dropmenu">
                                        {categories.map((category) => (
                                            <Link key={category.name} to={`/courses#${categorySlug(category.name)}`}>
                                                <i className={category.icon}></i>
                                                {category.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                                {i < links.length - 1 && <div className="divide"></div>}
                            </li>
                        ))}
                    </ul>
                    <div className="navbut">
                        <Link to="/login">Log In</Link>
                        <Link to="/signup" className="navsignup">Sign Up</Link>
                    </div>
                </div>
            </nav>

            <div
                ref={menuRef}
                id="mobilemenu"
                className={`mobilemenu${isVisible ? ' open' : ''}`}
                role="dialog"
                aria-modal="true"
                aria-label="Menu"
            >
                <div className="menutop">
                    <Logo white />
                    <button ref={closeRef} className="menuclose" type="button" aria-label="Close menu" onClick={() => closeMenu()}>
                        <span></span>
                        <span></span>
                    </button>
                </div>
                <ul className="menulinks">
                    {links.map((link, i) => (
                        <li key={link.to}>
                            <Link
                                to={link.to}
                                className={pathname === link.to ? 'current' : undefined}
                                onClick={() => closeMenu(false)}
                            >
                                <small>0{i + 1}</small>
                                {link.label}
                                <i className="fa-solid fa-arrow-right"></i>
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="menubuttons">
                    <Link to="/login" className="menulogin" onClick={() => closeMenu(false)}>Log In</Link>
                    <Link to="/signup" className="menusignup" onClick={() => closeMenu(false)}>Sign Up</Link>
                </div>
            </div>
        </>
    );
}

export default Nav;
