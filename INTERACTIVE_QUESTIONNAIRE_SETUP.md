# 🎨 Interactive Questionnaire Setup Guide

## Overview

Your WildRose Painters website now features an **interactive, conversational questionnaire** that:

✅ **Engages customers** with a personalized, step-by-step experience  
✅ **Tracks leads automatically** in both Supabase and EspoCRM  
✅ **Sends auto-responses** via EspoCRM email system  
✅ **100% FREE** - No paid email services required  

---

## 🚀 Features

### 1. **5-Step Interactive Flow**
- **Step 1:** Personal information (name, email, phone)
- **Step 2:** Project type (residential/commercial) + property size
- **Step 3:** Service selection (interior, exterior, cabinets, etc.)
- **Step 4:** Timeline and budget preferences
- **Step 5:** Additional details and project summary

### 2. **Visual Engagement**
- Progress bar showing completion percentage
- Animated transitions between steps
- Icon-based step indicators
- Interactive button selections
- Real-time validation

### 3. **Lead Tracking**
- Automatically saves to **Supabase** database
- Syncs to **EspoCRM** CRM system
- Tracks source as "interactive_questionnaire"
- Captures all project details

### 4. **Auto-Response System**
- Professional branded email sent instantly
- Personalized with customer's first name
- Sets expectations (24-hour response time)
- Includes company contact information
- Links back to your website

---

## 🔧 Configuration

### Environment Variables Required

\`\`\`bash
# EspoCRM Configuration
ESPOCRM_BASE_URL=http://localhost:8080
ESPOCRM_API_KEY=3e5fe951f16740ea65dcfcaab963c257

# Alternative: Use username/password instead of API key
# ESPOCRM_USERNAME=admin
# ESPOCRM_PASSWORD=your_password

# Supabase (already configured)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
\`\`\`

### EspoCRM Setup Steps

1. **Install EspoCRM** (if not already running)
   \`\`\`bash
   docker run -d -p 8080:80 \
     -e ESPOCRM_DATABASE_HOST=db \
     -e ESPOCRM_DATABASE_NAME=espocrm \
     -e ESPOCRM_DATABASE_USER=espocrm \
     -e ESPOCRM_DATABASE_PASSWORD=password \
     --name espocrm \
     espocrm/espocrm
   \`\`\`

2. **Generate API Key**
   - Login to EspoCRM at `http://localhost:8080`
   - Go to: Administration → API Users
   - Create new API user or use existing
   - Copy the API Key

3. **Configure Email in EspoCRM**
   - Go to: Administration → Outbound Emails
   - Add your SMTP settings:
     - **SMTP Server:** smtp.gmail.com
     - **Port:** 587
     - **Username:** ky.group.solutions@gmail.com
     - **Password:** auvl zyme mgym kwnc
     - **Security:** TLS
   - Test the connection

4. **Enable Auto-Response**
   - The system automatically sends emails when leads are created
   - No additional configuration needed!

---

## 📊 How It Works

### Customer Journey

1. **Customer visits** wildrosepainters.ca
2. **Scrolls to** "Get Your Free Quote" section
3. **Completes** interactive 5-step questionnaire
4. **Receives** instant confirmation on screen
5. **Gets email** within seconds with auto-response

### Behind the Scenes

\`\`\`
Customer submits form
    ↓
API receives data (/api/leads)
    ↓
Saves to Supabase database
    ↓
Syncs to EspoCRM
    ↓
EspoCRM creates Lead record
    ↓
EspoCRM sends auto-response email
    ↓
Customer receives professional email
    ↓
You see lead in both dashboards
\`\`\`

---

## 🎨 Customization

### Change Auto-Response Email

Edit `lib/espocrm.ts` → `sendAutoResponse()` method:

\`\`\`typescript
const emailData = {
  to: lead.email,
  subject: "Your Custom Subject Line",
  body: `
    <!-- Your custom HTML email template -->
  `,
  isHtml: true,
}
\`\`\`

### Modify Questionnaire Steps

Edit `components/interactive-questionnaire.tsx`:

- Add/remove steps in the `steps` array
- Customize questions in each step section
- Change button options and values
- Adjust validation rules

### Update Colors/Branding

The questionnaire uses your existing theme colors from `app/globals.css`:
- Primary color: Purple/violet gradient
- Accent color: Rose/pink tones
- Matches your WildRose Painters brand

---

## 📈 Tracking & Analytics

### View Leads

**Supabase Dashboard:**
- Go to: https://app.supabase.com
- Select your project
- Table Editor → `leads` table

**EspoCRM Dashboard:**
- Go to: http://localhost:8080
- Navigate to: Leads
- Filter by: Source = "Web Site"

**Admin Dashboard:**
- Visit: https://wildrosepainters.ca/admin
- Password: vsegdavmeste6
- View all leads with status tracking

---

## 🔒 Security

- ✅ API keys stored in environment variables
- ✅ Server-side API calls only
- ✅ Input validation and sanitization
- ✅ Rate limiting on API routes
- ✅ HTTPS encryption in production

---

## 🆘 Troubleshooting

### Leads not appearing in EspoCRM?

1. Check EspoCRM is running: `http://localhost:8080`
2. Verify API key in environment variables
3. Check server logs for errors: `console.log("[v0] ...")`

### Auto-response emails not sending?

1. Verify SMTP settings in EspoCRM
2. Test email configuration in EspoCRM admin
3. Check spam folder for test emails
4. Ensure outbound emails are enabled

### Form submission errors?

1. Check browser console for errors
2. Verify Supabase connection
3. Check API route logs
4. Ensure all required fields are filled

---

## 💰 Cost Breakdown

| Service | Cost | Notes |
|---------|------|-------|
| **EspoCRM** | FREE | Self-hosted on your server |
| **Supabase** | FREE | Free tier: 500MB database |
| **Email Sending** | FREE | Via your Gmail SMTP |
| **Hosting** | $5-10/mo | VPS for EspoCRM (optional) |

**Total: $0-10/month** (vs $50-100/month for paid alternatives)

---

## 🎯 Next Steps

1. ✅ Test the questionnaire on your live site
2. ✅ Submit a test lead and verify auto-response
3. ✅ Check both Supabase and EspoCRM dashboards
4. ✅ Customize the email template to match your brand
5. ✅ Set up email notifications for new leads
6. ✅ Train your team on the admin dashboard

---

## 📞 Support

**Questions?** Contact: ky.group.solutions@gmail.com

**Built with:**
- Next.js 14
- Framer Motion (animations)
- Supabase (database)
- EspoCRM (CRM + auto-response)
- Tailwind CSS (styling)

---

**🎨 Your competitive advantage: A professional, engaging lead capture system that costs $0/month! 🎨**
