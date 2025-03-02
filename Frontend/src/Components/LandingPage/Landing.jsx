import React from "react";
import styles from "../Styles/Landing.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Landing = () => {
  const integrations = [
    {
      title: "Audiomack",
      description: "Add an Audiomack player to your Linktree",
      imgSrc: "/images/audiomack-icon.png", // Replace with actual image paths
    },
    {
      title: "Bandsintown",
      description: "Drive ticket sales by listing your events",
      imgSrc: "/images/bandsintown-icon.png",
    },
    {
      title: "Bonfire",
      description: "Display and sell your custom merch",
      imgSrc: "/images/bonfire-icon.png",
    },
  ];
  return (
    <div className={styles.container}>
      {/* Header */}
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <img className={styles.sparkLogo} src="./Images/Logo.png" alt="" />
          <img
            className={styles.sparkLogo2}
            src="./Images/logo2.png"
            alt="logo2"
          />
        </div>
        <button className={styles.Admin}>Admin</button>
        <button className={styles.signUpFree}>Sign up free</button>
        <FontAwesomeIcon className={styles.bars} icon={faBars} />
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <h1>The easiest place to update and share your Connection</h1>
          <p>
            Help your followers discover everything you're sharing all over the
            internet, in one simple place. They'll thank you for it.
          </p>
          <button className={styles.getSparkBtn}>Get your free Spark</button>
        </div>
        <div className={styles.heroRight}>
          <img
            src="./Images/Analytics.png"
            alt="Dashboard"
            className={styles.dashboardImage}
          />
        </div>
      </section>

      {/* Money Cards Section */}
      <section className={styles.moneySection}>
        <div className={styles.RightSection1}>
          <h2>The best in the class product for you today!</h2>
          <p>
            This is a placeholder for your testimonials and what your client has
            to say, put them here and make sure its 100% true and meaningful.
          </p>
        </div>
        <div className={styles.moneyCards}>
          <div className={styles.moneyCard}>
            <img src="./Images/Cards.png" alt="" />
            <h2>
              Sell products and collect payments. It's monetization made simple.
            </h2>
          </div>
        </div>
        <div className={styles.RightSection}>
          <h2>Analyze your audience and keep your followers engaged</h2>
          <p>
            Track your engagement over time, monitor revenue and learn what's
            converting your audience. Make informed updates on the fly to keep
            them coming back.
          </p>
        </div>
      </section>

      {/* Content Sharing Section */}
      <section className={styles.sharing}>
        <div className={styles.sharingLeft}>
          <h2>Share limitless content in limitless ways</h2>
          <p>
            Connect your content in all its forms and help followers find more
            of what they're looking for. Your TikToks, Tweets, YouTube videos,
            music, articles, recipes, podcasts and more - it all comes together
            in one powerful place.
          </p>
        </div>
        <div className={styles.sharingRight}>
          <div className={styles.contentCards}>
            <div className={styles.contentCard}>
              <img src="./Images/Sq1.png" alt="" srcset="" />
            </div>
            <div className={styles.contentCard}>
              <img src="./Images/Sq2.png" alt="" srcset="" />
            </div>
            <div className={styles.contentCard}>
              <img src="./Images/Sq3.png" alt="" srcset="" />
            </div>
          </div>
          <p>Share your content in limitless ways on your Spark</p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonials}>
        <div className={styles.testimonialHeader}>
          <div>
            <h2>
              Here's what our{" "}
              <span className={styles.customerHighlight}>customer</span> has to
              says
            </h2>
            <button className={styles.readStories}>
              Read customer stories
            </button>
          </div>
          <img src="./Images/desc.png" alt="" />
        </div>
        <div className={styles.testimonialGrid}>
          <div className={styles.testimonialCard1}>
            <h3>Amazing tool! Saved me months</h3>
            <p>
              This is a placeholder for your testimonials and what your client
              has to say, put them here and make sure its 100% true and
              meaningful.
            </p>
            <div className={styles.testimonialAuthor}>
              <div className={styles.authorAvatar}></div>
              <div>
                <p className={styles.authorName}>John Master</p>
                <p className={styles.authorRole}>Director, Spark.com</p>
              </div>
            </div>
          </div>
          <div className={styles.testimonialCard}>
            <h3>Amazing tool! Saved me months</h3>
            <p>
              This is a placeholder for your testimonials and what your client
              has to say, put them here and make sure its 100% true and
              meaningful.
            </p>
            <div className={styles.testimonialAuthor}>
              <div className={styles.authorAvatar}></div>
              <div>
                <p className={styles.authorName}>John Master</p>
                <p className={styles.authorRole}>Director, Spark.com</p>
              </div>
            </div>
          </div>
          <div className={styles.testimonialCard}>
            <h3>Amazing tool! Saved me months</h3>
            <p>
              This is a placeholder for your testimonials and what your client
              has to say, put them here and make sure its 100% true and
              meaningful.
            </p>
            <div className={styles.testimonialAuthor}>
              <div className={styles.authorAvatar}></div>
              <div>
                <p className={styles.authorName}>John Master</p>
                <p className={styles.authorRole}>Director, Spark.com</p>
              </div>
            </div>
          </div>
          <div className={styles.testimonialCard1}>
            <h3>Amazing tool! Saved me months</h3>
            <p>
              This is a placeholder for your testimonials and what your client
              has to say, put them here and make sure its 100% true and
              meaningful.
            </p>
            <div className={styles.testimonialAuthor}>
              <div className={styles.authorAvatar}></div>
              <div>
                <p className={styles.authorName}>John Master</p>
                <p className={styles.authorRole}>Director, Spark.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className={styles.integrations}>
        <h2>All Link Apps and Integrations</h2>
        <img className={styles.img1} src="./Images/Frame.png" alt="" />
        <img className={styles.img2} src="./Images/Frame2.png" alt="" />
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footercard}>
          <div className={styles.footerTop}>
            <div>
              <button className={styles.logIn}>Log in</button>
              <button className={styles.signUpFree}>Sign up free</button>
            </div>
            <div className={styles.footerLinks}>
              <div className={styles.footerColumn}>
                <ul>
                  <li>About Spark</li>
                  <li>Blog</li>
                  <li>Press</li>
                  <li>Social Good</li>
                  <li>Contact</li>
                </ul>
              </div>
              <div className={styles.footerColumn}>
                <ul>
                  <li>Careers</li>
                  <li>Getting Started</li>
                  <li>Features</li>
                  <li>FAQs</li>
                  <li>Report a Violation</li>
                </ul>
              </div>
              <div className={styles.footerColumn}>
                <ul>
                  <li>Terms and Conditions</li>
                  <li>Privacy Policy</li>
                  <li>Trust Center</li>
                  <li>Cookie Notice</li>
                </ul>
              </div>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <p>
              We acknowledge the Traditional Custodians of the land on which our
              office stands, the Wurundjeri people of the Kulin Nation, and pay
              our respects to them past, present and emerging.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" aria-label="Twitter"></a>
              <a href="#" aria-label="Instagram"></a>
              <a href="#" aria-label="YouTube"></a>
              <a href="#" aria-label="TikTok"></a>
              <a>
                <img src="./Images/FooterLogo.png" alt="" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
