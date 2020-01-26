import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="text-center">
      <h2>Welcome to Pencil Symphony</h2>
      <Link to='/login' className="btn">Log In</Link>
    </div>
  );
};

export default Home;
