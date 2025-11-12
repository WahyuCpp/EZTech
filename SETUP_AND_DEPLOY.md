# Complete Setup and Deployment Guide for EZTech Palembang

## Quick Start Checklist

- [ ] Install Node.js
- [ ] Install dependencies
- [ ] Test build locally
- [ ] Create Vercel account
- [ ] Deploy to Vercel
- [ ] Purchase domain (eztechpal.com)
- [ ] Configure custom domain

---

## Part 1: Initial Setup (First Time Only)

### Step 1: Install Node.js

1. **Download Node.js**:
   - Go to [https://nodejs.org](https://nodejs.org)
   - Download the **LTS version** (recommended)
   - Run the installer
   - **Important**: Check "Add to PATH" during installation

2. **Verify Installation**:
   - Open a **NEW** Command Prompt or PowerShell
   - Run:
     ```bash
     node --version
     npm --version
     ```
   - You should see version numbers (e.g., v18.x.x and 9.x.x)

### Step 2: Install Project Dependencies

1. **Open Command Prompt** in your project folder:
   - Navigate to: `C:\Users\User\Documents\EZTech`
   - Or right-click in the folder and select "Open in Terminal"

2. **Install dependencies**:
   ```bash
   npm install
   ```
   - This will install all required packages
   - Wait for it to complete (may take 2-5 minutes)

### Step 3: Test Your Application Locally

1. **Run development server**:
   ```bash
   npm run dev
   ```
   - Open browser to `http://localhost:5173`
   - Test all features

2. **Test production build**:
   ```bash
   npm run build
   ```
   - Should create a `dist` folder
   - If successful, you're ready to deploy!

---

## Part 2: Deploy to Vercel

### Method 1: Using Vercel Dashboard (Recommended for Beginners)

#### Step 1: Create GitHub Repository (Optional but Recommended)

1. **Create GitHub account** (if you don't have one):
   - Go to [github.com](https://github.com)
   - Sign up for free

2. **Create new repository**:
   - Click "+" → "New repository"
   - Name: `eztech-palembang`
   - Make it Public or Private
   - Click "Create repository"

3. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - EZTech Palembang"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/eztech-palembang.git
   git push -u origin main
   ```

#### Step 2: Deploy via Vercel Dashboard

1. **Create Vercel Account**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Sign Up"
   - **Sign up with GitHub** (easiest option)
   - Authorize Vercel to access your repositories

2. **Import Your Project**:
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Find and select your `eztech-palembang` repository
   - Click "Import"

3. **Configure Project** (Vercel auto-detects most settings):
   - **Framework Preset**: Vite (auto-detected)
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `dist` (auto-filled)
   - Click "Deploy"

4. **Wait for Deployment**:
   - Vercel will build and deploy your app
   - Takes about 1-2 minutes
   - You'll get a URL like: `https://eztech-palembang.vercel.app`

5. **Test Your Deployment**:
   - Click the provided URL
   - Test all features
   - Your app is now live! 🎉

### Method 2: Using Vercel CLI (Alternative)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```
   - Choose your login method (GitHub, Email, etc.)
   - Complete authentication in browser

3. **Deploy to Preview**:
   ```bash
   vercel
   ```
   - Answer the setup questions:
     - Set up and deploy? **Y**
     - Which scope? Select your account
     - Link to existing project? **N**
     - Project name? **eztech-palembang**
     - Directory? **./** (press Enter)
     - Override settings? **N**

4. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

---

## Part 3: Configure Custom Domain (eztechpal.com)

### Step 1: Check Domain Availability

1. Go to domain registrars:
   - [Namecheap](https://www.namecheap.com) - Recommended, ~$10/year
   - [GoDaddy](https://www.godaddy.com)
   - [Google Domains](https://domains.google)
   - [Cloudflare](https://www.cloudflare.com/products/registrar/)

2. Search for "eztechpal.com"
3. If available, proceed to purchase

### Step 2: Purchase the Domain

1. **Add to cart** and checkout
2. **Complete registration**:
   - Provide contact information
   - Enable privacy protection (recommended)
   - Complete payment (~$10-15/year)

3. **Access DNS Management**:
   - After purchase, go to domain management
   - Find "DNS Settings" or "Manage DNS"

### Step 3: Add Domain to Vercel

1. **In Vercel Dashboard**:
   - Go to your project
   - Click "Settings" → "Domains"
   - Enter "eztechpal.com"
   - Click "Add"

2. **Vercel will show DNS instructions**:
   - Copy the DNS records shown

### Step 4: Configure DNS Records

**In your domain registrar's DNS settings**, add these records:

#### For Root Domain (eztechpal.com):
```
Type: A
Name: @ (or leave blank)
Value: 76.76.21.21
TTL: 3600 (or Auto)
```

#### For WWW Subdomain (www.eztechpal.com):
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600 (or Auto)
```

### Step 5: Wait for DNS Propagation

- **Time**: Usually 1-2 hours, can take up to 48 hours
- **Check status**: 
  - In Vercel dashboard, you'll see verification status
  - Use [dnschecker.org](https://dnschecker.org) to check propagation

### Step 6: SSL Certificate (Automatic)

- Vercel automatically issues SSL certificate
- Your site will be accessible via HTTPS
- No additional configuration needed!

---

## Part 4: Continuous Deployment (Automatic Updates)

Once connected to GitHub:

1. **Make changes** to your code locally
2. **Commit and push**:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```
3. **Automatic deployment**:
   - Vercel automatically detects the push
   - Builds and deploys your changes
   - Live in 1-2 minutes!

---

## Quick Reference Commands

### Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Deployment (CLI)
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Check deployments
vercel ls

# View logs
vercel logs
```

### Git Commands
```bash
# Initialize repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Your message"

# Push to GitHub
git push

# Check status
git status
```

---

## Troubleshooting

### "npm is not recognized"
- **Solution**: Install Node.js from nodejs.org
- Make sure to restart your terminal after installation

### Build Fails
1. Run `npm install` to ensure all dependencies are installed
2. Run `npm run build` locally to see errors
3. Fix any TypeScript or build errors
4. Try deploying again

### Domain Not Working
1. Verify DNS records are correct
2. Wait 24-48 hours for DNS propagation
3. Check [dnschecker.org](https://dnschecker.org)
4. Contact domain registrar support if needed

### 404 Errors on Routes
- The `vercel.json` file handles this
- Make sure it's in the root directory
- Redeploy if needed

---

## Cost Summary

| Item | Cost | Frequency |
|------|------|-----------|
| Vercel Hosting | **FREE** | Forever (Hobby plan) |
| Domain (eztechpal.com) | $10-15 | Per year |
| SSL Certificate | **FREE** | Included with Vercel |
| **Total First Year** | **$10-15** | - |
| **Ongoing Annual** | **$10-15** | Domain renewal only |

---

## Your Deployment URLs

After deployment, your site will be available at:

- **Vercel URL** (immediate): `https://eztech-palembang.vercel.app`
- **Custom Domain** (after DNS setup): `https://eztechpal.com`
- **WWW Domain**: `https://www.eztechpal.com`

---

## Support Resources

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Vite Documentation**: [vitejs.dev](https://vitejs.dev)
- **React Documentation**: [react.dev](https://react.dev)

---

## Next Steps After Deployment

1. ✅ Test all features on production
2. ✅ Share your site with customers
3. ✅ Set up Google Analytics (optional)
4. ✅ Enable Vercel Analytics (optional)
5. ✅ Set up custom email (optional)
6. ✅ Add social media links
7. ✅ Monitor performance

---

**Congratulations!** 🎉 Your EZTech Palembang website will be live and accessible to customers worldwide!
