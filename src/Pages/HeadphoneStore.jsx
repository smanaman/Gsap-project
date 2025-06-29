import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../Component/Navbar';

const HeadphoneStore = () => {
  // Headphones data with high-quality images
  const headphonesData = [
    {
      id: 1,
      name: "Quantum X900",
      brand: "Bose",
      price: 399,
      image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
      features: ["Active Noise Cancelling", "50h Battery", "Hi-Res Audio", "Wireless"],
      description: "Experience audio perfection with our flagship model featuring industry-leading noise cancellation and crystal-clear sound reproduction.",
      colors: ["#1e40af", "#0f172a", "#64748b"],
      rating: 4.8,
      discount: 15
    },
    {
      id: 2,
      name: "Pulse Elite",
      brand: "Sony",
      price: 349,
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
      features: ["360 Reality Audio", "Touch Controls", "LDAC", "30h Battery"],
      description: "Immersive 360-degree audio with precision-engineered drivers for the most demanding audiophiles.",
      colors: ["#b91c1c", "#0f172a", "#475569"],
      rating: 4.6,
      discount: 10
    },
    {
      id: 3,
      name: "Aero Pro Max",
      brand: "Apple",
      price: 549,
      image: "https://images.unsplash.com/photo-1612444530582-fc66183b16f7?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
      features: ["Spatial Audio", "Adaptive EQ", "MagSafe Charging", "ANC"],
      description: "The ultimate wireless headphones with dynamic head tracking and personalized spatial audio.",
      colors: ["#334155", "#0f172a", "#1e293b"],
      rating: 4.9,
      discount: 0
    },
    {
      id: 4,
      name: "HD 820",
      brand: "Sennheiser",
      price: 1999,
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
      features: ["Closed-back", "Reference Sound", "Glass Technology", "Wired"],
      description: "Studio-grade reference headphones with innovative glass transducer technology.",
      colors: ["#7e22ce", "#0f172a", "#4c1d95"],
      rating: 4.7,
      discount: 20
    },
    {
      id: 5,
      name: "Live Pro+",
      brand: "JBL",
      price: 199,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
      features: ["Smart Ambient", "Fast Charge", "Voice Assistant", "Wireless"],
      description: "Professional-quality sound with smart ambient awareness for all-day comfort.",
      colors: ["#d97706", "#0f172a", "#92400e"],
      rating: 4.3,
      discount: 25
    },
    {
      id: 6,
      name: "Momentum 4",
      brand: "Bose",
      price: 379,
      image: "https://images.unsplash.com/photo-1612444530582-fc66183b16f7?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
      features: ["60h Playtime", "Adaptive ANC", "Auto Play/Pause", "Wireless"],
      description: "Premium materials meet cutting-edge technology for an unparalleled listening experience.",
      colors: ["#065f46", "#0f172a", "#047857"],
      rating: 4.5,
      discount: 5
    }
  ];

  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState(2000);
  const [brandFilter, setBrandFilter] = useState('all');
  const [selectedHeadphone, setSelectedHeadphone] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCartNotification, setShowCartNotification] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  // Get unique brands
  const brands = [...new Set(headphonesData.map(item => item.brand))];

  // Filter and sort headphones
  const filteredHeadphones = headphonesData
    .filter(headphone => {
      const matchesSearch = headphone.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          headphone.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = headphone.price <= priceRange;
      const matchesBrand = brandFilter === 'all' || headphone.brand === brandFilter;
      const matchesTab = activeTab === 'all' || 
                        (activeTab === 'premium' && headphone.price > 1000) ||
                        (activeTab === 'budget' && headphone.price <= 300);
      
      return matchesSearch && matchesPrice && matchesBrand && matchesTab;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  // Add to cart function
  const handleAddToCart = (headphone) => {
    setCart([...cart, headphone]);
    setShowCartNotification(true);
    setTimeout(() => setShowCartNotification(false), 3000);
  };

  // Event handlers
  const handleBuyNow = (headphone) => {
    setSelectedHeadphone(headphone);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseDetail = () => {
    setSelectedHeadphone(null);
    document.body.style.overflow = 'auto';
  };

  // Calculate discounted price
  const getDiscountedPrice = (price, discount) => {
    return (price * (100 - discount) / 100).toFixed(0);
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    },
    hover: {
      y: -10,
      scale: 1.03,
      transition: { duration: 0.2 }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring",
        damping: 25,
        stiffness: 500
      }
    }
  };

  // UI Styles
  const styles = {
    app: {
      backgroundColor: '#0f172a',
      color: '#e2e8f0',
      minHeight: '100vh',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    },
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '0 2rem'
    },
    // Enhanced Header Styles
    header: {
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      padding: '4rem 0 6rem',
      marginBottom: '-3rem',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
    },
    headerContent: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '0 2rem',
      position: 'relative',
      zIndex: 2
    },
    headerBgPattern: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(56, 189, 248, 0.1) 0%, transparent 20%)',
      zIndex: 1
    },
    title: {
      fontSize: '3.5rem',
      fontWeight: '900',
      background: 'linear-gradient(90deg, #7dd3fc, #38bdf8)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '1rem',
      lineHeight: '1.2',
      letterSpacing: '-0.05em'
    },
    subtitle: {
      fontSize: '1.25rem',
      color: '#cbd5e1',
      maxWidth: '600px',
      marginBottom: '3rem',
      lineHeight: '1.6'
    },
    heroImage: {
      position: 'absolute',
      right: '5%',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '400px',
      height: '400px',
      borderRadius: '20px',
      objectFit: 'cover',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
      border: '2px solid rgba(255, 255, 255, 0.1)',
      zIndex: 2
    },
    // Updated Filter Section
    filtersContainer: {
      backgroundColor: '#1e293b',
      borderRadius: '16px',
      padding: '2rem',
      marginTop: '-2rem',
      position: 'relative',
      zIndex: 10,
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
      border: '1px solid rgba(255, 255, 255, 0.05)'
    },
    filtersGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '2rem'
    },
    searchBox: {
      position: 'relative'
    },
    searchInput: {
      width: '100%',
      padding: '0.75rem 1rem 0.75rem 2.5rem',
      border: '1px solid #334155',
      borderRadius: '8px',
      backgroundColor: '#1e293b',
      color: '#f8fafc',
      fontSize: '0.95rem',
      transition: 'all 0.2s ease',
      outline: 'none'
    },
    searchInputFocus: {
      borderColor: '#60a5fa',
      boxShadow: '0 0 0 3px rgba(56, 189, 248, 0.2)'
    },
   
    filterGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    },
    label: {
      fontSize: '0.9rem',
      fontWeight: '500',
      color: '#cbd5e1'
    },
    rangeInput: {
      width: '100%',
      height: '6px',
      borderRadius: '3px',
      background: '#334155',
      outline: 'none',
      accentColor: '#38bdf8',
      cursor: 'pointer'
    },
    priceValue: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '0.85rem',
      color: '#94a3b8'
    },
    select: {
      width: '100%',
      padding: '0.75rem 1rem',
      border: '1px solid #334155',
      borderRadius: '8px',
      backgroundColor: '#1e293b',
      color: '#f8fafc',
      fontSize: '0.95rem',
      cursor: 'pointer',
      outline: 'none',
      transition: 'all 0.2s ease'
    },
    selectFocus: {
      borderColor: '#60a5fa',
      boxShadow: '0 0 0 3px rgba(56, 189, 248, 0.2)'
    },
    tabs: {
      display: 'flex',
      gap: '0.75rem',
      margin: '2rem 0',
      backgroundColor: '#1e293b',
      padding: '0.75rem',
      borderRadius: '12px',
      border: '1px solid rgba(255, 255, 255, 0.05)'
    },
    tab: {
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      fontWeight: '600',
      fontSize: '0.95rem'
    },
    activeTab: {
      background: 'linear-gradient(90deg, #1e40af, #3b82f6)',
      color: 'white',
      boxShadow: '0 2px 10px rgba(30, 64, 175, 0.3)'
    },
    inactiveTab: {
      backgroundColor: 'transparent',
      color: '#94a3b8'
    },
    sortContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '2rem',
      backgroundColor: '#1e293b',
      padding: '1rem 1.5rem',
      borderRadius: '12px',
      border: '1px solid rgba(255, 255, 255, 0.05)'
    },
    sortLabel: {
      color: '#94a3b8',
      fontSize: '0.95rem',
      fontWeight: '500'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '2rem',
      paddingBottom: '2rem'
    },
    card: {
      backgroundColor: '#1e293b',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      zIndex: 1,
      border: '1px solid rgba(255, 255, 255, 0.05)'
    },
    cardImage: {
      height: '240px',
      overflow: 'hidden',
      position: 'relative'
    },
    cardImg: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.5s ease-out'
    },
    cardImgHover: {
      transform: 'scale(1.1)'
    },
    cardContent: {
      padding: '1.5rem',
      position: 'relative'
    },
    cardTitle: {
      margin: '0 0 0.5rem 0',
      fontSize: '1.3rem',
      fontWeight: '700',
      color: '#f8fafc',
      lineHeight: '1.3'
    },
    cardBrand: {
      margin: '0 0 0.75rem 0',
      fontSize: '0.9rem',
      color: '#7dd3fc',
      fontWeight: '500',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    cardPrice: {
      margin: '0.5rem 0 1rem 0',
      fontSize: '1.6rem',
      fontWeight: '700',
      color: '#38bdf8',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    },
    originalPrice: {
      fontSize: '1rem',
      color: '#94a3b8',
      textDecoration: 'line-through'
    },
    discountBadge: {
      backgroundColor: '#10b981',
      color: 'white',
      padding: '0.25rem 0.5rem',
      borderRadius: '4px',
      fontSize: '0.75rem',
      fontWeight: 'bold'
    },
    features: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem',
      margin: '1rem 0'
    },
    featureTag: {
      backgroundColor: 'rgba(30, 64, 175, 0.2)',
      color: '#bfdbfe',
      padding: '0.35rem 0.75rem',
      borderRadius: '20px',
      fontSize: '0.75rem',
      fontWeight: '500',
      border: '1px solid rgba(59, 130, 246, 0.3)'
    },
    buyButton: {
      background: 'linear-gradient(90deg, #1e40af, #3b82f6)',
      color: 'white',
      border: 'none',
      padding: '0.85rem',
      borderRadius: '8px',
      fontSize: '0.95rem',
      fontWeight: '600',
      cursor: 'pointer',
      width: '100%',
      marginTop: '1rem',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      boxShadow: '0 4px 15px rgba(30, 64, 175, 0.3)'
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(2, 6, 23, 0.95)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(8px)',
      padding: '1rem'
    },
    detailCard: {
      backgroundColor: '#1e293b',
      borderRadius: '20px',
      width: '100%',
      maxWidth: '900px',
      maxHeight: '90vh',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
      position: 'relative',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },
    closeButton: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      background: 'rgba(30, 41, 59, 0.8)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      fontSize: '1.5rem',
      cursor: 'pointer',
      color: '#94a3b8',
      padding: '0.5rem',
      borderRadius: '50%',
      transition: 'all 0.2s ease',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10
    },
    detailImage: {
      width: '100%',
      maxHeight: '400px',
      objectFit: 'cover',
      objectPosition: 'center'
    },
    detailContent: {
      padding: '2.5rem'
    },
    detailTitle: {
      margin: '0 0 0.5rem 0',
      fontSize: '2.2rem',
      fontWeight: '800',
      color: '#f8fafc',
      lineHeight: '1.2'
    },
    detailBrand: {
      margin: '0 0 1.5rem 0',
      fontSize: '1.1rem',
      color: '#7dd3fc',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    },
    detailPrice: {
      fontSize: '2rem',
      fontWeight: '800',
      color: '#38bdf8',
      margin: '1.5rem 0',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    detailDescription: {
      lineHeight: '1.8',
      marginBottom: '2rem',
      color: '#cbd5e1',
      fontSize: '1.05rem'
    },
    detailFeatures: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.75rem',
      marginBottom: '3rem'
    },
    detailFeature: {
      backgroundColor: 'rgba(30, 64, 175, 0.2)',
      color: '#bfdbfe',
      padding: '0.75rem 1.25rem',
      borderRadius: '8px',
      fontSize: '0.9rem',
      fontWeight: '500',
      border: '1px solid rgba(59, 130, 246, 0.3)'
    },
    checkoutButton: {
      background: 'linear-gradient(90deg, #1e40af, #3b82f6)',
      color: 'white',
      border: 'none',
      padding: '1.25rem',
      borderRadius: '12px',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      width: '100%',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.75rem',
      boxShadow: '0 4px 20px rgba(30, 64, 175, 0.4)'
    },
    noResults: {
      textAlign: 'center',
      gridColumn: '1 / -1',
      padding: '3rem',
      fontSize: '1.2rem',
      color: '#94a3b8'
    },
    badge: {
      position: 'absolute',
      top: '1rem',
      left: '1rem',
      backgroundColor: '#10b981',
      color: 'white',
      padding: '0.35rem 1rem',
      borderRadius: '20px',
      fontSize: '0.75rem',
      fontWeight: 'bold',
      zIndex: 2,
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
    },
    premiumBadge: {
      position: 'absolute',
      top: '1rem',
      left: '1rem',
      background: 'linear-gradient(90deg, #d97706, #f59e0b)',
      color: 'white',
      padding: '0.35rem 1rem',
      borderRadius: '20px',
      fontSize: '0.75rem',
      fontWeight: 'bold',
      zIndex: 2,
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
    },
    cartNotification: {
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      background: 'linear-gradient(90deg, #10b981, #34d399)',
      color: 'white',
      padding: '1.25rem 2rem',
      borderRadius: '12px',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
      zIndex: 1001,
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      fontSize: '1rem',
      fontWeight: '500'
    },
    colorSwatches: {
      display: 'flex',
      gap: '0.75rem',
      margin: '1.5rem 0'
    },
    colorSwatch: {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      cursor: 'pointer',
      border: '2px solid transparent',
      transition: 'all 0.2s ease',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
    },
    selectedSwatch: {
      borderColor: '#ffffff',
      transform: 'scale(1.15)',
      boxShadow: '0 0 0 3px rgba(255, 255, 255, 0.3)'
    },
    ratingContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      marginBottom: '0.75rem'
    },
    star: {
      color: '#f59e0b',
      fontSize: '1.1rem'
    },
    ratingText: {
      color: '#94a3b8',
      fontSize: '0.95rem',
      marginLeft: '0.5rem'
    },
    discountPill: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      backgroundColor: '#ef4444',
      color: 'white',
      padding: '0.25rem 0.75rem',
      borderRadius: '20px',
      fontSize: '0.75rem',
      fontWeight: 'bold',
      zIndex: 2
    },
    detailDiscount: {
      backgroundColor: '#ef4444',
      color: 'white',
      padding: '0.5rem 1rem',
      borderRadius: '6px',
      fontSize: '0.9rem',
      fontWeight: 'bold',
      marginLeft: '1rem'
    }
  };

  return (
    <div style={styles.app}>
            <Navbar/>

      {/* Enhanced Header Section */}
      <header style={styles.header}>
        <div style={styles.headerBgPattern}></div>
        <div style={styles.headerContent}>
          <motion.h1 
            style={styles.title}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Immerse Yourself <br/>In Perfect Sound
          </motion.h1>
          <motion.p 
            style={styles.subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Discover premium headphones engineered for audiophiles. Experience crystal-clear audio with our cutting-edge technology.
          </motion.p>
          
          <motion.img
            src="https://cdn.mos.cms.futurecdn.net/AW8oayRsDq8wg4iJi2zE8f.jpg"
            alt="Premium Headphones"
            style={styles.heroImage}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </header>
      
      <div style={styles.container}>
        {/* Updated Filter Section */}
        <motion.div 
          style={styles.filtersContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div style={styles.filtersGrid}>
            <div style={styles.searchBox}>
              <input
                type="text"
                placeholder="🔍 Search headphones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  ...styles.searchInput,
                  ...(searchTerm ? styles.searchInputFocus : {})
                }}
              />
            </div>
            
            <div style={styles.filterGroup}>
              <label style={styles.label}>Price Range: ${priceRange}</label>
              <input
                type="range"
                min="50"
                max="2000"
                step="50"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                style={styles.rangeInput}
              />
              <div style={styles.priceValue}>
                <span>$50</span>
                <span>$2000</span>
              </div>
            </div>
            
            <div style={styles.filterGroup}>
              {/* <label style={styles.label}>Brand</label> */}
              <select 
                value={brandFilter} 
                onChange={(e) => setBrandFilter(e.target.value)}
                style={{
                  ...styles.select,
                  ...(brandFilter !== 'all' ? styles.selectFocus : {})
                }}
              >
                <option value="all">All Brands</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Tabs Section */}
        <div style={styles.tabs}>
          <motion.div 
            style={{
              ...styles.tab,
              ...(activeTab === 'all' ? styles.activeTab : styles.inactiveTab)
            }}
            onClick={() => setActiveTab('all')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            All Products
          </motion.div>
          <motion.div 
            style={{
              ...styles.tab,
              ...(activeTab === 'premium' ? styles.activeTab : styles.inactiveTab)
            }}
            onClick={() => setActiveTab('premium')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Premium
          </motion.div>
          <motion.div 
            style={{
              ...styles.tab,
              ...(activeTab === 'budget' ? styles.activeTab : styles.inactiveTab)
            }}
            onClick={() => setActiveTab('budget')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Budget
          </motion.div>
        </div>

        {/* Sort Section */}
        {/* <div style={styles.sortContainer}>
          <span style={styles.sortLabel}>Sort by:</span>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              ...styles.select,
              flex: '0 1 200px'
            }}
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div> */}
        
        {/* Product Grid */}
        <div style={styles.grid}>
          {filteredHeadphones.length > 0 ? (
            filteredHeadphones.map((headphone, index) => (
              <motion.div
                key={headphone.id}
                style={styles.card}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                transition={{ delay: index * 0.05 }}
                onMouseEnter={() => setHoveredCard(headphone.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {headphone.price > 1000 ? (
                  <div style={styles.premiumBadge}>Premium</div>
                ) : (
                  <div style={styles.badge}>New</div>
                )}
                
                {headphone.discount > 0 && (
                  <div style={styles.discountPill}>{headphone.discount}% OFF</div>
                )}
                
                <div style={styles.cardImage}>
                  <img 
                    src={headphone.image} 
                    alt={headphone.name} 
                    style={{
                      ...styles.cardImg,
                      ...(hoveredCard === headphone.id ? styles.cardImgHover : {})
                    }}
                  />
                </div>
                <div style={styles.cardContent}>
                  <h3 style={styles.cardTitle}>{headphone.name}</h3>
                  <p style={styles.cardBrand}>{headphone.brand}</p>
                  
                  <div style={styles.ratingContainer}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} style={styles.star}>
                        {i < Math.floor(headphone.rating) ? '★' : '☆'}
                      </span>
                    ))}
                    <span style={styles.ratingText}>{headphone.rating}</span>
                  </div>
                  
                  <div style={styles.cardPrice}>
                    ${headphone.discount > 0 ? getDiscountedPrice(headphone.price, headphone.discount) : headphone.price}
                    {headphone.discount > 0 && (
                      <span style={styles.originalPrice}>${headphone.price}</span>
                    )}
                  </div>
                  
                  <div style={styles.features}>
                    {headphone.features.slice(0, 3).map((feature, index) => (
                      <span key={index} style={styles.featureTag}>{feature}</span>
                    ))}
                  </div>
                  <motion.button 
                    style={styles.buyButton}
                    whileHover={{ 
                      y: -2,
                      boxShadow: '0 6px 20px rgba(30, 64, 175, 0.4)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleBuyNow(headphone)}
                  >
                    <span>View Details</span>
                    <span>→</span>
                  </motion.button>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.p 
              style={styles.noResults}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No headphones match your search criteria. Try adjusting your filters.
            </motion.p>
          )}
        </div>

        {/* Product Detail Modal */}
        <AnimatePresence>
          {selectedHeadphone && (
            <motion.div
              style={styles.overlay}
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={handleCloseDetail}
            >
              <motion.div 
                style={styles.detailCard}
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.button 
                  style={styles.closeButton}
                  onClick={handleCloseDetail}
                  whileHover={{ 
                    backgroundColor: '#334155', 
                    color: '#f8fafc',
                    rotate: 90
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  ×
                </motion.button>
                <img 
                  src={selectedHeadphone.image} 
                  alt={selectedHeadphone.name} 
                  style={styles.detailImage}
                />
                <div style={styles.detailContent}>
                  <h2 style={styles.detailTitle}>{selectedHeadphone.name}</h2>
                  <p style={styles.detailBrand}>{selectedHeadphone.brand}</p>
                  
                  <div style={styles.ratingContainer}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} style={styles.star}>
                        {i < Math.floor(selectedHeadphone.rating) ? '★' : '☆'}
                      </span>
                    ))}
                    <span style={styles.ratingText}>({selectedHeadphone.rating}/5.0)</span>
                  </div>
                  
                  <div style={styles.detailPrice}>
                    ${getDiscountedPrice(selectedHeadphone.price, selectedHeadphone.discount)}
                    {selectedHeadphone.discount > 0 && (
                      <>
                        <span style={styles.originalPrice}>${selectedHeadphone.price}</span>
                        <span style={styles.detailDiscount}>{selectedHeadphone.discount}% OFF</span>
                      </>
                    )}
                  </div>
                  
                  <div style={styles.colorSwatches}>
                    {selectedHeadphone.colors.map((color, index) => (
                      <motion.div 
                        key={index}
                        style={{
                          ...styles.colorSwatch,
                          backgroundColor: color
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        initial={false}
                        animate={index === 0 ? styles.selectedSwatch : {}}
                      />
                    ))}
                  </div>
                  
                  <p style={styles.detailDescription}>{selectedHeadphone.description}</p>
                  <div style={styles.detailFeatures}>
                    {selectedHeadphone.features.map((feature, index) => (
                      <motion.span 
                        key={index} 
                        style={styles.detailFeature}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {feature}
                      </motion.span>
                    ))}
                  </div>
                  <motion.button 
                    style={styles.checkoutButton}
                    whileHover={{ 
                      y: -3,
                      boxShadow: '0 8px 25px rgba(30, 64, 175, 0.5)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      handleAddToCart(selectedHeadphone);
                      handleCloseDetail();
                    }}
                  >
                    <span>Add to Cart</span>
                    <span>→</span>
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cart Notification */}
        <AnimatePresence>
          {showCartNotification && (
            <motion.div
              style={styles.cartNotification}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: 'spring', damping: 25 }}
            >
              <span>✔</span>
              <span>Added to cart! ({cart.length} items)</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HeadphoneStore;