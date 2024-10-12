// App.jsx

import React, { useState, useEffect, useRef } from 'react'; // Consolidated import
import './App.css';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
import ProfileImage from './images/profile.jpg';
import projectImage1 from './images/project1.jpg';
import projectImage2 from './images/project2.jpg';
import projectImage3 from './images/project3.jpg';
import contactImage from './images/contact.jpg';
import aboutBackground from './images/about-background.jpg'; // Import the new background image
import Modal from 'react-modal';


Modal.setAppElement('#root'); // Accessibility feature

const App = () => {

  const projectsRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);


  useEffect(() => {
    const options = {
      threshold: 0.1,
    };
  
    const callback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.id === 'projects') {
            entry.target.classList.add('animate-slide-in-left'); // Make sure class is added
          }
          observer.unobserve(entry.target);
        }
      });
    };
  
    const observer = new IntersectionObserver(callback, options);
  
    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }
  
    return () => {
      if (projectsRef.current) {
        observer.unobserve(projectsRef.current);
      }
    };
  }, []);
  

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState({});

  const openModal = (project) => {
    setCurrentProject(project);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const projects = [
    {
      id: 1,
      title: 'Project Title 1',
      description: 'Detailed description of Project 1.',
      image: projectImage1,
      github: 'https://github.com/yourusername/project1',
    },
    {
      id: 2,
      title: 'Project Title 2',
      description: 'Detailed description of Project 2.',
      image: projectImage2,
      github: 'https://github.com/yourusername/project2',
    },
    {
      id: 3,
      title: 'Project Title 3',
      description: 'Detailed description of Project 3.',
      image: projectImage3,
      github: 'https://github.com/yourusername/project3',
    },
    // Add more projects as needed
  ];

  return (
    <div className="app">
      {/* Background Overlay */}
      <div className="background"></div>
      
      {/* Navigation Bar */}
      <nav className="navbar">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li> {/* New Navigation Link */}
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* Home Section */}
      <section id="home" className="section home-section">
        <div className="content">
          {/* Profile Image */}
          <img src={ProfileImage} alt="Profile" className="profile-image" loading="lazy" />

          <h1>Welcome to My Portfolio</h1>
          <p>I'm [Your Name], a passionate developer.</p>
          {/* Call-to-Action Button */}
          <a href="#projects" className="cta-button">View My Work</a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section about-section" ref={aboutRef}>
        <div className="about-background"></div> {/* Blurred Background */}
        <div className="about-content">
          <h2>About Me</h2>
          <p>
            Hello! I'm [Your Name], a software developer with a passion for creating dynamic and responsive web applications. With expertise in React, JavaScript, and modern web technologies, I strive to build user-friendly and efficient solutions.
          </p>
          {/* Add more content as needed */}
        </div>
      </section>



      {/* Projects Section */}
      <section id="projects" className="section projects-section" ref={projectsRef}>
        <div className="content">
          <h2>My Projects</h2>
          <div className="projects-container">
            {projects.map((project) => (
              <div
                key={project.id}
                className="project-card"
              >
                <img src={project.image} alt={project.title} className="project-image" loading="lazy" />
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-icons">
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github"></i>
                  </a>
                  {project.externalLink && (
                    <a href={project.externalLink} target="_blank" rel="noopener noreferrer">
                      <i className="fas fa-external-link-alt"></i>
                    </a>
                  )}
                </div>
                <button onClick={() => openModal(project)} className="project-link">View Details</button>
              </div>
            ))}
          </div>
        </div>
      </section>
          
          

      {/* Contact Section */}
      <section id="contact" className="section contact-section" ref={contactRef}>
        <div className="contact-box">
          <h2>Contact Me</h2>
          <p>Feel free to reach out to me through the following channels:</p>
          <ul className="contact-list">
            <li>
              <i className="fas fa-envelope"></i>
              <a href="mailto:your.email@example.com">your.email@example.com</a>
            </li>
            <li>
              <i className="fab fa-linkedin"></i>
              <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">Your LinkedIn</a>
            </li>
            <li>
              <i className="fab fa-github"></i>
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">yourusername</a>
            </li>
          </ul>
          {/* Contact Image Placeholder */}
          <img src={contactImage} alt="Contact" className="contact-image" loading="lazy" />
        </div>
      </section>

                


      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
        <div className="social-icons">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
          {/* Add more social icons as needed */}
        </div>
      </footer>

      {/* Project Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Project Details"
        className="modal"
        overlayClassName="overlay"
      >
        <button onClick={closeModal} className="close-button">&times;</button>
        {currentProject && (
          <div className="modal-content">
            <img src={currentProject.image} alt={currentProject.title} className="modal-image" />
            <h2>{currentProject.title}</h2>
            <p>{currentProject.description}</p>
            <a href={currentProject.github} target="_blank" rel="noopener noreferrer" className="modal-link">View on GitHub</a>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default App;
