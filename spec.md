# Anshika Udhyog Group

## Current State
A comprehensive React + Motoko web app for ANSHIKA UDHYOG GROUP NGO/Business platform with:
- Landing page with hero slider, about, services, activities, events, contact
- Admin Dashboard with 18 sections, mobile horizontal scroll tabs
- User Dashboard with KYC/payment gating
- ID Card Designer (12 designs, PVC card)
- Official Letter Generator (12 designs)
- Signup page with basic details
- Footer with saffron/orange background, WhatsApp button
- PWA install support
- Hamburger menu with category-wise links

## Requested Changes (Diff)

### Add
- **ID Card**: Profile photo on LEFT side; name/address/designation/ID number font size bigger; seal+signature size bigger and better positioned
- **Letter/Certificate**: Seal+signature upload option on letter/certificate; PDF download button after issue; real professional format
- **Signup Page**: KYC documents upload fields (Aadhaar front/back, PAN card, photo, address proof)
- **New Pages**: Shopping, Utilities, Policy, Shipping, Internship, Vacancy, Multi-Income Plan (with roadmap, blueprint, photo, video, loop animation), Franchise, Job listings, Job Description page, Job Offer popup, Ads banner, E-commerce (product catalog, cart, orders)
- **Admin Dashboard**: Management sections for all new pages (edit, delete, update, upload, animations); Access Code change option for each member; full profile edit/update/upload/approve/reject
- **PWA Icon**: New round AUG logo as PWA/APK install icon (192x192 and 512x512)
- **Mobile Landing Page**: Fix overflow/horizontal scroll issues on mobile; ensure hero fits properly

### Modify
- ID Card Designer: Left-side profile photo layout, larger text for all fields, bigger seal/signature
- OfficialLetterGenerator: Add PDF download button, seal/signature upload integrated into generated letter real format
- SignupPage: Add KYC document upload section
- AdminDashboard: Add new module tabs, access code management per member
- manifest.json: Update icons to new round AUG logo
- App.tsx: Add routing for new pages (shopping, utilities, policy, shipping, internship, vacancy, income-plan, franchise, jobs, ecommerce)

### Remove
- Nothing removed

## Implementation Plan
1. Generate new round PWA icon (192x192 + 512x512), update manifest.json
2. Fix ID Card Designer - left photo layout, bigger text, bigger seal/signature
3. Enhance Letter Generator - PDF download, real letterhead format with seal on letter
4. Update SignupPage - add KYC document upload fields
5. Fix mobile landing page overflow/fit issues (especially hero section)
6. Add new pages: Shopping, Utilities, Policy, Shipping, Internship, Vacancy, Multi-Income Plan, Franchise, Jobs, E-commerce
7. Update AdminDashboard with new module management tabs + access code change per member + full member profile edit
8. Update App.tsx with routes for new pages
9. Validate and deploy
