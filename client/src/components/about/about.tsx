import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about">
      <div className="container">
        <h1>About Us</h1>

        <div className="about-content">
          <h2>Our Platform</h2>
          <p>Art Book Collective is an innovative project created at BU Spark! by a student group of three: Ash Wei, Matthew Iwane, and William Zeng. In the fall semester of 2023, fueled by a shared passion for art books, they crafted this beta version with the hope of evolving it into a sustainable, functional platform in the near future. This collaborative project is a blend of their passion and creativity in the realm of indie publication.</p>
          <h2>Team</h2>
          <p>Art Book Collective is made possible by the dedicated efforts of:</p>
          <ul>
            <li>Ash Wei - Innovator, Designer</li>
            <li>Matthew Iwane - Developer</li>
            <li>William Zeng - Developer</li>
          </ul>

          <h2>Instructors</h2>
          <p>Guided and mentored by:</p>
          <ul>
            <li>Ziba Cranmer - Director, BU Spark!</li>
            <li>James Grady - Creative Director, BU Spark! and Assistant Professor of Graphic Design</li>
            <li>Asad Malik - Technical Lead, BU Spark! Innovation Program, Software Engineer, SAIL @ Hariri</li>
          </ul>

          <h2>Mentors</h2>
          <p>We extend our gratitude to the mentors who provided invaluable support and guidance:</p>
          <ul>
            <li>Vince Conzola - Interaction Designer, Red Hat</li>
            <li>Eric Lin - Software Engineer, Capital One</li>
            <li>Mike McDevitt - Senior Systems Analyst, Boston University</li>
            <li>Qi Yang - Research Scientist, Meta</li>
          </ul>

          <h2>Teaching Assistant</h2>
          <ul>
            <li>Molly Zhou - Teaching Assistant</li>
          </ul>

          <h2>Special Thanks</h2>
          <p className="thanks-description">
            We express our gratitude to the following individuals for their support and contributions:
          </p>
          <ul className="special-thanks">
          <li>Arindo Briyan</li>
          <li>Dave Cwiok</li>
          <li>Hou Chi Chan</li>
          <li>Rachel Chen</li>
          <li>Thomas Eykemans</li>
          <li>Dhwani Garg</li>
          <li>Brockett Horne</li>
          <li>Emily Jing</li>
          <li>Yuree Jang</li>
          <li>Andrew Kim</li>
          <li>Emma Kim</li>
          <li>Mint Liu</li>
          <li>Tania Luo</li>
          <li>Ren Lanzi</li>
          <li>Christine Roh</li>
          <li>Michael Russen</li>
          <li>Kristina Shumilina</li>
          <li>Bella Tuo</li>
          <li>Debbi Tanaka</li>
          <li>Dharshanya Venkataramanan</li>
          <li>Tiya Wang</li>
          <li>Jayme Yen</li>
          <li>Molly Zhou</li>
          </ul>

        </div>
      </div>
    </section>
  );
};

export default About;
