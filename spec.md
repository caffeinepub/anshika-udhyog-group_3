# Anshika Udhyog Group — Comprehensive Dashboard Upgrade

## Current State
- SignupPage: collects name, email, phone, address, city, pincode, membership plan. No KYC document upload.
- UserDashboard: 10 sections (overview, profile, membership, idcard, certificates, payments, internship, kyc, bank, notifications). No step-gated flow — dashboard opens directly after login.
- AdminDashboard: 19 sections. Access Code Management exists. No member profile view in access code section. No forward letter option.
- Types: LocalMember has basic fields. No KYC document fields, no team/upline/downline, no letters/work orders, no salary/attendance/reports.

## Requested Changes (Diff)

### Add
- **Signup KYC Step**: Aadhaar photo upload, PAN photo upload, photo upload, father's name, DOB, gender fields on signup form
- **Login Step-Gate Flow**: After login, check kycStatus. If pending → show KYC upload page first. After KYC submitted, show Payment Details page (screenshot upload + UTR number). Only after payment verified → open full dashboard
- **Blue Verification Tick**: Show on profile photo and name when kycStatus === 'approved'
- **Designation-based Access**: Different badge colors/icons per designation level
- **User Dashboard New Sections**:
  - Multiple Income Plan (with animated cards, roadmap)
  - Utilities Service page
  - Shopping Service page
  - Meeting Page (submit meeting report)
  - Training Page
  - Upline & Down Team (tree view)
  - Letters (from admin forward letters + joining letter)
  - Work Orders
  - Monthly Report submit
  - Salary Card / Slip show
  - Attendance Submit (camera face capture + location)
  - Promotion Card display
  - SHG Login/Story page
- **Public Pages with Login Gate**: ERP, CRM, E-Commerce, Utilities, Shipping, Training, Internship, T&C, Policy, Branches, Attendance pages — all require login before showing content
- **Admin: Access Code Change**: In AccessCodeManagement, add profile view modal for each member + change access code button
- **Admin: Forward Letter**: In OfficialLetterGenerator, add forward-to-member option
- **Admin: Income Plan Full Page**: Roadmap, blueprint, slideshow with auto-play animation, photo/video embed
- **Admin: SHG Management**: SHG login, SHG story sections
- **Admin: New Sections**: Helping Hands, Complaint Management, Emergency Help, Production Plan, Transport Service Roadmap, Shopping Service Roadmap, Product Layout/Benefits/Feedback
- **Types Update**: Add kycDocAadhaar, kycDocPan, kycDocPhoto, fatherName, dob, gender, uplineId, paymentScreenshot, paymentUTR, paymentVerified fields to LocalMember
- **Letter types**: AdminLetter interface (id, title, content, forwardedTo[], date, type)
- **WorkOrder interface**, **AttendanceRecord interface**, **SalaryRecord interface**, **MeetingReport interface**, **MonthlyReport interface**

### Modify
- **SignupPage**: Add KYC document section with file upload fields (Aadhaar, PAN, photo, father's name, DOB, gender)
- **UserDashboard**: Add step-gated login flow. Expand nav with all new sections. Add designation badge + verification tick in header.
- **AdminDashboard**: Add profile view in access code section. Add forward letter option in letter generator. Add new sections for SHG, Helping Hands, Complaints, Emergency, Production, Roadmaps.
- **App.tsx**: Add public pages (ERP, CRM, etc.) with login-required gate
- **types/index.ts**: Extend LocalMember, add new interfaces

### Remove
- Nothing removed

## Implementation Plan
1. Update `types/index.ts` — extend LocalMember, add AdminLetter, WorkOrder, AttendanceRecord, SalaryRecord, MeetingReport, MonthlyReport interfaces
2. Update `SignupPage.tsx` — add KYC documents section (Aadhaar upload, PAN upload, photo, father's name, DOB, gender)
3. Update `UserDashboard.tsx` — add step-gated flow (KYC screen → Payment screen → main dashboard), new nav sections, designation badge, verification tick
4. Create new dashboard section components: MultipleIncomePage, UtilitiesPage, ShoppingPage, MeetingPage, TrainingPage, TeamPage, LettersPage, WorkOrderPage, AttendancePage, SalaryCardPage, MonthlyReportPage
5. Update `AdminDashboard.tsx` — add profile view in AccessCodeManagement, forward letter, new admin sections
6. Create new admin section components: HelpingHandsManagement, ComplaintManagement, EmergencyHelpManagement, SHGManagement, ProductionPlanManagement, RoadmapManagement
7. Add public pages with login gate in App.tsx: ERPPage, CRMPage, ECommercePage, ShippingPage, BranchesPage, T&CPage, PolicyPage
8. Update hooks/useDataStore for new data types
9. Validate + deploy
