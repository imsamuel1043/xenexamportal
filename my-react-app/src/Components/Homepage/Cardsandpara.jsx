import { useState, useEffect } from "react";
import cardspara from "../../assets/Css/Cardsandpara.module.css";
import schooledu from "../../assets/images/schooleducation.svg";
import testprep from "../../assets/images/testprep.svg";
import testpublish from "../../assets/images/testpublisher.svg";
import "bootstrap-icons/font/bootstrap-icons.css";

const Cardsandpara = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email) {
            setMessage("Please enter your email.");
            setTimeout(() => setMessage(""), 2000);
            return;
        }

        setMessage("Subscribed successfully! 🎉");
        setEmail("");
        setTimeout(() => setMessage(""), 2000);
    };

    /* ✅ FIXED SCROLL REVEAL */
    useEffect(() => {
        const elements = document.querySelectorAll(
            `.${cardspara.scrollReveal}`
        );

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number(entry.target.dataset.index || 0);
                        entry.target.style.transitionDelay = `${index * 0.25}s`;
                        entry.target.classList.add(cardspara.show);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.35 }
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <div>
            {/* ===== TOP FEATURE CARDS ===== */}
            <div className={cardspara.cardsspace}>
                <div className="container">
                    <h3 className="text-center fw-bold mb-4">
                        Why Choose <span style={{ color: "#3956AD" }}>Our Platform</span>
                    </h3>

                    <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center">
                        {[schooledu, testprep, testpublish].map((img, i) => (
                            <div key={i} className="col d-flex justify-content-center">
                                <div
                                    className={`${cardspara.featureCard} ${cardspara.scrollReveal}`}
                                    data-index={i}
                                >
                                    <img src={img} alt="" />
                                    <h6>
                                        {i === 0
                                            ? "Reusable Questions"
                                            : i === 1
                                                ? "Save Your Time"
                                                : "Simple Process"}
                                    </h6>
                                    <p>
                                        {i === 0 &&
                                            "Save your question bank and reuse it across multiple exams."}
                                        {i === 1 &&
                                            "Eliminate paper-based exams and reduce manual grading."}
                                        {i === 2 &&
                                            "Create exams, assign marks, and publish in clicks."}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ===== WHY CHOOSE BOTTOM ===== */}

            <div className={cardspara.lastcolor}>

                <div className="container-fluid mt-4 mb-5">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-10">
                            <div className={cardspara.timelineTwoColumn}>
                                {[
                                    {
                                        icon: "book",
                                        title: "Comprehensive Content",
                                        text: "High-quality curated materials.",
                                    },
                                    {
                                        icon: "clock-history",
                                        title: "Flexible Learning",
                                        text: "Learn anytime with freedom.",
                                    },
                                    {
                                        icon: "award",
                                        title: "Recognized Certification",
                                        text: "Certificates that hold value.",
                                    },
                                    {
                                        icon: "person-badge",
                                        title: "Personalized Learning Paths",
                                        text: "Adaptive learning for every student.",
                                    },
                                    {
                                        icon: "clock",
                                        title: "Instant Results & Feedback",
                                        text: "Get quick performance feedback.",
                                    },
                                    {
                                        icon: "phone",
                                        title: "Any Device Access",
                                        text: "Learn on mobile, tablet, or desktop.",
                                    },
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className={`${cardspara.timelineTwoColumnItem} ${i % 2 !== 0 ? cardspara.rightColumn : cardspara.leftColumn
                                            } ${cardspara.scrollReveal}`}
                                    >
                                        {i % 2 === 0 ? (
                                            <>
                                                <div className={cardspara.timelineTwoColumnContent}>
                                                    <h5>{item.title}</h5>
                                                    <p>{item.text}</p>
                                                </div>
                                                <div className={cardspara.timelineTwoColumnDot}>
                                                    <i className={`bi bi-${item.icon}`}></i>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className={cardspara.timelineTwoColumnDot}>
                                                    <i className={`bi bi-${item.icon}`}></i>
                                                </div>
                                                <div
                                                    className={`${cardspara.timelineTwoColumnContent} ${cardspara.rightContent}`}
                                                >
                                                    <h5>{item.title}</h5>
                                                    <p>{item.text}</p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cardspara.aboutWrapper}>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12 col-lg-8 text-center">
                                <h2 className={cardspara.aboutTitle}>
                                    About <span>Us</span>
                                </h2>

                                <p className={cardspara.aboutText}>
                                    We are a smart exam and assessment platform designed to make test preparation simple, reliable, and effective. Our goal is to help students prepare with confidence through structured exams, accurate evaluations, and instant performance insights.
                                </p>

                                <p className={cardspara.aboutText}>
                                   We focus on realistic test experiences, personalized practice, and clear result analysis across all devices. Whether you’re preparing for competitive exams, academic assessments, or skill evaluations, we support your exam journey with precision, speed, and reliability.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>



                {/* SUBSCRIBE */}
                <div className={cardspara.newsletterWrapper}>
                    <div className={cardspara.newsletterBox}>

                        <div className={cardspara.newsIcon}>
                            <i className="bi bi-envelope"></i>
                        </div>

                        <h4 className={cardspara.newsTitle}>
                            News<span>Letter</span>
                        </h4>

                        <p className={cardspara.newsSubtitle}>
                            subscribe to our news letter and stay updated
                        </p>

                        <div className={cardspara.inputWrapper}>
                            <input
                                type="email"
                                placeholder="Type your email here"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button onClick={handleSubmit}>
                                <i className="bi bi-arrow-right"></i>
                            </button>
                        </div>

                        {message && <p className={cardspara.fadeMessage}>{message}</p>}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Cardsandpara;
