# Deployment Guide - Explorer Nature

This guide covers various deployment options for the Explorer Nature Next.js application.

## 🚀 Vercel (Recommended)

Vercel is the easiest and most optimized platform for Next.js applications.

### Automatic Deployment

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "New Project"
   - Import your repository

2. **Configure Project**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next` (default)
   - Install Command: `npm install`

3. **Environment Variables**
   - Add any required environment variables in the Vercel dashboard
   - Copy from `env.example` to Vercel's environment variables section

4. **Deploy**
   - Click "Deploy"
   - Your site will be live at `https://your-project.vercel.app`

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

## 🌐 Netlify

### Automatic Deployment

1. **Connect Repository**
   - Go to [netlify.com](https://netlify.com)
   - Sign in and click "New site from Git"
   - Connect your GitHub repository

2. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `out` (for static export) or `.next` (for serverless)
   - Node version: `16.x`

3. **Environment Variables**
   - Add environment variables in Site settings > Environment variables

4. **Deploy**
   - Click "Deploy site"

### Static Export (Optional)

To deploy as static site on Netlify:

```javascript
// next.config.js
module.exports = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}
```

## ☁️ AWS Amplify

1. **Connect Repository**
   - Go to [aws.amazon.com/amplify](https://aws.amazon.com/amplify)
   - Sign in and create new app
   - Connect your GitHub repository

2. **Build Settings**
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

3. **Environment Variables**
   - Add in the Amplify console

## 🐳 Docker Deployment

### Dockerfile

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Build and Run

```bash
# Build Docker image
docker build -t explorer-nature .

# Run container
docker run -p 3000:3000 explorer-nature
```

## 🖥️ VPS/Server Deployment

### Using PM2

1. **Install Dependencies**
   ```bash
   # Install Node.js and npm
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # Install PM2
   npm install -g pm2
   ```

2. **Deploy Application**
   ```bash
   # Clone repository
   git clone https://github.com/yourusername/explorer-nature.git
   cd explorer-nature

   # Install dependencies
   npm install

   # Build application
   npm run build

   # Start with PM2
   pm2 start npm --name "explorer-nature" -- start
   pm2 save
   pm2 startup
   ```

### Using Nginx

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🔧 Environment Configuration

### Production Environment Variables

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SITE_NAME="Explorer Nature"

# Analytics
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID

# Email Service (for contact form)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=noreply@your-domain.com

# Database (if needed)
DATABASE_URL=postgresql://user:password@localhost:5432/explorernature

# Security
NEXTAUTH_SECRET=your-super-secret-key
NEXTAUTH_URL=https://your-domain.com
```

## 📊 Performance Optimization

### Build Optimization

```bash
# Analyze bundle size
npm run build
npm run analyze

# Enable compression
# Add to next.config.js
module.exports = {
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
}
```

### CDN Configuration

1. **Cloudflare**
   - Add your domain to Cloudflare
   - Enable caching and optimization features
   - Configure page rules for static assets

2. **AWS CloudFront**
   - Create CloudFront distribution
   - Point to your hosting origin
   - Configure caching behaviors

## 🔒 Security Considerations

1. **Environment Variables**
   - Never commit `.env.local` to version control
   - Use strong, unique secrets for production
   - Rotate secrets regularly

2. **HTTPS**
   - Always use HTTPS in production
   - Configure SSL certificates (Let's Encrypt recommended)

3. **Headers**
   ```javascript
   // next.config.js
   module.exports = {
     async headers() {
       return [
         {
           source: '/(.*)',
           headers: [
             {
               key: 'X-Frame-Options',
               value: 'DENY',
             },
             {
               key: 'X-Content-Type-Options',
               value: 'nosniff',
             },
             {
               key: 'Referrer-Policy',
               value: 'origin-when-cross-origin',
             },
           ],
         },
       ]
     },
   }
   ```

## 📈 Monitoring

### Health Checks

```javascript
// pages/api/health.js
export default function handler(req, res) {
  res.status(200).json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
}
```

### Error Tracking

1. **Sentry**
   ```bash
   npm install @sentry/nextjs
   ```

2. **LogRocket**
   ```bash
   npm install logrocket
   ```

## 🚀 Continuous Deployment

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm run test
      
      - name: Build application
        run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 🔍 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version (requires 16+)
   - Clear `.next` folder and rebuild
   - Verify all dependencies are installed

2. **Runtime Errors**
   - Check environment variables
   - Verify API endpoints are accessible
   - Check browser console for errors

3. **Performance Issues**
   - Enable compression
   - Optimize images
   - Use CDN for static assets
   - Monitor bundle size

### Debug Mode

```bash
# Enable debug mode
DEBUG=* npm run dev

# Check build output
npm run build && npm run start
```

---

For additional support, refer to the [Next.js deployment documentation](https://nextjs.org/docs/deployment) or create an issue in the repository.

