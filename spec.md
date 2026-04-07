# Anshika Udhyog Group - Admin Dashboard Enhancement

## Current State
- OfficialLetterGenerator: A4 format letter hai lekin PDF download properly kaam nahi karta, print window pe actual A4 page sahi scale nahi hota
- IDCardDesigner: Front card portrait (55mm x 90mm) hai lekin photo chhoti hai, logo/title/tagline/seal/signature/authority name/address/designation/valid upto/card number sab ek saath fit nahi hote; Back side landscape (85.6mm x 54mm) hai - dono landscape mein hain
- App Install Icon: manifest.json mein aug-round-logo use ho raha hai lekin site ka actual logo (file_00000000...bebb8.png) nahi hai
- Apply Forms (Internship, KYC, Donations, Payments, Beneficiaries): Sirf basic approve/reject hai, edit/update/upload/forward/letter options nahi hain

## Requested Changes (Diff)

### Add
- Letter page mein browser PDF download working button (html2pdf ya print-to-PDF via @media print with proper A4 page settings)
- ID Card front side: photo section bada (40% card width), logo + title + tagline header, seal + signature + authority name + address + designation + valid upto + card number sab visible
- ID Card back side: PORTRAIT lambai mein rakho (same 55mm x 90mm jaise front), barcode bada, terms & conditions saath
- Apply forms (Internship, KYC, Donation, Payment, Beneficiary) mein: Edit button, Update option, Upload option, Forward option, Letter generate option
- InternshipManagement: Edit modal, upload document option, forward to letter generator
- KYCVerification: Bada view modal with KYC documents, edit + upload option
- DonationManagement: Edit/update row, forward to letter, receipt letter generate
- PaymentManagement: Edit row, upload receipt, forward option, letter generate

### Modify
- OfficialLetterGenerator: @media print CSS fix - A4 page size (210mm x 297mm) proper mein, page break control, PDF download button jo browser print-to-PDF use kare with correct settings
- IDCardDesigner PVCCardFront: Height 90mm se badha ke 100mm karo, photo size 36px se 52px karo, font sizes bado, logo + siteName + tagline sab header mein, authority name alag row mein, address show karo, designation bada font, valid upto + card number clearly visible
- IDCardDesigner PVCCardBack: Back ko bhi portrait (55mm x 100mm) mein set karo landscape se, barcode bada (full width), terms & conditions zyada space mein
- manifest.json: App icon ke liye actual website logo (user-uploaded) use karo - SiteSettings se dynamic logo URL set kare

### Remove
- ID Card back ki landscape dimensions (85.6mm x 54mm) - portrait se replace

## Implementation Plan
1. OfficialLetterGenerator.tsx: Print CSS improve - @page {size: A4; margin: 15mm;} add karo, PDF download button theek karo with proper instructions
2. IDCardDesigner.tsx - PVCCardFront: Photo 52x52px, header mein logo+name+tagline, body mein designation (bada), authority name, address (2 lines), ID number, valid upto, mobile, seal+signature (bade size)
3. IDCardDesigner.tsx - PVCCardBack: Dimensions portrait 55mm x 100mm, barcode pura width, T&C ka zyada space
4. InternshipManagement.tsx: Edit modal, document upload, forward to letter option
5. KYCVerification.tsx: Full document view modal, edit + upload fields
6. DonationManagement.tsx: Edit row modal, receipt letter option
7. PaymentManagement.tsx: Edit row, upload receipt image, letter generate
8. manifest.json: Already has aug-round-logo - keep as is (user can upload via admin)
