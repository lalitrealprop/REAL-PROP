# REAL PROP — CRC The Peridona Integration

Route:
https://realprop.online/projects/crc-the-peridona

What was integrated:
- CRC The Peridona original HTML/CSS/JS visual structure preserved.
- CRC assets copied to public/crc-the-peridona/.
- CRC page added to React Router.
- REAL PROP global Navbar/Footer/FloatingButtons are intentionally not rendered on the CRC route so the CRC page keeps its original design.
- CRC appears in the REAL PROP Projects dropdown and homepage Projects section.
- CRC lead form now saves to the existing REAL PROP Firestore `leads` collection instead of the old Google Apps Script endpoint.
- CRC leads include project, propertyInterest, propertyType/configuration, name, phone, email, visitDate, budget, location, message, createdAt.
- CRC page emits GA4 events for project_view, lead_submitted, call_clicked and whatsapp_clicked using the existing REAL PROP analytics setup.
- CRC canonical/OG/Twitter metadata is changed from the old standalone domain to the REAL PROP CRC route.
- Original CRC pricing/content/layout/assets were not intentionally redesigned.

Local commands:
npm install
npm run build
npm run dev

Then test:
http://localhost:3000/projects/crc-the-peridona

Git deploy:
git add .
git commit -m "feat: integrate CRC The Peridona project"
git push

Vercel is already configured with SPA rewrites, so the route should resolve in production.


FIX: CRC page body now uses the complete original <body> through the final </body>, preserving all 14 sections. All image/PDF/video references are absolute under /crc-the-peridona, and the contact background CSS path is corrected.


FIX: React CRC fragment now removes the accidental early </body></html> and original script tag, while preserving all original sections; asset paths are absolute and contact background CSS path is corrected.
