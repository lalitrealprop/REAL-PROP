import { useEffect, useRef } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { trackEvent } from '../lib/analytics';

const CRC_URL = 'https://realprop.online/projects/crc-the-peridona';
const CRC_TITLE = 'CRC The Peridona Greater Noida | Luxury 4 & 5 BHK Apartments | REAL PROP';
const CRC_DESCRIPTION = 'Explore CRC The Peridona at Jaypee Greens, Greater Noida — ultra-luxury 4, 4.5 & 5.5 BHK residences with golf course views, premium amenities and whole-floor privacy. Get project details, pricing and site visit assistance from REAL PROP.';
const CRC_BODY = `
<!--=========================================
        LUXURY PRELOADER
==========================================-->
<div id="preloader">

    <div class="loader-wrapper">

        <img
            src="/crc-the-peridona/images/logos/crc-logo.webp"
            alt="CRC Logo"
            class="loader-logo">

        <div class="loader-line"></div>

        <p>Crafting Luxury Living</p>

    </div>

</div>

<!--=========================================
        SUCCESS POPUP
==========================================-->

<div id="successPopup" class="success-popup">

    <div class="success-box">

        <div class="success-icon">
            <i class="fa-solid fa-circle-check"></i>
        </div>

        <h2>Thank You!</h2>

        <p>
            Thank you for your interest in CRC The Peridona.
        </p>

        <p class="small-text">
            Our Luxury Property Advisor will contact you shortly to schedule your exclusive site visit.
        </p>

        <button id="continueBrowsing" type="button">
            Continue Browsing
        </button>

    </div>

</div>

<!-- ===========================
        NAVBAR
=========================== -->

<header>

<nav class="navbar">

<div class="container">

<div class="logo">

<a href="#">

<img src="/crc-the-peridona/images/logos/crc-logo.webp" alt="CRC Peridona">

</a>

</div>

<ul class="nav-menu">

<li><a href="#overview">Overview</a></li>

<li><a href="#difference">Why Peridona</a></li>

<li><a href="#floorplans">Floor Plans</a></li>

<li><a href="#amenities">Amenities</a></li>

<li><a href="#location">Location</a></li>

</ul>

<div class="nav-btn">

<a href="/" class="realprop-home-link" aria-label="Go to REAL PROP Home">
    ← REAL PROP HOME
</a>

<a href="#contact">
    Book Site Visit
</a>

</div>

</div>

</nav>

</header>


<!-- ===========================
        HERO
=========================== -->

<section class="hero" id="overview">


<div class="hero-overlay"></div>

<div class="container hero-container">

<!-- LEFT CONTENT -->

<div class="hero-left">

    <div class="hero-badge">

        LIVE EXTRAORDINARY

    </div>

    <h1 class="hero-title">

    CRC THE <br>

    PERIDONA

</h1>

<p class="hero-subtitle">
    Ultra-Luxury 4 & 5 BHK Residences at Jaypee Greens, Greater Noida
</p>

    <h2 class="hero-subtitle">

        Crafted For The Exceptional

    </h2>

    <p class="hero-description">

        Experience ultra-luxury 4 & 5 BHK residences overlooking an 18-hole golf course inside the prestigious Jaypee Greens township, Greater Noida.

    </p>

    <div class="hero-price">

        <div>

            <span>STARTING FROM</span>

            <h3>₹14.85 Cr*</h3>

        </div>

        <div>

            <span>RESIDENCE SIZE</span>

            <h4>4950 – 7400 Sq.ft.</h4>

        </div>

    </div>

    <div class="hero-buttons">

    <a href="#contact" class="btn-primary">
        Schedule Site Visit
    </a>

    <a href="/crc-the-peridona/pdf/CRC-Peridona-Brochure.pdf"
       class="btn-outline"
       target="_blank">
        Download Brochure
    </a>

</div>

<div class="hero-cta-note">
    <i class="fas fa-shield-alt"></i>
    Private & Confidential • No Obligation
</div>

</div>

<!-- RIGHT FORM -->

<div class="hero-right" id="contact">

    <div class="lead-card">

        <h3>Request Private Preview</h3>

        <p>Exclusive presentation by appointment only.</p>

        <form id="leadForm">

            <input
                type="text"
                id="name"
                name="name"
                placeholder="Full Name"
                required>

            <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Phone Number"
                required>

            <input
                type="email"
                id="email"
                name="email"
                placeholder="Email Address">

            <select
                id="configuration"
                name="configuration"
                required>

                <option value="">Preferred Configuration</option>

                <option value="4 BHK">4 BHK</option>

                <option value="5 BHK">5 BHK</option>

                <option value="Penthouse">Penthouse</option>

            </select>

            <input
                type="date"
                id="visitDate"
                name="visitDate">

            <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Write your requirement..."></textarea>

            <button type="submit">
                Schedule My Visit
            </button>

        </form>

        <div class="privacy-text">

            <i class="fa-solid fa-shield-halved"></i>

            Your information remains completely confidential.

        </div>

    </div>

</div>

</div>

</section>
<!-- =======================================
        ULTRA LUXURY INFO STRIP
======================================== -->

<div class="hero-strip">

    <div class="strip-box">

        <h2>7</h2>

        <span>ICONIC</span>

        <p>TOWERS</p>

    </div>

    <div class="strip-line"></div>

    <div class="strip-box">

        <h2>341</h2>

        <span>EXCLUSIVE</span>

        <p>RESIDENCES</p>

    </div>

    <div class="strip-line"></div>

    <div class="strip-box">

        <h2>18</h2>

        <span>HOLE</span>

        <p>GOLF COURSE</p>

    </div>

    <div class="strip-line"></div>

    <div class="strip-box">

        <h2>2030</h2>

        <span>EXPECTED</span>

        <p>POSSESSION</p>

    </div>

</div>
<!--=========================================
        FLOATING CALL BUTTON
==========================================-->

<a href="tel:+919999882898"
   class="call-btn">

    <i class="fas fa-phone-alt"></i>

</a>

<!--=========================================
        FLOATING WHATSAPP BUTTON
==========================================-->

<a href="https://wa.me/919999882898?text=Hi%20I%20am%20interested%20in%20CRC%20The%20Peridona.%20Please%20share%20project%20details."
   class="whatsapp-btn"
   target="_blank">

    <img src="/crc-the-peridona/images/icons/whatsapp.webp" alt="WhatsApp">

</a>

<!-- JS -->






<!-- ==========================================
        DESIGNED BY THE WORLD'S FINEST
=========================================== -->

<section class="design-partners">

    <div class="container">

        <div class="section-heading">

            <span>GLOBAL DESIGN COLLABORATION</span>

            <h2>Designed By The World's Finest</h2>

            <p>
                Crafted by internationally acclaimed architects,
                designers and engineering consultants to create
                an iconic landmark in Greater Noida.
            </p>

        </div>

        <div class="partner-grid">

            <div class="partner-card">

                <img src="/crc-the-peridona/images/logos/killa.webp"
                     alt="Killa Design">

            </div>

            <div class="partner-card">

                <img src="/crc-the-peridona/images/logos/gensler.webp"
                     alt="Gensler">

            </div>

            <div class="partner-card">

                <img src="/crc-the-peridona/images/logos/rockwell.webp"
                     alt="Rockwell">

            </div>

            <div class="partner-card">

                <img src="/crc-the-peridona/images/logos/mace.webp"
                     alt="Mace">

            </div>

            <div class="partner-card">

                <img src="/crc-the-peridona/images/logos/museum.webp"
                     alt="Museum Of The Future">

            </div>

        </div>

    </div>

</section>
<!-- ======================================================
        LUXURY EXPERIENCE
======================================================= -->

<section class="luxury-experience" id="experience">

    <div class="container">

        <!-- SECTION HEADER -->

        <div class="experience-header">

            <span class="experience-tag">
                EXPERIENCE THE EXTRAORDINARY
            </span>

            <h2>
                Luxury Living at CRC The Peridona Greater Noida
            </h2>

            <div class="gold-divider"></div>

            <p>
                Every residence at CRC The Peridona is designed to deliver an extraordinary lifestyle where timeless architecture, curated experiences and world-class amenities come together to redefine luxury living.
            </p>

        </div>

        <!-- VIDEO + CONTENT -->

        <div class="experience-grid">

            <!-- VIDEO -->

            <div class="experience-video">

                <video autoplay muted loop playsinline controls preload="none" data-lazy-video>

                    <source data-src="/crc-the-peridona/videos/luxury-video.mp4" type="video/mp4">

                </video>

                <div class="video-gradient"></div>

            </div>

            <!-- CONTENT -->

            <div class="experience-panel">

                <span class="panel-subtitle">

                    LIVE MORE

                </span>

                <h3>

                    Designed To Inspire Every Moment

                </h3>

                <p>

                    Inspired by global luxury living, CRC The Peridona blends elegant architecture, expansive golf views and exceptional lifestyle experiences into one iconic address.

                </p>

                <div class="feature-box">

                    <span>01</span>

                    <div>

                        <h4>18-Hole Golf Course Views</h4>

                        <p>Wake up to uninterrupted panoramic golf landscapes.</p>

                    </div>

                </div>

                <div class="feature-box">

                    <span>02</span>

                    <div>

                        <h4>2.25 Lakh Sq.ft Clubhouse</h4>

                        <p>Exclusive leisure, wellness and entertainment spaces.</p>

                    </div>

                </div>

                <div class="feature-box">

                    <span>03</span>

                    <div>

                        <h4>Sky Deck & Infinity Pool</h4>

                        <p>Luxury experiences elevated above the city skyline.</p>

                    </div>

                </div>

                <div class="feature-box">

                    <span>04</span>

                    <div>

                        <h4>Fine Dining & Wellness</h4>

                        <p>Everyday living designed around comfort and elegance.</p>

                    </div>

                </div>

            </div>

        </div>

        <!-- QUOTE -->

        <div class="experience-quote">

            <span>

                LIVE. MORE.

            </span>

            <h3>

                "Luxury is not measured by what you own,
                but by what you experience every single day."

            </h3>

        </div>

    </div>

</section>
<!-- ==========================================
        WHY THE PERIDONA
========================================== -->

<section class="why-peridona" id="why">

    <div class="container">

        <div class="section-heading">

            <span>WHY THE PERIDONA</span>

            <h2>Why Choose CRC The Peridona in Greater Noida?</h2>

            <p>

                A landmark destination where luxury,
                privacy and architecture come together
                to create an extraordinary lifestyle.

            </p>

        </div>

        <div class="why-grid">

            <div class="why-card">

                <h3>452</h3>

                <span>Acres Township</span>

            </div>

            <div class="why-card">

                <h3>130</h3>

                <span>Acres Golf Course</span>

            </div>

            <div class="why-card">

                <h3>341</h3>

                <span>Luxury Residences</span>

            </div>

            <div class="why-card">

                <h3>7</h3>

                <span>Iconic Towers</span>

            </div>

            <div class="why-card">

                <h3>4950</h3>

                <span>Sq.ft Onwards</span>

            </div>

            <div class="why-card">

                <h3>1</h3>

                <span>Residence Per Floor</span>

            </div>

        </div>

        <div class="why-quote">

            <h3>

                "Not built for everyone.
                Designed for those who value
                privacy, prestige and perfection."

            </h3>

        </div>

    </div>

</section>
<!--=====================================
        THE PERIDONA EXPERIENCE
======================================-->

<section class="experience-story">

    <div class="container">

        <div class="story-header">

            <span>
                THE PERIDONA EXPERIENCE
            </span>

            <h2>

                Four Chapters.
                One Extraordinary Address.

            </h2>

            <p>

                Every space at CRC The Peridona has been thoughtfully
                curated to create an exceptional lifestyle where nature,
                architecture and luxury exist in perfect harmony.

            </p>

        </div>

    </div>

</section>
<!--======================================================
            CHAPTER 01
=======================================================-->

<section class="story-block">

    <div class="container">

        <div class="story-grid">

            <!-- LEFT -->

            <div class="story-content">

                <div class="chapter-number">

                    01

                </div>

                <span class="story-tag">

                    THE NEIGHBORHOOD

                </span>

                <h2>

                    Where Nature<br>
                    Meets Luxury

                </h2>

                <div class="gold-line"></div>

                <p>

                    Experience one of India's most exclusive golf
                    communities where lush greens, open landscapes
                    and timeless architecture create a lifestyle
                    unlike anywhere else.

                </p>

                <div class="story-features">

                    <div>

                        <h3>452</h3>

                        <span>Acres Township</span>

                    </div>

                    <div>

                        <h3>130</h3>

                        <span>Acres Golf Course</span>

                    </div>

                    <div>

                        <h3>60</h3>

                        <span>Nature Park</span>

                    </div>

                    <div>

                        <h3>25</h3>

                        <span>Years Green Cover</span>

                    </div>

                </div>

                <a href="#location" class="btn-primary">

                    Explore Location

                </a>

            </div>

            <!-- RIGHT -->

            <div class="story-image">

                <img

                src="/crc-the-peridona/images/banners/neighborhood.webp"

                alt="CRC The Peridona neighborhood at Jaypee Greens Greater Noida">

            </div>

        </div>

    </div>

</section>
<!--======================================================
            CHAPTER 02
=======================================================-->

<section class="story-block alternate">

    <div class="container">

        <div class="story-grid">

            <!-- IMAGE -->

            <div class="story-image">

                <img
                src="/crc-the-peridona/images/banners/residences.webp"
                alt="Luxury residences at CRC The Peridona Greater Noida">

            </div>

            <!-- CONTENT -->

            <div class="story-content">

                <div class="chapter-number">

                    02

                </div>

                <span class="story-tag">

                    THE RESIDENCES

                </span>

                <h2>

                    One Residence.<br>

                    One Entire Floor.

                </h2>

                <div class="gold-line"></div>

                <p>

                    Every residence has been designed to deliver complete
                    privacy with expansive layouts, panoramic golf views
                    and timeless architecture inspired by the world's
                    finest designers.

                </p>

                <div class="story-features">

                    <div>

                        <h3>341</h3>

                        <span>Luxury Residences</span>

                    </div>

                    <div>

                        <h3>7</h3>

                        <span>Iconic Towers</span>

                    </div>

                    <div>

                        <h3>43</h3>

                        <span>Floors High</span>

                    </div>

                    <div>

                        <h3>160m</h3>

                        <span>Tower Height</span>

                    </div>

                    <div>

                        <h3>4950+</h3>

                        <span>Sq.ft Onwards</span>

                    </div>

                    <div>

                        <h3>2</h3>

                        <span>Golf Side Views</span>

                    </div>

                </div>

                <a href="#floorplans" class="btn-primary">

                    View Floor Plans

                </a>

            </div>

        </div>

    </div>

</section>
<!--======================================================
            CHAPTER 03
=======================================================-->

<section class="story-block">

    <div class="container">

        <div class="story-grid">

            <!-- LEFT CONTENT -->

            <div class="story-content">

                <div class="chapter-number">

                    03

                </div>

                <span class="story-tag">

                    THE CLUB

                </span>

                <h2>

                    Where Every Day<br>

                    Feels Like A Celebration

                </h2>

                <div class="gold-line"></div>

                <p>

                    More than a clubhouse, this is a destination for
                    leisure, wellness, entertainment and meaningful
                    experiences designed around an extraordinary lifestyle.

                </p>

                <div class="club-grid">

                    <div class="club-item">
                        <h4>1.8 Lakh</h4>
                        <span>Sq.ft Clubhouse</span>
                    </div>

                    <div class="club-item">
                        <h4>03</h4>
                        <span>Theme Pools</span>
                    </div>

                    <div class="club-item">
                        <h4>02</h4>
                        <span>Cinema Theatres</span>
                    </div>

                    <div class="club-item">
                        <h4>01</h4>
                        <span>Jazz Club</span>
                    </div>

                    <div class="club-item">
                        <h4>01</h4>
                        <span>Bowling Alley</span>
                    </div>

                    <div class="club-item">
                        <h4>01</h4>
                        <span>Ice Rink</span>
                    </div>

                </div>

                <a href="#amenities" class="btn-primary">

                    Explore Amenities

                </a>

            </div>

            <!-- RIGHT IMAGE -->

            <div class="story-image">

                <img
                src="/crc-the-peridona/images/banners/club.webp"
                alt="Luxury clubhouse at CRC The Peridona Greater Noida">

            </div>

        </div>

    </div>

</section>
<!--======================================================
            CHAPTER 04
=======================================================-->

<section class="story-block alternate rooftop-section">

    <div class="container">

        <div class="story-grid">

            <!-- IMAGE -->

            <div class="story-image">

                <img src="/crc-the-peridona/images/banners/rooftop.webp"
                     alt="Luxury rooftop at CRC The Peridona Greater Noida">

            </div>

            <!-- CONTENT -->

            <div class="story-content">

                <div class="chapter-number">

                    04

                </div>

                <span class="story-tag">

                    THE ROOFTOP

                </span>

                <h2>

                    Above The City.<br>
                    Beyond Expectations.

                </h2>

                <div class="gold-line"></div>

                <p>

                    Experience life from an entirely new perspective where
                    panoramic skyline views, infinity-edge water features
                    and thoughtfully designed rooftop experiences create a
                    destination unlike anything in NCR.

                </p>

                <div class="rooftop-list">

                    <div class="roof-item">

                        <h4>Infinity Pool</h4>

                        <p>Relax with uninterrupted skyline views.</p>

                    </div>

                    <div class="roof-item">

                        <h4>Sky Lounge</h4>

                        <p>An elegant social space above the city.</p>

                    </div>

                    <div class="roof-item">

                        <h4>Observatory Deck</h4>

                        <p>Designed for breathtaking sunrise and sunset moments.</p>

                    </div>

                    <div class="roof-item">

                        <h4>Open Air Experiences</h4>

                        <p>Curated spaces for leisure, wellness and celebration.</p>

                    </div>

                </div>

                <a href="#gallery" class="btn-primary">

                    View Gallery

                </a>

            </div>

        </div>

    </div>

</section>
<!--=========================================================
                    WORLD CLASS AMENITIES
==========================================================-->

<section class="amenities-showcase" id="amenities">

    <div class="container">

        <!-- SECTION HEADING -->

        <div class="story-header">

            <span>WORLD CLASS AMENITIES</span>

            <h2>

                Crafted For<br>

                Extraordinary Living

            </h2>

            <p>

                Discover an exceptional collection of lifestyle spaces
                designed to inspire wellness, leisure, entertainment and
                unforgettable moments every single day.

            </p>

        </div>

        <!--===================================
                FEATURED GOLF IMAGE
        ====================================-->

        <div class="featured-amenity">

            <img src="/crc-the-peridona/images/amenities/golf.webp" alt="Golf Experience">

            <div class="featured-overlay">

                <span>SIGNATURE EXPERIENCE</span>

                <h2>

                    Live Beside One Of India's
                    Finest Golf Landscapes

                </h2>

                <p>

                    Wake up every morning to uninterrupted golf course
                    views surrounded by nature, open skies and timeless
                    luxury architecture.

                </p>

            </div>

        </div>

        <!--===================================
                GRID
        ====================================-->

        <div class="amenities-grid">

            <!-- CARD -->

            <div class="amenity-card large">

                <img
    src="/crc-the-peridona/images/amenities/sky-pool1.webp"
    alt="Luxury sky pool at CRC The Peridona Greater Noida">

                <div class="amenity-info">

                    <span>01</span>

                    <h3>Sky Pool</h3>

                    <p>

                        Infinity-edge swimming experience with
                        panoramic skyline views.

                    </p>

                </div>

            </div>

            <!-- CARD -->

            <div class="amenity-card">

                <img
    src="/crc-the-peridona/images/amenities/water-edge.webp"
    alt="Water edge luxury amenity at CRC The Peridona Greater Noida">

                <div class="amenity-info">

                    <span>02</span>

                    <h3>Water Edge</h3>

                    <p>

                        Elegant water experiences inspired by
                        world-class luxury resorts.

                    </p>

                </div>

            </div>

            <!-- CARD -->

            <div class="amenity-card">

                <img
    src="/crc-the-peridona/images/amenities/observatory-deck.webp"
    alt="Observatory deck at CRC The Peridona Greater Noida">

                <div class="amenity-info">

                    <span>03</span>

                    <h3>Observatory Deck</h3>

                    <p>

                        Capture breathtaking sunrise and
                        sunset moments above the skyline.

                    </p>

                </div>

            </div>

            <!-- CARD -->

            <div class="amenity-card large">

                <img
    src="/crc-the-peridona/images/amenities/jogging-track.webp"
    alt="Luxury jogging track at CRC The Peridona Greater Noida">

                <div class="amenity-info">

                    <span>04</span>

                    <h3>Jogging Track</h3>

                    <p>

                        Stay connected with nature while
                        embracing a healthier lifestyle.

                    </p>

                </div>

            </div>

            <!-- CARD -->

            <div class="amenity-card">

                <img
    src="/crc-the-peridona/images/amenities/banquet1.webp"
    alt="Luxury banquet space at CRC The Peridona Greater Noida">

                <div class="amenity-info">

                    <span>05</span>

                    <h3>Grand Banquet</h3>

                    <p>

                        Celebrate life's finest occasions
                        in elegant surroundings.

                    </p>

                </div>

            </div>

            <!-- CARD -->

            <div class="amenity-card">

                <img
    src="/crc-the-peridona/images/amenities/banquet2.webp"
    alt="Premium banquet area at CRC The Peridona Greater Noida">

                <div class="amenity-info">

                    <span>06</span>

                    <h3>Luxury Ballroom</h3>

                    <p>

                        Sophisticated spaces crafted for
                        unforgettable celebrations.

                    </p>

                </div>

            </div>

        </div>

        <!--===================================
                LUXURY QUOTE
        ====================================-->

        <div class="amenity-quote">

            <h2>

                Luxury isn't measured by
                square feet.

                It's measured by the
                experiences you live every day.

            </h2>

        </div>

    </div>

</section>
<!--=========================================================
                    INTERACTIVE FLOOR PLANS
==========================================================-->

<section class="floor-plans" id="floorplans">

    <div class="container">

        <!-- Section Heading -->

        <div class="story-header">

            <span>FLOOR PLANS</span>

            <h2>CRC The Peridona Floor Plans – Luxury 4 & 5 BHK Residences</h2>

            <p>
                Explore spacious 4 BHK, 4.5 BHK and 5.5 BHK residences at
    CRC The Peridona, Jaypee Greens, Greater Noida, designed with
    expansive layouts, private lift lobbies and breathtaking golf
    course views.
            </p>

        </div>

        <!-- Floor Tabs -->

        <div class="plan-tabs">

            <button class="plan-btn active" data-plan="plan1">
                4 BHK
            </button>

            <button class="plan-btn" data-plan="plan2">
                4.5 BHK
            </button>

            <button class="plan-btn" data-plan="plan3">
                5.5 BHK
            </button>

        </div>

        <!-- Main Layout -->

        <div class="floor-layout">

            <!-- LEFT -->

            <div class="floor-image">

                <img
                    id="planImage"
                    src="/crc-the-peridona/images/floorplans/4bhk.webp"
                    alt="CRC The Peridona 4 BHK floor plan">

            </div>

            <!-- RIGHT -->

            <div class="floor-content">

                <span class="plan-subtitle">
                    LUXURY CONFIGURATION
                </span>

                <h2 id="planTitle">
                    4 BHK Golf Residence
                </h2>

                <p id="planDesc">

                    A masterpiece crafted for families seeking expansive
                    living spaces, golf-facing balconies and complete
                    privacy.

                </p>

                <!-- Specifications -->

                <div class="plan-specifications">

                    <div class="spec-card">

                        <h3 id="planArea">
                            4950 Sq.ft
                        </h3>

                        <span>Super Area</span>

                    </div>

                    <div class="spec-card">

                        <h3 id="planBed">
                            4
                        </h3>

                        <span>Bedrooms</span>

                    </div>

                    <div class="spec-card">

                        <h3>
                            Golf
                        </h3>

                        <span>Facing</span>

                    </div>

                    <div class="spec-card">

                        <h3>
                            Premium
                        </h3>

                        <span>Category</span>

                    </div>

                </div>

                <!-- Luxury Features -->

                <ul class="plan-features">

                    <li>Private Lift Lobby</li>

                    <li>Large Golf Facing Balcony</li>

                    <li>Separate Utility Area</li>

                    <li>Powder Room</li>

                    <li>Staff Room</li>

                    <li>Walk-in Wardrobe</li>

                </ul>

                <!-- Buttons -->

                <div class="plan-buttons">

                    <a href="/crc-the-peridona/pdf/CRC-Peridona-Brochure.pdf"
                       target="_blank"
                       class="btn-primary">

                        Download Brochure

                    </a>

                    <a href="#contact"
                       class="btn-secondary">

                        Schedule Site Visit

                    </a>

                </div>

            </div>

        </div>

    </div>

</section>
<!--=========================================================
                LOCATION & CONNECTIVITY
==========================================================-->

<section class="location-section" id="location">

    <div class="container">

        <!-- Section Heading -->

        <div class="story-header">

            <span>LOCATION ADVANTAGE</span>

            <h2>
                CRC The Peridona Location at Jaypee Greens, Greater Noida<br>
                Yet Away From The Noise
            </h2>

           <p>

    Strategically located within Jaypee Greens, Greater Noida,
    CRC The Peridona offers effortless connectivity to business hubs,
    premium schools, hospitals, metro stations and major expressways.

</p>

        </div>

        <!-- Main Grid -->

        <div class="location-grid">

            <!-- LEFT IMAGE -->

            <div class="location-image">

                <img
                src="/crc-the-peridona/images/location/location-map.webp"
                alt="CRC The Peridona location map at Jaypee Greens Greater Noida">

            </div>

            <!-- RIGHT CONTENT -->

            <div class="location-content">

                <span class="location-subtitle">

                    PRIME CONNECTIVITY

                </span>

                <h3>

                    Everything You Need,
                    Just Minutes Away

                </h3>

                <!-- Timeline -->

                <div class="location-timeline">

                    <div class="timeline-item">

                        <div class="timeline-icon">

                            <img src="/crc-the-peridona/images/location/expressway.webp"
                                 alt="Noida-Greater Noida Expressway near CRC The Peridona">

                        </div>

                        <div class="timeline-text">

                            <h4>Noida-Greater Noida Expressway</h4>

                            <span>05 Minutes Drive</span>

                        </div>

                    </div>

                    <div class="timeline-item">

                        <div class="timeline-icon">

                            <img src="/crc-the-peridona/images/location/metro.webp"
                                 alt="Aqua Line Metro near CRC The Peridona Greater Noida">

                        </div>

                        <div class="timeline-text">

                            <h4>Aqua Line Metro Station</h4>

                            <span>05 Minutes Drive</span>

                        </div>

                    </div>

                    <div class="timeline-item">

                        <div class="timeline-icon">

                            <img src="/crc-the-peridona/images/location/hospital.webp"
                                 alt="Jaypee Hospital near CRC The Peridona">

                        </div>

                        <div class="timeline-text">

                            <h4>Jaypee Hospital</h4>

                            <span>10 Minutes Drive</span>

                        </div>

                    </div>

                    <div class="timeline-item">

                        <div class="timeline-icon">

                            <img src="/crc-the-peridona/images/location/school.webp"
                                 alt="International schools near CRC The Peridona Greater Noida">

                        </div>

                        <div class="timeline-text">

                            <h4>Leading International Schools</h4>

                            <span>10 Minutes Drive</span>

                        </div>

                    </div>

                    <div class="timeline-item">

                        <div class="timeline-icon">

                            <img src="/crc-the-peridona/images/location/airport.webp"
                                 alt="Jewar International Airport near CRC The Peridona">

                        </div>

                        <div class="timeline-text">

                            <h4>Jewar International Airport</h4>

                            <span>45 Minutes Drive</span>

                        </div>

                    </div>

                    <div class="timeline-item">

                        <div class="timeline-icon">

                            <img src="/crc-the-peridona/images/location/golf-course.webp"
                                 alt="18-hole golf course near CRC The Peridona">

                        </div>

                        <div class="timeline-text">

                            <h4>18 Hole Golf Course</h4>

                            <span>Walking Distance</span>

                        </div>

                    </div>

                </div>

                <!-- CTA -->

               <div class="location-buttons">

    <!-- BOOK SITE VISIT -->
    <a href="#contact" class="btn-primary">
        Book Site Visit
    </a>

<!-- VIEW LOCATION MAP -->
<a
    href="https://www.google.com/maps/place/CRC+The+Peridona/@28.4638413,77.5215968,17z/data=!3m1!4b1!4m6!3m5!1s0x390cc1d88fccfa51:0xb9f12a0ee0e5c0cd!8m2!3d28.4638366!4d77.5241717!16s%2Fg%2F11mdp6jyk7?entry=ttu"
    class="btn-secondary"
    target="_blank"
    rel="noopener noreferrer"
    onclick="window.open(this.href, '_blank'); return false;"
>
    View Location Map
</a>

</div>
                </div>

            </div>

        </div>

</section>
<!--=========================================================
                INVESTMENT HIGHLIGHTS
==========================================================-->

<section class="investment-section" id="investment">

    <div class="container">

        <div class="story-header">

            <span>WHY INVEST IN CRC THE PERIDONA</span>

            <h2>

                Why Invest in CRC The Peridona <br>
                A Timeless Investment.

            </h2>

            <p>

                Every aspect of CRC The Peridona has been thoughtfully
                planned to deliver long-term value, unmatched luxury
                and an extraordinary lifestyle within Jaypee Greens.

            </p>

        </div>

        <div class="investment-grid">

            <div class="investment-card">

                <div class="investment-number">01</div>

                <h3>Jaypee Greens Township</h3>

                <p>
                    One of NCR's most prestigious integrated townships
                    offering a premium living environment.
                </p>

            </div>

            <div class="investment-card">

                <div class="investment-number">02</div>

                <h3>18 Hole Golf Course</h3>

                <p>
                    Wake up every day to uninterrupted golf course
                    views and lush green surroundings.
                </p>

            </div>

            <div class="investment-card">

                <div class="investment-number">03</div>

                <h3>Low Density Development</h3>

                <p>
                    Spacious planning ensures privacy, exclusivity
                    and a peaceful luxury lifestyle.
                </p>

            </div>

            <div class="investment-card">

                <div class="investment-number">04</div>

                <h3>2.25 Lakh Sq.ft Clubhouse</h3>

                <p>
                    One of the largest luxury clubhouses designed
                    for wellness, recreation and entertainment.
                </p>

            </div>

            <div class="investment-card">

                <div class="investment-number">05</div>

                <h3>Prime Connectivity</h3>

                <p>
                    Seamless access to Noida Expressway, Aqua Metro,
                    Jewar Airport and Delhi NCR.
                </p>

            </div>

            <div class="investment-card">

                <div class="investment-number">06</div>

                <h3>Developed By CRC Group</h3>

                <p>
                    A trusted developer delivering premium residential
                    projects with exceptional quality.
                </p>

            </div>

        </div>

    </div>

</section>
<!--=========================================================
                LUXURY CONTACT CTA
==========================================================-->

<section class="contact-cta" id="contact-cta">

    <div class="cta-overlay"></div>

    <div class="container">

        <div class="cta-content">

            <span>

                PRIVATE PRESENTATION

            </span>

            <h2>

                Book a Site Visit at CRC The Peridona Greater Noida

            </h2>

            <p>

                Schedule your private presentation and discover
                one of Greater Noida's most prestigious luxury
                residences inside Jaypee Greens.

            </p>

            <div class="contact-info">

                <div class="contact-box">

                    <h4>Call Now</h4>

                    <a href="tel:+919999882898">

                        +91 99998 82898

                    </a>

                </div>

                <div class="contact-box">

                    <h4>Office Address</h4>

                    <p>

                        FF-12-A,
                        Sun Twilight Market,
                        Sector-27,
                        Jaypee Greens,
                        Greater Noida

                    </p>

                </div>

            </div>

            <div class="cta-buttons">

                <a href="tel:+919999882898"
                   class="btn-primary">

                    Book Site Visit

                </a>

                <a href="/crc-the-peridona/pdf/CRC-Peridona-Brochure.pdf"
                   target="_blank"
                   class="btn-secondary">

                    Download Brochure

                </a>

            </div>

        </div>

    </div>

</section>
<!--=========================================================
                    ULTRA LUXURY FOOTER
==========================================================-->

<footer class="luxury-footer">

    <div class="container">

        <div class="footer-grid">

            <!-- COLUMN 1 -->

            <div class="footer-column">

                <img
                src="/crc-the-peridona/images/logos/crc-logo.webp"
                alt="CRC The Peridona"
                class="footer-logo">

                <p>

                    CRC The Peridona is an ultra-luxury residential
                    landmark located in Jaypee Greens, Greater Noida,
                    crafted for those who seek timeless elegance,
                    world-class amenities and an extraordinary lifestyle.

                </p>

            </div>

            <!-- COLUMN 2 -->

            <div class="footer-column">

                <h3>Quick Links</h3>

                <ul>

                    <li><a href="#home">Home</a></li>

                    <li><a href="#experience">Experience</a></li>

                    <li><a href="#amenities">Amenities</a></li>

                    <li><a href="#floorplans">Floor Plans</a></li>

                    <li><a href="#location">Location</a></li>

                    <li><a href="#contact">Contact</a></li>

                </ul>

            </div>

            <!-- COLUMN 3 -->

            <div class="footer-column">

                <h3>Contact</h3>

                <p>

                    📞 +91 99998 82898

                </p>

                <p>

                    📍 FF-12-A, Sun Twilight Market,
                    Sector-27, Jaypee Greens,
                    Greater Noida

                </p>

                <p>

                    ✉ info@realprop.online

                </p>

            </div>

            <!-- COLUMN 4 -->

            <div class="footer-column">

                <h3>Project Highlights</h3>

                <ul>

                    <li>18 Hole Golf Course</li>

                    <li>2.25 Lakh Sq.ft Clubhouse</li>

                    <li>Low Density Living</li>

                    <li>Jaypee Greens Township</li>

                    <li>Prime Connectivity</li>

                    <li>Ultra Luxury Residences</li>

                </ul>

            </div>

        </div>

        <!-- GOLD LINE -->

        <div class="footer-divider"></div>

        <!-- COPYRIGHT -->

        <div class="footer-bottom">

            <p>

                © 2026 CRC The Peridona | Designed & Developed by
                <strong>Real Prop</strong>

            </p>

        </div>

    </div>

</footer>
`;
const CRC_SCHEMA = "{\n      \"@context\": \"https://schema.org\",\n      \"@graph\": [\n\n        {\n          \"@type\": \"WebSite\",\n          \"@id\": \"https://realprop.online/projects/crc-the-peridona#website\",\n          \"url\": \"https://realprop.online/projects/crc-the-peridona\",\n          \"name\": \"CRC The Peridona\",\n          \"description\": \"CRC The Peridona luxury residences at Jaypee Greens, Greater Noida.\",\n          \"inLanguage\": \"en-IN\"\n        },\n\n        {\n          \"@type\": \"WebPage\",\n          \"@id\": \"https://realprop.online/projects/crc-the-peridona#webpage\",\n          \"url\": \"https://realprop.online/projects/crc-the-peridona\",\n          \"name\": \"CRC The Peridona Greater Noida | Luxury 4 & 5 BHK Apartments\",\n          \"description\": \"Explore CRC The Peridona at Jaypee Greens, Greater Noida \u2014 ultra-luxury 4, 4.5 & 5.5 BHK residences with golf course views and premium amenities.\",\n          \"isPartOf\": {\n            \"@id\": \"https://realprop.online/projects/crc-the-peridona#website\"\n          },\n          \"about\": {\n            \"@type\": \"Residence\",\n            \"name\": \"CRC The Peridona\",\n            \"address\": {\n              \"@type\": \"PostalAddress\",\n              \"addressLocality\": \"Greater Noida\",\n              \"addressRegion\": \"Uttar Pradesh\",\n              \"addressCountry\": \"IN\"\n            }\n          },\n          \"inLanguage\": \"en-IN\"\n        },\n\n        {\n          \"@type\": \"BreadcrumbList\",\n          \"@id\": \"https://realprop.online/projects/crc-the-peridona#breadcrumb\",\n          \"itemListElement\": [\n            {\n              \"@type\": \"ListItem\",\n              \"position\": 1,\n              \"name\": \"Home\",\n              \"item\": \"https://realprop.online/projects/crc-the-peridona\"\n            },\n            {\n              \"@type\": \"ListItem\",\n              \"position\": 2,\n              \"name\": \"CRC The Peridona\",\n              \"item\": \"https://realprop.online/projects/crc-the-peridona\"\n            }\n          ]\n        }\n\n      ]\n    }";

