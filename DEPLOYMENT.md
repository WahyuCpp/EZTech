# Deployment Guide for EZTech Palembang

This guide will help you deploy your EZTech Palembang application to Vercel and configure it with the custom domain eztechpal.com.

## Prerequisites

Before you begin, make sure you have:
- Node.js installed (v18 or higher)
- Git installed (for version control)
- A GitHub account (recommended for easier Vercel integration)

## Step 1: Create a Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Sign up with GitHub (recommended) or email
4. Complete the account setup

## Step 2: Prepare Your Project

Your project is already configured with:
- ✅ `vercel.json` - Vercel configuration
- ✅ `.vercelignore` - Files to exclude from deployment
- ✅ `package.json` - Build scripts configured

### Test Build Locally (Optional but Recommended)

Before deploying, test that your build works:

```bash
npm run build
```

This should create a `dist` folder with your built application.

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Easiest)

1. **Push to GitHub** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/eztech-palembang.git
   git push -u origin main
   ```

2. **Import to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Git Repository"
   - Select your GitHub repository
   - Vercel will auto-detect Vite settings
   - Click "Deploy"

3. **Wait for Deployment**:
   - Vercel will build and deploy your app
   - You'll get a URL like: `https://eztech-palembang.vercel.app`

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```
   Follow the prompts to authenticate.

3. **Deploy**:
   ```bash
   vercel
   ```
   
   Answer the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - What's your project's name? **eztech-palembang** (or your preferred name)
   - In which directory is your code located? **./** (press Enter)
   - Want to override settings? **N**

4. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

## Step 4: Purchase and Configure Custom Domain (eztechpal.com)

### Purchase the Domain

1. **Check Domain Availability**:
   - Go to domain registrars like:
     - [Namecheap](https://www.namecheap.com)
     - [GoDaddy](https://www.godaddy.com)
     - [Google Domains](https://domains.google)
     - [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/)
   
2. **Purchase eztechpal.com**:
   - Search for "eztechpal.com"
   - Complete the purchase (usually $10-15/year)
   - You'll get access to DNS management

### Configure Domain in Vercel

1. **Add Domain to Vercel**:
   - Go to your project in Vercel Dashboard
   - Click "Settings" → "Domains"
   - Enter "eztechpal.com"
   - Click "Add"

2. **Configure DNS Records**:
   
   Vercel will show you the DNS records to add. Go to your domain registrar's DNS settings and add:

   **For Root Domain (eztechpal.com):**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   TTL: 3600
   ```

   **For WWW Subdomain (www.eztechpal.com):**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   TTL: 3600
   ```

3. **Wait for DNS Propagation**:
   - DNS changes can take 24-48 hours to propagate
   - Usually happens within 1-2 hours
   - Vercel will automatically issue an SSL certificate

4. **Verify Domain**:
   - Once DNS propagates, Vercel will show a green checkmark
   - Your site will be live at https://eztechpal.com
   - SSL certificate will be automatically configured

## Step 5: Configure Production Settings (Optional)

### Environment Variables (if needed in future)

If you need to add environment variables:
1. Go to Project Settings → Environment Variables
2. Add variables for Production, Preview, and Development
3. Redeploy for changes to take effect

### Custom Build Settings

Your `vercel.json` is already configured, but you can modify:
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

## Step 6: Set Up Continuous Deployment

Once connected to GitHub:
- Every push to `main` branch = automatic production deployment
- Every pull request = automatic preview deployment
- You'll get deployment notifications

## Monitoring and Analytics

### Enable Vercel Analytics (Optional)

1. Go to your project in Vercel
2. Click "Analytics" tab
3. Enable Web Analytics (free tier available)
4. Get insights on:
   - Page views
   - Performance metrics
   - User locations

## Troubleshooting

### Build Fails

If deployment fails:
1. Check build logs in Vercel dashboard
2. Ensure `npm run build` works locally
3. Check that all dependencies are in `package.json`

### Domain Not Working

If domain doesn't work after 48 hours:
1. Verify DNS records are correct
2. Use [DNS Checker](https://dnschecker.org) to verify propagation
3. Contact your domain registrar support

### 404 Errors on Routes

The `vercel.json` configuration handles SPA routing. If you still get 404s:
1. Verify `vercel.json` is in the root directory
2. Redeploy the project

## Useful Commands

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs

# Remove deployment
vercel rm [deployment-url]
```

## Cost Breakdown

- **Vercel Hosting**: Free for hobby projects (includes SSL, CDN, analytics)
- **Domain (eztechpal.com)**: ~$10-15/year
- **Total First Year**: ~$10-15
- **Ongoing**: ~$10-15/year for domain renewal

## Next Steps After Deployment

1. ✅ Test all features on production
2. ✅ Set up custom error pages (if needed)
3. ✅ Configure redirects (if needed)
4. ✅ Enable analytics
5. ✅ Set up monitoring alerts
6. ✅ Share your live site!

## Support

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Community**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)

---

Your EZTech Palembang site will be live at:
- **Production**: https://eztechpal.com (after domain configuration)
- **Vercel URL**: https://eztech-palembang.vercel.app (immediate)
