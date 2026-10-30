import { useSearchParams, Link } from 'react-router-dom';
import CourseCard from '../components/CourseCard.jsx';
import useReveal from '../hooks/useReveal.js';
import { courses } from '../data/courses.js';
import { categories } from '../data/categories.js';
import { categorySlug, coursesIn, searchCourses } from '../data/helpers.js';

function Courses() {
    const [params, setParams] = useSearchParams();
    const query = params.get('q') ?? '';
    const results = query.trim() ? searchCourses(query) : null;
    useReveal(query);

    const onChange = (event) => {
        const value = event.target.value;
        setParams(value ? { q: value } : {}, { replace: true });
    };

    return (
        <>
            <div className="firstsec">
                <div className="mainhead">
                    <h1>Search For <br />The Best Courses Online!</h1>
                </div>
                <form className="herosearch" id="searchcourse" role="search" onSubmit={(event) => event.preventDefault()}>
                    <input
                        type="search"
                        placeholder="Search for anything"
                        aria-label="Search courses"
                        value={query}
                        onChange={onChange}
                    />
                    <button type="submit" aria-label="Search">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </form>
                <img src="/Star Icons/Star Green.svg" alt="" className="herostargreen" />
                <img src="/Star Icons/Star Blue.svg" alt="" className="herostarblue" />
            </div>

            {results ? (
                <section className="coursesec" id="courseone">
                    <div className="courseheader">
                        <div className="headleft">
                            <h2>
                                {results.length} {results.length === 1 ? 'result' : 'results'} for “{query.trim()}”
                            </h2>
                        </div>
                    </div>
                    {results.length ? (
                        <div className="courseflex resultsgrid">
                            {results.map((course) => (
                                <CourseCard key={course.slug} course={course} />
                            ))}
                        </div>
                    ) : (
                        <p className="noresults">
                            No courses match your search. Try “design”, “JavaScript” or{' '}
                            <Link to="/courses" onClick={() => setParams({})}>browse all courses</Link>.
                        </p>
                    )}
                </section>
            ) : (
                <>
                    <section className="coursesec reveal" id="courseone">
                        <div className="testhead">
                            <h2>Our Courses</h2>
                            <p>
                                Discover courses in web development, graphic design, and UI/UX —<br />your path to tech
                                skills starts here.
                            </p>
                        </div>
                        <div className="courseflex" id="herocoursepage">
                            {courses.filter((course) => course.featured).map((course) => (
                                <CourseCard key={course.slug} course={course} id="scrollcard" />
                            ))}
                        </div>
                    </section>

                    {categories.map((category) => (
                        <section className="coursesec reveal" id={categorySlug(category.name)} key={category.name}>
                            <div className="courseheader">
                                <div className="headleft">
                                    <h2>{category.name}</h2>
                                </div>
                            </div>
                            <div className="courseflex">
                                {coursesIn(category.name).filter((course) => !course.latest).map((course) => (
                                    <CourseCard key={course.slug} course={course} />
                                ))}
                            </div>
                        </section>
                    ))}

                    <section className="coursesec reveal">
                        <div className="courseheader">
                            <div className="headleft">
                                <h2>Latest Addition</h2>
                            </div>
                        </div>
                        <div className="courseflex" id="lastflex">
                            {courses.filter((course) => course.latest).map((course) => (
                                <div className="coursecard" id="lastcard" key={course.slug}>
                                    <Link to={`/courses/${course.slug}`} className="cardfoto" id="lastfoto" tabIndex={-1}>
                                        <img src={course.img} alt="" loading="lazy" />
                                    </Link>
                                    <div className="cardinfo" id="cardinfo">
                                        <div className="infotop" id="infotop">
                                            <h3><Link to={`/courses/${course.slug}`}>{course.title}</Link></h3>
                                            <div className="coursestat" id="laststat">
                                                <div className="clock">
                                                    <i className="fa-solid fa-clock"></i>
                                                    <h5>{course.hours}</h5>
                                                </div>
                                                <div className="divide"></div>
                                                <div className="coursestar">
                                                    <i className="fa-solid fa-star"></i>
                                                    <h5>{course.rating}</h5>
                                                </div>
                                                <div className="divide"></div>
                                                <div className="user">
                                                    <i className="fa-solid fa-user"></i>
                                                    <h5>{course.students}</h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="coursebut">
                                            <span className="crsbut">{course.price}</span>
                                            <Link to={`/courses/${course.slug}`} className="viewcourse">
                                                View course <i className="fa-solid fa-arrow-right"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </>
            )}
        </>
    );
}

export default Courses;
