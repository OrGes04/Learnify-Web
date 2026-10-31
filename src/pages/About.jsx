import { Fragment, useState } from 'react';
import NewsletterForm from '../components/NewsletterForm.jsx';
import useReveal from '../hooks/useReveal.js';
import { aboutStats, missions, values, team } from '../data/about.js';

function About() {
    const [openMission, setOpenMission] = useState(0);
    const [openMember, setOpenMember] = useState(null);
    useReveal();

    return (
        <>
            <section className="aboutfirstsec" id="aboutmain">
                <img src="/Star Icons/Star Green.svg" alt="" className="herostargreen" id="aboutstargreen" />
                <img src="/Star Icons/Star Blue.svg" alt="" className="herostarblue" id="aboutstarblue" />
                <img src="/Star Icons/Star Green.svg" alt="" className="herostargreen" id="aboutstargreendy" />
                <div className="aboutsectop">
                    <h1>
                        Empowering <span>Learners</span>,<br /> Transforming Futures!
                    </h1>
                </div>
                <div className="aboutsecdown">
                    <img src="/About Page/Professor 1 copy.webp" alt="Three Learnify instructors" className="profone" />
                    <div className="studentsbck">
                        <img src="/About Page/Student 1.webp" alt="" />
                        <img src="/About Page/Student 2.webp" alt="" />
                    </div>
                </div>
            </section>

            <section className="aboutstats reveal">
                <div className="aboutstatgrid">
                    {aboutStats.map((stat) => (
                        <div className="aboutstatbox" key={stat.label}>
                            <div className="aboutstattext">
                                <h3>{stat.value}</h3>
                                <p>{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="paragraphsec">
                <div className="paragraphtext reveal">
                    <h2>What <br /><span>We</span> Stand For?</h2>
                    <p>
                        Our mission at Learnify is to make high-quality, industry-relevant education accessible to
                        learners worldwide. We aim to empower individuals to develop the skills they need to thrive in
                        today’s digital landscape, helping them turn their aspirations into achievements.
                    </p>
                </div>
                <div className="allmission reveal">
                    {missions.map((mission, i) => (
                        <Fragment key={mission.title}>
                            <div className={`mission${openMission === i ? ' open' : ''}`}>
                                <h3 className="missionhead">
                                    <button
                                        className="missionup"
                                        type="button"
                                        aria-expanded={openMission === i}
                                        onClick={() => setOpenMission(openMission === i ? null : i)}
                                    >
                                        <span className="missiontitle">
                                            <i className={mission.icon}></i>
                                            {mission.title}
                                        </span>
                                        <i className="fa-solid fa-chevron-down"></i>
                                    </button>
                                </h3>
                                <div className="missionpgraph">
                                    <p>{mission.text}</p>
                                </div>
                            </div>
                            <hr />
                        </Fragment>
                    ))}
                </div>
            </section>

            <section className="coursesec reveal" id="valuesec">
                <div className="courseheader">
                    <div className="headleft">
                        <h2>Our Values</h2>
                    </div>
                </div>
                <div className="courseflex" id="allvalues">
                    {values.map((value) => (
                        <div className="coursecard" id="aboutvalue" key={value.title}>
                            <div className="valueicon">
                                <lord-icon
                                    src={value.icon}
                                    trigger="loop"
                                    delay="1500"
                                    state={value.state}
                                    colors={value.colors}
                                    style={{ width: '100px', height: '100px' }}
                                ></lord-icon>
                            </div>
                            <div className="valuetext">
                                <h3>{value.title}</h3>
                                <p>{value.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="coursesec reveal">
                <div className="courseheader">
                    <div className="headleft" id="teamtitle">
                        <h2>The Team</h2>
                    </div>
                </div>
                <div className="courseflex" id="teamgrid">
                    {team.map((member, i) => (
                        <div className={`coursecard${openMember === i ? ' teamopen' : ''}`} id="teamcard" key={member.name}>
                            <div className="teachinfo">
                                <button
                                    className="teachfirst"
                                    type="button"
                                    aria-expanded={openMember === i}
                                    onClick={() => setOpenMember(openMember === i ? null : i)}
                                >
                                    <span className="teachname">
                                        <strong>{member.name}</strong>
                                        <em>{member.field}</em>
                                    </span>
                                    <i className="fa-solid fa-chevron-down" id="teamarrow"></i>
                                </button>
                                <div className="teachsocial">
                                    <a href="#" aria-label={`${member.name} on Instagram`}><i className="fa-brands fa-square-instagram"></i></a>
                                    <a href="#" aria-label={`${member.name} on X`}><i className="fa-brands fa-square-x-twitter"></i></a>
                                    <a href="#" aria-label={`${member.name} on LinkedIn`}><i className="fa-brands fa-linkedin"></i></a>
                                </div>
                            </div>
                            <div className="teamfoto">
                                <img src={member.img} alt={member.name} loading="lazy" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="adsec reveal" id="aboutadsec">
                <div id="aboutadft">
                    <img src="/About Page/Professor 9.webp" alt="" />
                </div>
                <div className="adtext" id="aboutadtext">
                    <h2>Be a Part Of<br />
                        This <span>Excellent Team!</span>
                    </h2>
                    <NewsletterForm />
                </div>
            </section>
        </>
    );
}

export default About;
