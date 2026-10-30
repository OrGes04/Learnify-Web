import { useRef, useState } from 'react';
import useReveal from '../hooks/useReveal.js';
import { featured, blogs, projects, books } from '../data/resources.js';

function BlogInfo({ time, category }) {
    return (
        <div className="bloginfo">
            <div className="blogtime">
                <i className="fa-regular fa-clock"></i>
                <h4>{time}</h4>
            </div>
            <div className="divide"></div>
            <div className="blogcat">
                <i className="fa-solid fa-list"></i>
                <h4>{category}</h4>
            </div>
        </div>
    );
}

function Resources() {
    const [liked, setLiked] = useState([]);
    const [slide, setSlide] = useState(0);
    const featuredRef = useRef(null);
    useReveal();

    const onFeaturedScroll = () => {
        const list = featuredRef.current;
        setSlide(Math.round(list.scrollLeft / list.clientWidth));
    };

    const showSlide = (i) => {
        const list = featuredRef.current;
        list.scrollTo({ left: list.children[i].offsetLeft - list.offsetLeft, behavior: 'smooth' });
    };

    const toggleLike = (title) => {
        setLiked((list) => (list.includes(title) ? list.filter((item) => item !== title) : [...list, title]));
    };

    const [mainBlog, ...sideBlogs] = blogs;

    return (
        <>
            <h1 className="visually-hidden">Resources</h1>
            <section className="resomain" id="resourcesmain" ref={featuredRef} onScroll={onFeaturedScroll}>
                {featured.map((item, i) => (
                    <div className="featuredcard" id={i ? `featuredcard${i + 1}` : undefined} key={item.title}>
                        <div className="resourcesfoto"><img src={item.img} alt="" /></div>
                        <div className="resomaintxt" id={i ? 'moreresomaintxt' : undefined}>
                            <h3><i>Featured</i></h3>
                            <h2>{item.title}</h2>
                            <button className="crsbut" type="button">Read More</button>
                        </div>
                    </div>
                ))}
            </section>
            <div className="featdots">
                {featured.map((item, i) => (
                    <button
                        key={item.title}
                        type="button"
                        className={slide === i ? 'active' : undefined}
                        aria-label={`Show featured post ${i + 1}`}
                        aria-current={slide === i}
                        onClick={() => showSlide(i)}
                    ></button>
                ))}
            </div>

            <section className="blogsec reveal" id="blog">
                <div className="courseheader">
                    <div className="headleft" id="teamtitle">
                        <h2>Blog</h2>
                    </div>
                </div>
                <div className="blogflex">
                    <div className="blogleft">
                        <div className="coursecard" id="blogcard">
                            <div className="cardtop" id="blogcardtop">
                                <div className="cardfoto" id="blogfoto">
                                    <img src={mainBlog.img} alt="" loading="lazy" />
                                </div>
                                <BlogInfo time={mainBlog.time} category={mainBlog.category} />
                                <h3>{mainBlog.title}</h3>
                                <p>{mainBlog.text}</p>
                            </div>
                            <div className="coursebut">
                                <button className="crsbut" type="button">Read More</button>
                            </div>
                        </div>
                    </div>
                    <div className="blogright">
                        <div className="smallblog">
                            {sideBlogs.slice(0, 2).map((blog) => (
                                <div id="lastcard" key={blog.title}>
                                    <div className="cardfoto" id="lastfoto">
                                        <img src={blog.img} alt="" loading="lazy" />
                                    </div>
                                    <div className="cardinfo" id="cardinfo">
                                        <div className="infotop" id="blogrightinfo">
                                            <BlogInfo time={blog.time} category={blog.category} />
                                            <h3>{blog.title}</h3>
                                            <div id="blogcardtop">
                                                <p>{blog.text}</p>
                                            </div>
                                        </div>
                                        <div className="coursebut">
                                            <button className="crsbut" type="button">Read More</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="courseflex" id="blogallcards">
                    {sideBlogs.slice(2).map((blog) => (
                        <div className="coursecard" id="blogroupcard" key={blog.title}>
                            <div className="cardtop" id="blogcolumn">
                                <div className="cardfoto">
                                    <img src={blog.img} alt="" loading="lazy" />
                                </div>
                                <BlogInfo time={blog.time} category={blog.category} />
                                <h3>{blog.title}</h3>
                                <div id="blogcardtop">
                                    <p>{blog.text}</p>
                                </div>
                            </div>
                            <div className="coursebut">
                                <button className="crsbut" type="button">Read More</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="coursesec reveal">
                <div className="courseheader">
                    <div className="headleft">
                        <h2>Student Projects</h2>
                    </div>
                </div>
                <div className="courseflex resrow">
                    {projects.map((project) => (
                        <div className="coursecard" id="studentcard" key={project.title}>
                            <div className="studentpfp">
                                <img src={project.avatar} alt="" />
                                <h3>{project.student}</h3>
                            </div>
                            <div className="studentcardtop">
                                <div className="cardfoto">
                                    <img src={project.img} alt={project.title} loading="lazy" />
                                </div>
                            </div>
                            <div className="projectinfo">
                                <h3>{project.title}</h3>
                                <button className="viewcourse" type="button">See More <i className="fa-solid fa-arrow-right"></i></button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="coursesec reveal">
                <div className="courseheader">
                    <div className="headleft">
                        <h2>Books</h2>
                    </div>
                </div>
                <div className="courseflex resrow">
                    {books.map((book) => (
                        <div className="coursecard" id="bookcard" key={book.title}>
                            <div className="bookaction">
                                <button
                                    type="button"
                                    className={liked.includes(book.title) ? 'liked' : undefined}
                                    aria-pressed={liked.includes(book.title)}
                                    aria-label={`Save ${book.title}`}
                                    onClick={() => toggleLike(book.title)}
                                >
                                    <i className={liked.includes(book.title) ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}></i>
                                </button>
                            </div>
                            <div className="cardtop">
                                <div className="cardfoto" id="bookfoto">
                                    <img src={book.img} alt="" loading="lazy" />
                                </div>
                                <div className="bloginfo">
                                    {book.bestseller && (
                                        <>
                                            <div className="blogtime" id="bestseller">
                                                <i className="fa-solid fa-star"></i>
                                                <h4>Bestseller</h4>
                                            </div>
                                            <div className="divide"></div>
                                        </>
                                    )}
                                    <div className="blogcat">
                                        <i className="fa-solid fa-list"></i>
                                        <h4>{book.category}</h4>
                                    </div>
                                </div>
                                <h3>{book.title}</h3>
                                <p>By: <span><strong>{book.author}</strong></span></p>
                            </div>
                            <div className="coursebut">
                                <span className="crsbut">{book.price}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

export default Resources;
