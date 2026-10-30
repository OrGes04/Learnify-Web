import { Link } from 'react-router-dom';

function CourseCard({ course, id }) {
    return (
        <div className="coursecard courseitem" id={id}>
            <div className="cardtop">
                <Link to={`/courses/${course.slug}`} className="cardfoto" tabIndex={-1}>
                    <img src={course.img} alt="" loading="lazy" />
                </Link>
                <h2>
                    <Link to={`/courses/${course.slug}`}>{course.title}</Link>
                </h2>
                <div className="coursestat">
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
    );
}

export default CourseCard;
