
Bulk Market — Create React App (ready-to-upload)
-----------------------------------------------

What this is:
- A Create React App project using Tailwind for styling.
- Bilingual (English / Spanish) toggle.
- 'Request Quote' buttons use email: akwakovsky@gmail.com
- Minimalist About text included and fully editable.

Quick 3-step guide to make it live:
1) Create a new GitHub repository (https://github.com/new) named e.g. 'bulk-market'.
2) Upload all files from this folder to the repository root (use GitHub Desktop or drag files).
3) Deploy on Vercel:
   - Go to https://vercel.com, sign in, click 'Add New Project' -> Import Git Repository -> choose your repo -> Deploy.
   - Vercel will auto-detect Create React App and run the build.

Editing content later:
- Products and text are in: src/data/products.js and src/App.jsx
- The website name and contact email are in src/App.jsx
- Change text, save, push to GitHub, and Vercel will redeploy automatically.

To run locally (optional):
- npm install
- npm start

