# 💰 Loan & Debt Tracker

A secure, real-time web application to track loans and debts across multiple users. Built with React, Tailwind CSS, and Firebase for seamless online collaboration.

## ✨ Features

- **Multiple User Profiles**: Create and manage loan profiles for different people
- **Real-Time Sync**: All data is synced in real-time using Firebase Realtime Database
- **Smart Sorting**: 
  - Loans sorted by due date (soonest first)
  - Favorite loans pinned to the top
- **Secure Deletion**: PIN-protected loan deletion prevents accidental removal
- **Total Debt Tracking**: View your complete debt balance at a glance
- **Overdue Alerts**: Visual indicators for overdue loans
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Easy Deployment**: Deploy for free on Vercel, Netlify, or Render

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- A Firebase project (free tier available)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/domceomce123/loan-debt-tracker.git
   cd loan-debt-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project (or use existing)
   - Create a Realtime Database in test mode (or configure rules later)
   - Get your Firebase config:
     - Go to Project Settings → Service Accounts → Database Secrets
     - Copy your database URL
   - In your project root, copy `.env.example` to `.env.local`:
     ```bash
     cp .env.example .env.local
     ```
   - Fill in your Firebase credentials in `.env.local`:
     ```
     REACT_APP_FIREBASE_API_KEY=your_api_key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
     REACT_APP_FIREBASE_DATABASE_URL=https://your-project-default-rtdb.firebaseio.com
     REACT_APP_FIREBASE_PROJECT_ID=your-project-id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
     REACT_APP_FIREBASE_APP_ID=1:123456789:web:abc123
     ```

4. **Start the development server**
   ```bash
   npm start
   ```
   The app will open at http://localhost:3000

## 📦 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 🌐 Deployment Guide

### Option 1: Deploy to Vercel (Recommended - Fastest)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```
   - Follow the prompts
   - Link to your GitHub repository (optional but recommended)
   - When asked about environment variables, add your Firebase credentials

3. **Add Environment Variables**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add all variables from your `.env.local` file
   - Redeploy

4. **Access Your App**
   - Your app will be live at a URL like `https://loan-debt-tracker.vercel.app`
   - Share this URL with anyone you want to access the tracker

### Option 2: Deploy to Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Connect to Netlify**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Select your GitHub repository
   - Set Build Command: `npm run build`
   - Set Publish Directory: `build`

3. **Add Environment Variables**
   - Site Settings → Build & Deploy → Environment
   - Add all Firebase credentials
   - Trigger a new deploy

4. **Access Your App**
   - Netlify provides a public URL

### Option 3: Deploy to Render

1. **Create a Render Account** at [render.com](https://render.com)

2. **Create Static Site**
   - New → Static Site
   - Connect your GitHub repo
   - Build Command: `npm run build`
   - Publish Directory: `build`

3. **Add Environment Variables**
   - Environment → Add Environment Variable
   - Add all Firebase credentials
   - Deploy

## 🔒 Firebase Security Rules (Important)

For production, configure your Realtime Database rules to prevent unauthorized access:

Go to Firebase Console → Database → Rules and set:

```json
{
  "rules": {
    "people": {
      ".read": true,
      ".write": true
    }
  }
}
```

**For more secure setup** (requires authentication):
- Implement Firebase Authentication (email/password or Google Sign-In)
- Restrict read/write to authenticated users only

## 📱 How to Use

### Creating a Profile
1. Enter a name (e.g., "Raukus", "Amber")
2. Click "Create Profile"
3. Click the profile card to enter the dashboard

### Adding a Loan
1. Click "+ Add New Loan"
2. Fill in:
   - **Creditor Name**: Bank or lender name
   - **Amount**: Loan amount in dollars
   - **Due Date**: When the loan is due
   - **3-Digit PIN**: A security code (required to delete)
3. Click "✅ Add Loan"

### Managing Loans
- **Pin as Favorite**: Click the ⭐ button to prioritize a loan (appears at top)
- **Delete**: Click 🗑️ and enter your 3-digit PIN
- **View Status**: See if loans are overdue or days remaining

### Sorting
- Favorite loans (⭐) appear first
- Other loans sorted by due date (soonest first)
- Overdue loans show a ⚠️ warning

## 🛠️ Tech Stack

- **Frontend**: React 18
- **Styling**: Tailwind CSS 3
- **Backend/Database**: Firebase Realtime Database
- **Deployment**: Vercel, Netlify, or Render (serverless)

## 📝 Project Structure

```
src/
├── components/
│   ├── PersonSelector.js      # Profile selection screen
│   ├── Dashboard.js           # Main dashboard
│   ├── AddLoanForm.js         # Loan creation form
│   ├── LoanList.js            # Loan list with sorting
│   ├── LoanCard.js            # Individual loan display
│   └── DeletePINModal.js      # PIN protection modal
├── App.js                     # Main app component
├── firebase.js                # Firebase configuration
├── index.js                   # React entry point
└── index.css                  # Tailwind styles
```

## 🎨 Customization

### Change Colors
Edit `tailwind.config.js` to customize the color scheme.

### Add More Features
- Authentication (Firebase Auth)
- Payment tracking
- Loan notes
- Export to CSV
- Mobile app (React Native)

## 🐛 Troubleshooting

### App not syncing data
- Check Firebase connection in `.env.local`
- Verify Firebase Realtime Database is enabled
- Check browser console for errors

### Deployment fails
- Ensure all environment variables are set in your hosting platform
- Check that `npm run build` works locally
- Review deployment logs in Vercel/Netlify/Render dashboard

### PIN doesn't work
- PINs must be exactly 3 digits
- Make sure you confirm the PIN correctly when adding a loan

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork, modify, and use this project for your needs!

---

**Built with ❤️ for managing debt responsibly**
