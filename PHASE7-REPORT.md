# REAL PROP — Phase 7 Implementation Report

## Completed in this V5-based build

- Production SEO metadata for `/projects/svg-central-square`
- Canonical URL
- Robots metadata
- Open Graph title/description/URL/image/type/site name
- Twitter/X card metadata
- Theme-color metadata
- Existing single H1 and logical H2/H3 hierarchy preserved; no visual redesign
- JSON-LD Organization schema for REAL PROP
- JSON-LD WebSite schema
- JSON-LD BreadcrumbList: Home > Projects > SVG Central Square
- JSON-LD Place information using only verified project information present in the V5 source
- No RERA/developer/address/rating/review/possession/availability data invented
- No FAQ added because the V5 page has no existing visible FAQ component; hidden FAQ/schema was not introduced
- Lightweight GA4 integration using `VITE_GA_MEASUREMENT_ID`
- `project_view`
- `calculator_used`
- `floor_selected`
- `floor_plan_viewed`
- `enquiry_form_opened`
- `enquiry_form_started`
- `lead_submitted` only after successful Firebase `addDoc`
- `whatsapp_clicked`
- `call_clicked`
- `payment_plan_viewed`
- `unit_selected` helper included for future use, but not fired because the V5 UI does not contain a real unit selector
- `gallery_opened` helper included, but not fired because the V5 gallery has no lightbox/open interaction
- No customer name, phone, email or personal message is sent to GA4

## Firebase safety

The existing Firestore `leads` collection and lead-write payloads were preserved. No Firestore rules or Firebase structure were changed.

## Validation

`npm run build` was attempted, but the supplied V5 archive did not contain a usable installed dependency tree. The environment could not download/install the npm dependencies within the execution window, so Vite was unavailable (`vite: not found`).

Global TypeScript syntax checking was also attempted. The reported errors are dependency/type-resolution errors caused by the unavailable `node_modules` packages (React, Firebase, Vite, etc.), not newly surfaced application syntax errors. `src/vite-env.d.ts` was added for the standard Vite `import.meta.env` typing.

After extracting the project locally, run:

```bash
npm ci
npm run build
```

Then set your real GA4 Measurement ID in `.env`:

```env
VITE_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
```

## Scope

Phase 7 only. Phase 8/mobile optimization and unrelated redesign work were not performed.
