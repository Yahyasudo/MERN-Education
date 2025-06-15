import React from 'react';
import { useNavigate } from 'react-router-dom';
import Testimonials from '../../components/testimonials/testimonials';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="home">
        <div className="home-content">
          <div className="satisfaction-badge">100% SATISFACTION GUARANTEE</div>
          <h1>Find Your <span>Perfect Tutor</span></h1>
          <p>We help you find perfect tutor for 1-on-1 lessons. It is completely free and private.</p>
          <div className="button-group">
            <button onClick={() => navigate("/courses")} className="btn btn-primary">Get Started</button>
            <button onClick={() => navigate("/")} className="btn btn-outline">See how it works</button>
          </div>
        </div>
        <div className="tutor-grid">
          <img src="../../hero.png" alt="Tutor with student" />
        </div>
      </div>
      <Testimonials />
    </div>
  );
}

export default Home;