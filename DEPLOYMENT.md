# 🚀 Deployment Guide

## Quick Deploy Options

### Option 1: Vercel (Recommended)

**Easiest and fastest deployment option**

1. **Via Vercel Website:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Connect your GitHub repository
   - Vercel auto-detects Vite configuration
   - Click "Deploy"
   - Done! Your app is live

2. **Via Vercel CLI:**
   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```

**Configuration:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### Option 2: Netlify

1. **Via Netlify Website:**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

2. **Via Netlify Drop:**
   ```bash
   npm run build
   ```
   - Go to [app.netlify.com/drop](https://app.netlify.com/drop)
   - Drag the `dist` folder
   - Instant deployment!

3. **Via Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify deploy --prod
   ```

### Option 3: Render

1. Create a new "Static Site" on [render.com](https://render.com)
2. Connect your repository
3. Configure:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
4. Click "Create Static Site"

### Option 4: GitHub Pages

1. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json:**
   ```json
   {
     "homepage": "https://yourusername.github.io/creative-upaay",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Update vite.config.js:**
   ```javascript
   export default defineConfig({
     base: '/creative-upaay/',
     // ... rest of config
   })
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

## Environment Variables

If you need environment variables:

1. Create `.env` file:
   ```
   VITE_API_URL=your_api_url
   VITE_APP_NAME=Project Management Dashboard
   ```

2. Access in code:
   ```javascript
   const apiUrl = import.meta.env.VITE_API_URL;
   ```

3. For deployment platforms:
   - **Vercel:** Add in Project Settings → Environment Variables
   - **Netlify:** Add in Site Settings → Build & deploy → Environment
   - **Render:** Add in Environment Variables section

## Post-Deployment Checklist

- [ ] Test all features on live site
- [ ] Verify drag and drop works
- [ ] Test on mobile devices
- [ ] Check localStorage persistence
- [ ] Verify search functionality
- [ ] Test filter dropdown
- [ ] Check responsive design
- [ ] Verify all links work
- [ ] Test task creation
- [ ] Test task movement between columns

## Custom Domain (Optional)

### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### Netlify
1. Go to Domain Settings
2. Add custom domain
3. Configure DNS

## SSL Certificate

All recommended platforms provide free SSL certificates automatically!

## Performance Optimization

Before deploying:

```bash
# Analyze bundle size
npm run build

# Check the dist folder size
du -sh dist
```

Expected bundle size: ~200-300KB (gzipped)

## Troubleshooting

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 404 on Routes
For SPAs, configure redirects:

**Netlify:** Create `public/_redirects`:
```
/*    /index.html   200
```

**Vercel:** Already configured automatically

### Large Bundle Size
- Check for unused dependencies
- Ensure tree-shaking is working
- Use code splitting if needed

## CI/CD Setup

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: npm run deploy
```

## Monitoring

After deployment:
- Use Vercel Analytics
- Or add Google Analytics
- Or use Netlify Analytics

## Support

If you encounter issues:
1. Check platform status page
2. Review build logs
3. Verify all dependencies installed
4. Check Node.js version compatibility

---

Happy Deploying! 🎉

