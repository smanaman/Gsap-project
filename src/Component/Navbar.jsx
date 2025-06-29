import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkTheme) {
      root.classList.remove('light-theme');
    } else {
      root.classList.add('light-theme');
    }
  }, [isDarkTheme]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <div>
      <header className={`navbar ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
        <div className="container">
          {/* Logo/Brand */}
          <div className="brand">
            <i className="fas fa-headphones" />
            <span>AudioHub</span>
          </div>

          {/* Navigation Links */}
          <nav className="nav-links">
           <Link to='/'><a href="#"><i className="fas fa-home" /> Home</a></Link> 
<Link to='/shop'> <a href="#"><i className="fas fa-headphones-alt" /> Products</a></Link>            <a href="#"><i className="fas fa-tag" /> Deals</a>
            <a href="#"><i className="fas fa-info-circle" /> About</a>
            <a href="#"><i className="fas fa-envelope" /> Contact</a>
          </nav>

          {/* Action Buttons */}
          <div className="nav-actions">
            <button className="search-btn" aria-label="Search" onClick={toggleSearch}>
              <i className="fas fa-search" />
            </button>
            <button className="cart-btn" aria-label="Cart">
              <i className="fas fa-shopping-cart" />
              <span className="cart-count">3</span>
            </button>
            <button className="theme-toggle" aria-label="Toggle theme" onClick={toggleTheme}>
              <i className={`fas ${isDarkTheme ? 'fa-moon' : 'fa-sun'}`} />
            </button>
            <button className={`hamburger ${isMenuOpen ? 'active' : ''}`} aria-label="Menu" onClick={toggleMenu}>
              <span className="bar" />
              <span className="bar" />
              <span className="bar" />
            </button>
          </div>
        </div>

        <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
          <a href="#"><i className="fas fa-home" /> Home</a>
          <a href="#"><i className="fas fa-tag" /> Deals</a>
          <a href="#"><i className="fas fa-info-circle" /> About</a>
          <a href="#"><i className="fas fa-envelope" /> Contact</a>
        </div>

        <div className={`search-bar ${isSearchOpen ? 'active' : ''}`}>
          <input type="text" placeholder="Search products..." />
          <button className="search-submit"><i className="fas fa-search" /></button>
        </div>
      </header>

      
    </div>
  );
}

export default Navbar;
