import React from 'react';
import WatchlistrWeb from '../Projects/Watchlistr(Web)';
import RecipeRealm from '../Projects/RecipeRealm';
import WatchlistriOS from '../Projects/Watchlistr(iOS)';
import '../Projects/Projects.css';

const Projects = () => {
  return (
    <div className="coding-background">
      <h2 className="section-title">Projects</h2>
      <section className="section">
        <WatchlistrWeb />
      </section>
      <section className="section">
        <RecipeRealm />
      </section>
      <section className="section">
        <WatchlistriOS />
      </section>
    </div>
  );
};

export default Projects;