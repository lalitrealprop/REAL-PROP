# REAL PROP + CRC The Peridona — Live Master Integration

Reference: https://www.thecrcperidona.co.in/
Target route: /projects/crc-the-peridona

The CRC project page is integrated as a standalone route inside REAL PROP while preserving the live CRC page structure, content, imagery, and project styling.

Sections verified against the live page:
- Hero / Request Private Preview
- Global Design Collaboration
- Luxury Living / Designed To Inspire Every Moment
- Why Choose CRC The Peridona
- Four Chapters
  01 The Neighborhood
  02 The Residences
  03 The Club
  04 The Rooftop
- World Class Amenities
- Floor Plans
- Location Advantage / Prime Connectivity
- Why Invest in CRC The Peridona
- Private Presentation / Contact
- Footer

Integration additions:
- REAL PROP route
- Firebase lead capture into existing leads collection
- GA4 project_view / lead_submitted / call_clicked / whatsapp_clicked events
- REAL PROP Projects listing + navigation
- Existing REAL PROP admin remains intact

Important rendering fix:
- Primary CRC sections are protected from disappearing when the legacy scroll-reveal script is dynamically injected by React.
- All four chapter blocks remain visible even if IntersectionObserver initialization is delayed.
