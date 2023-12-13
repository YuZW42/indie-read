import React from 'react';
import { Footer } from '../shared/Footer';

const About: React.FC = () => {
  return (
    <section id="about">
      <div className="container">
        <h1 className="header">About Us</h1>

        <div className="about-content">


          <p className="intro">Welcome to Art Book Collective, a vibrant community-driven platform where art book enthusiasts and creators converge. Our mission is to foster a shared space for learning and connecting through the beauty of art books. We design for discovering hidden gems, but also for contributing to our ever-growing community collection. Whether you're new to art literature or a seasoned enthusiast, your participation enriches us all. Join us in uncovering and celebrating the diverse, often undiscovered treasures of the art book world, creating a shared space of learning, connection, and mutual enrichment.</p>
          <section className="body">
            <h2 >What are Art Books?</h2>
            <p>Art books, encompassing creations from artists, designers, and makers, explore the concept of publishing as an art form. Different from exhibition catalogs or essays on arts. These pieces, ranging from hardcovers to zines, tell stories using typography, photography, and materials in creative ways. They may include narratives, poetry, or illustrations, and be crafted through various techniques like RISOgraph or letterpress. Each book offers a unique perspective, often in unexpected formats, inviting readers to experience the world anew.</p>
          </section>
          <section className="body">
            <h2 >Our Team</h2>
            <p>Art Book Collective is an innovative project created at BU Spark! by a student group of three. In the fall semester of 2023, fueled by a shared passion for art books, we crafted this beta version with the hope of evolving it into a sustainable, functional platform in the near future. This collaborative project is a blend of our passion and creativity in the realm of indie publication.</p>
          </section>
          <h2>Credits</h2>
          <section className="body">
            <h4 className="name">Team</h4>
            <ul>
              <li>Ash Wei - Innovator, Designer</li>
              <li>Matthew Iwane - Technical Developer</li>
              <li>William Zeng - Technical Developer</li>
            </ul>
            <h4 className="name">Instructors</h4>

            <ul>
              <li>Ziba Cranmer - Director, BU Spark!</li>
              <li>James Grady - Creative Director, BU Spark! and Assistant Professor of Graphic Design</li>
              <li>Asad Malik - Technical Lead, BU Spark! Innovation Program, Software Engineer, SAIL @ Hariri</li>
            </ul>

            <h4 className="name">Mentors</h4>

            <ul>
              <li>Vince Conzola - Interaction Designer, Red Hat</li>
              <li>Eric Lin - Software Engineer, Capital One</li>
              <li>Mike McDevitt - Senior Systems Analyst, Boston University</li>
              <li>Qi Yang - Research Scientist, Meta</li>
            </ul>

            <h4 className="name">Teaching Assistant</h4>
            <ul>
              <li>Molly Zhou - Teaching Assistant</li>
            </ul>

            <h4 className="name">Special Thanks</h4>

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
          </section>
        </div>

      </div>

      <Footer />

    </section>
  );
};

export default About;