declare global {
  interface Window {
    __realPropSubmitCRCLead?: (lead: {
      project: string;
      name: string;
      phone: string;
      email: string;
      propertyType: string;
      visitDate: string;
      message: string;
    }) => Promise<void>;
    __realPropTrackCRCEvent?: (name: string, params?: Record<string, string | number | boolean>) => void;
  }
}

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attribute, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
}

export default function CRCThePeridona() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = CRC_TITLE;
    upsertMeta('name', 'description', CRC_DESCRIPTION);
    upsertMeta('name', 'robots', 'index, follow');
    upsertMeta('name', 'theme-color', '#050816');
    upsertMeta('property', 'og:title', CRC_TITLE);
    upsertMeta('property', 'og:description', CRC_DESCRIPTION);
    upsertMeta('property', 'og:url', CRC_URL);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', 'REAL PROP');
    upsertMeta('property', 'og:image', 'https://realprop.online/crc-the-peridona/images/hero/hero-bg.webp');
    upsertMeta('property', 'og:image:alt', 'CRC The Peridona luxury residences at Jaypee Greens Greater Noida');
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', CRC_TITLE);
    upsertMeta('name', 'twitter:description', CRC_DESCRIPTION);
    upsertMeta('name', 'twitter:image', 'https://realprop.online/crc-the-peridona/images/hero/hero-bg.webp');
    upsertCanonical(CRC_URL);


    const homeButtonStyle = document.createElement('style');
    homeButtonStyle.id = 'crc-realprop-home-button-style';
    homeButtonStyle.textContent = `
      .crc-peridona-root .realprop-home-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        margin-right: 12px;
        padding: 10px 16px;
        border: 1px solid rgba(212, 175, 55, 0.65);
        border-radius: 999px;
        color: #d4af37;
        background: rgba(5, 8, 22, 0.55);
        text-decoration: none;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.5px;
        white-space: nowrap;
        transition: all 0.25s ease;
      }
      .crc-peridona-root .realprop-home-link:hover {
        color: #050816;
        background: #d4af37;
        border-color: #d4af37;
      }
      @media (max-width: 992px) {
        .crc-peridona-root .realprop-home-link {
          padding: 8px 12px;
          font-size: 11px;
          margin-right: 8px;
        }
      }
      @media (max-width: 767px) {
        .crc-peridona-root .nav-btn .realprop-home-link {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 1002;
          padding: 7px 10px;
          font-size: 9px;
          letter-spacing: 0.25px;
          margin: 0;
        }
      }
    `;
    document.head.appendChild(homeButtonStyle);

    const links: HTMLLinkElement[] = [];
    const addStylesheet = (href: string, id: string) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.id = id;
      document.head.appendChild(link);
      links.push(link);
    };
    addStylesheet('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap', 'crc-google-fonts');
    addStylesheet('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css', 'crc-font-awesome');
    addStylesheet('/crc-the-peridona/style.css', 'crc-project-style');

    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.id = 'crc-project-schema';
    schemaScript.textContent = CRC_SCHEMA;
    document.head.appendChild(schemaScript);

    window.__realPropSubmitCRCLead = async (lead) => {
      if (!lead.name || !lead.phone) throw new Error('Name and phone are required.');
      await addDoc(collection(db, 'leads'), {
        project: 'CRC The Peridona',
        propertyInterest: 'CRC The Peridona',
        propertyType: lead.propertyType || 'General',
        name: lead.name,
        phone: lead.phone,
        email: lead.email || '',
        budget: lead.propertyType || 'Price enquiry',
        location: 'Jaypee Greens, Greater Noida',
        visitDate: lead.visitDate || '',
        message: lead.message || 'CRC The Peridona enquiry',
        createdAt: serverTimestamp(),
      });
            if (typeof window !== 'undefined' && typeof (window as any).fbq === 'function') {
        (window as any).fbq('track', 'Lead', {
          content_name: 'CRC The Peridona',
          content_category: 'Real Estate Lead',
        });
      }
    };
    window.__realPropTrackCRCEvent = (name, params = {}) => trackEvent(name, { project_name: 'CRC The Peridona', project_slug: 'crc-the-peridona', ...params });

    if (rootRef.current) {
      // Always start a fresh project-route visit at the top of the approved CRC page.
      // This also prevents the browser from restoring a previous scroll position
      // that can make the chapter sections appear to be missing.
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      rootRef.current.innerHTML = CRC_BODY;

      // Preload all critical above/below-fold CRC images and make their sizing
      // explicit so SPA-injected markup behaves exactly like the standalone site.
      const criticalImages = [
        '/crc-the-peridona/images/banners/neighborhood.webp',
        '/crc-the-peridona/images/banners/residences.webp',
        '/crc-the-peridona/images/banners/club.webp',
        '/crc-the-peridona/images/banners/rooftop.webp',
        '/crc-the-peridona/images/amenities/golf.webp',
        '/crc-the-peridona/images/amenities/sky-pool1.webp',
        '/crc-the-peridona/images/amenities/water-edge.webp',
        '/crc-the-peridona/images/amenities/observatory-deck.webp',
        '/crc-the-peridona/images/amenities/jogging-track.webp',
        '/crc-the-peridona/images/amenities/banquet1.webp',
        '/crc-the-peridona/images/amenities/banquet2.webp',
      ];
      criticalImages.forEach((src) => {
        const preload = new Image();
        preload.src = src;
      });
      rootRef.current.querySelectorAll<HTMLImageElement>('.story-image img, .featured-amenity img, .amenity-card img').forEach((img) => {
        img.loading = 'eager';
        img.decoding = 'async';
        img.style.display = 'block';
        img.style.visibility = 'visible';
      });
      const script = document.createElement('script');
      script.src = '/crc-the-peridona/script.js';
      script.async = false;
      rootRef.current.appendChild(script);
    }

    const clickHandler = (event: Event) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest('a') as HTMLAnchorElement | null;
      if (!link) return;
      const href = link.getAttribute('href') || '';
      if (href.startsWith('tel:')) trackEvent('call_clicked', { project_name: 'CRC The Peridona', project_slug: 'crc-the-peridona' });
      if (href.startsWith('https://wa.me/')) trackEvent('whatsapp_clicked', { project_name: 'CRC The Peridona', project_slug: 'crc-the-peridona' });
    };
    rootRef.current?.addEventListener('click', clickHandler);
    trackEvent('project_view', { project_name: 'CRC The Peridona', project_slug: 'crc-the-peridona' });

    return () => {
      rootRef.current?.removeEventListener('click', clickHandler);
      if (rootRef.current) rootRef.current.innerHTML = '';
      links.forEach(link => link.remove());
      homeButtonStyle.remove();
      schemaScript.remove();
      delete window.__realPropSubmitCRCLead;
      delete window.__realPropTrackCRCEvent;
      document.title = 'REAL PROP';
    };
  }, []);

  return <div ref={rootRef} className="crc-peridona-root" />;
}
