import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import CourseCard from '../components/CourseCard.jsx';
import NotFound from './NotFound.jsx';
import { courses } from '../data/courses.js';
import { categories } from '../data/categories.js';
import { categorySlug, coursesIn } from '../data/helpers.js';

function CourseDetail() {
    const { slug } = useParams();
    const course = courses.find((item) => item.slug === slug);

    useEffect(() => {
        if (course) document.title = `${course.title} | Learnify Academy`;
    }, [course]);

    if (!course) return <NotFound />;

    const category = categories.find((item) => item.name === course.categories[0]);
    const related = coursesIn(category.name).filter((item) => item.slug !== course.slug).slice(0, 4);

    return (
        <>
            <section className="coursedetail">
                <Link to="/courses" className="backlink">
                    <i className="fa-solid fa-arrow-left"></i> All courses
                </Link>
                <div className="detailgrid">
                    <div className="detailfoto">
                        <img src={course.img} alt="" />
                    </div>
                    <div className="detailinfo">
                        <Link to={`/courses#${categorySlug(category.name)}`} className="detailtag">
                            <i className={category.icon}></i> {category.name}
                        </Link>
                        <h1>{course.title}</h1>
                        <p>{category.text}</p>
                        <div className="detailstats">
                            <div>
                                <i className="fa-solid fa-clock"></i>
                                <span><strong>{course.hours.replace('hr', '')} hours</strong> of video lessons</span>
                            </div>
                            <div>
                                <i className="fa-solid fa-star"></i>
                                <span><strong>{course.rating}</strong> average rating</span>
                            </div>
                            <div>
                                <i className="fa-solid fa-user"></i>
                                <span><strong>{course.students}</strong> students enrolled</span>
                            </div>
                        </div>
                        <div className="detailbuy">
                            <span className="detailprice">{course.price}</span>
                            <Link to="/signup" className="registerbut">Enroll Now</Link>
                        </div>
                    </div>
                </div>
            </section>

            {related.length > 0 && (
                <section className="coursesec">
                    <div className="courseheader">
                        <div className="headleft">
                            <h2>More in {category.name}</h2>
                        </div>
                        <Link to={`/courses#${categorySlug(category.name)}`} className="registerbut">More</Link>
                    </div>
                    <div className="courseflex">
                        {related.map((item) => (
                            <CourseCard key={item.slug} course={item} />
                        ))}
                    </div>
                </section>
            )}
        </>
    );
}

export default CourseDetail;
