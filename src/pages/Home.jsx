import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CourseCard from '../components/CourseCard.jsx';
import Stars from '../components/Stars.jsx';
import NewsletterForm from '../components/NewsletterForm.jsx';
import useReveal from '../hooks/useReveal.js';
import { courses } from '../data/courses.js';
import { categories } from '../data/categories.js';
import { testimonials } from '../data/testimonials.js';
import { partners } from '../data/partners.js';
import { categorySlug, coursesIn, popularCourses } from '../data/helpers.js';

const filters = ['Popular', 'Latest', 'Web Development', 'Graphic Design', 'UI/UX'];

function filterCourses(filter) {
    if (filter === 'Popular') return popularCourses().slice(0, 4);
    if (filter === 'Latest') return courses.filter((course) => course.latest).slice(0, 4);
    return coursesIn(filter).slice(0, 4);
}

function Home() {
    const [filter, setFilter] = useState('Popular');
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    useReveal();

    const onSearch = (event) => {
        event.preventDefault();
        const value = query.trim();
        navigate(value ? `/courses?q=${encodeURIComponent(value)}` : '/courses');
    };

    return (
        <>
            <section className="herosec" id="home">
                <div className="heroleft">
                    <div className="herotext">
                        <h1>Transform the Way <br />You <span>Learn!</span></h1>
                        <p>Discover engaging, interactive, and comprehensive courses that fit your pace and schedule.</p>
                        <div className="heroactions">
                            <div className="herobuttons">
                                <Link to="/signup" className="registerbut">Register</Link>
                                <Link to="/about" className="readbut">Read More</Link>
                            </div>
                            <form className="herosearch" role="search" onSubmit={onSearch}>
                                <input
                                    type="search"
                                    placeholder="Search for anything"
                                    aria-label="Search courses"
                                    value={query}
                                    onChange={(event) => setQuery(event.target.value)}
                                />
                                <button type="submit" aria-label="Search">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="ratestat">
                        <div className="herorate">
                            <div className="heropfp">
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                                    <img key={n} src={`/FOTO/Hero Profile ${n}.jpg`} alt="" />
                                ))}
                            </div>
                            <div className="pfptxt">
                                <h2>And 50,000+ More</h2>
                            </div>
                        </div>
                        <div className="statboxtab">
                            <div className="statbox">
                                <i className="fa-solid fa-book-open" aria-hidden="true"></i>
                                <h2><span className="statone">500+</span> Courses</h2>
                            </div>
                            <div className="statboxdy">
                                <i className="fa-solid fa-clock" aria-hidden="true"></i>
                                <h2><span className="statwo">24/7</span> Access</h2>
                            </div>
                            <div className="statbox">
                                <i className="fa-solid fa-briefcase" aria-hidden="true"></i>
                                <h2><span className="statone">85%</span> Job Rate</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="heromainfoto">
                    <img src="/FOTO/Hero 3.jpg" alt="Student learning web development at his desk" />
                </div>
                <img src="/Star Icons/Star Green.svg" alt="" className="herostargreen" />
            </section>

            <section className="partnersec reveal">
                <div className="partnerhead">
                    <h2>Our Partners</h2>
                </div>
                <div className="partnerlogo">
                    {partners.map((partner, i) => (
                        <div className="partneritem" key={partner.name}>
                            <img src={partner.img} alt={partner.name} />
                            {i < partners.length - 1 && <div className="divide"></div>}
                        </div>
                    ))}
                </div>
            </section>

            <section className="categorysec">
                <div className="cattext reveal">
                    <h2>Explore <br />Our Categories</h2>
                    <p>Discover key categories designed to boost your skills and fuel your growth—start learning today!</p>
                    <div className="herobuttons">
                        <Link to="/signup" className="registerbut">Register</Link>
                        <Link to="/courses" className="readbut">Read More</Link>
                    </div>
                </div>
                <div className="catgrid">
                    {[categories.slice(0, 1), categories.slice(1)].map((group, i) => (
                        <div className={i === 0 ? 'tabtop' : 'tabbottom'} key={i}>
                            {group.map((category) => (
                                <Link to={`/courses#${categorySlug(category.name)}`} className="cattab reveal" key={category.name}>
                                    <div className="tabicon">
                                        <i className={category.icon}></i>
                                    </div>
                                    <h3>{category.name}</h3>
                                    <p>{category.text}</p>
                                    <div className="catarrow">
                                        <img src="/Icons/arrow-down-right.svg" alt="" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ))}
                </div>
                <img src="/FOTO/Bck-symbol.png" alt="" className="catbck" />
                <lord-icon
                    className="eyeicon"
                    src="https://cdn.lordicon.com/dicvhxpz.json"
                    trigger="loop"
                    stroke="bold"
                    state="hover-look-around"
                    colors="primary:#000000,secondary:#00e060"
                    style={{ width: '250px', height: '250px' }}
                ></lord-icon>
            </section>

            <section className="coursesec reveal">
                <div className="courseheader">
                    <div className="headleft">
                        <h2>Our Courses</h2>
                        <select aria-label="Filter courses" value={filter} onChange={(event) => setFilter(event.target.value)}>
                            {filters.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                    <Link to="/courses" className="registerbut">More</Link>
                </div>
                <div className="courseflex">
                    {filterCourses(filter).map((course) => (
                        <CourseCard key={course.slug} course={course} />
                    ))}
                </div>
            </section>

            <section className="aboutsec">
                <div className="cattext reveal">
                    <h2>Who We Are?</h2>
                    <p>
                        Learnify is a tech-focused learning platform designed to empower you with in-demand skills in web
                        development, graphic design, and UI/UX. Guided by industry experts, we provide hands-on lessons
                        that turn your curiosity into real-world skills. Join us to take your first steps towards a
                        career in the digital world!
                    </p>
                    <div className="herobuttons">
                        <Link to="/signup" className="registerbut">Register</Link>
                        <Link to="/about" className="readbut">Read More</Link>
                    </div>
                </div>
                <div className="aboutft reveal">
                    <div className="aboutpng">
                        <img src="/FOTO/student.png" alt="Smiling student with a laptop" />
                    </div>
                    <img src="/FOTO/Bck-symbol.png" alt="" className="catbck" id="abbck" />
                    <div className="aboutpfps">
                        <img src="/FOTO/About pfp1.jpg" alt="" id="apfp1" />
                        <img src="/FOTO/About pfp2.jpg" alt="" id="apfp2" />
                        <img src="/FOTO/About pfp3.jpg" alt="" id="apfp3" />
                        <img src="/FOTO/About pfp4.jpg" alt="" id="apfp4" />
                    </div>
                </div>
            </section>

            <section className="testimonialsec">
                <div className="testhead reveal">
                    <h2>Testimonials</h2>
                </div>
                <div className="testgrid">
                    {testimonials.map((testimonial) => (
                        <figure className="testcard reveal" key={testimonial.name}>
                            <div className="hrtestup">
                                <div className="hrtestpro">
                                    <img src={testimonial.img} alt="" />
                                    <figcaption className="heroemer">
                                        <h3>{testimonial.name}</h3>
                                        <p>{testimonial.course}</p>
                                    </figcaption>
                                </div>
                                <Stars rating={testimonial.rating} />
                            </div>
                            <blockquote>{testimonial.text}</blockquote>
                        </figure>
                    ))}
                </div>
            </section>

            <section className="adsec reveal">
                <div className="adtext">
                    <h2>Create Your Future! <br />
                        <span>Join Learnify!</span>
                    </h2>
                    <NewsletterForm />
                </div>
                <div className="adft">
                    <img src="/FOTO/Ad1.png" alt="" />
                </div>
            </section>
        </>
    );
}

export default Home;
