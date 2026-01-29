# Voice Survey - Project Plan
*Project Owner: Moltbot (AI)*  
*Business Owner: Mili*  
*Started: January 29, 2026*

---

## Vision

Build a voice survey platform specifically for Swedish speakers in Finland, serving government agencies, researchers, and organizations who need to collect feedback from this minority language community.

**Target:** €60K revenue Year 1, €150K+ Year 2 through hybrid SaaS + managed services model.

---

## Current State (Jan 29, 2026)

**What Exists:**
- ✅ GitHub repo (empty except README)
- ✅ Market identified (285K Swedish speakers in Finland)

**What's Missing:**
- ❌ Product (nothing built)
- ❌ Technical validation (voice transcription quality unknown)
- ❌ Customers (zero)
- ❌ Panel (no participants recruited)
- ❌ Landing page / marketing
- ❌ Business entity / legal

**Status:** Pre-product. Blank slate.

---

## Phase 1: Technical Validation & MVP (Months 1-3)

**Goal:** Prove that Swedish voice transcription works well enough to build a business on.

### Month 1: Technical Feasibility

#### Week 1: Voice Transcription Testing
- [ ] Test Whisper API with Swedish audio samples
  - [ ] Record 10-20 voice samples (various Finnish-Swedish accents)
  - [ ] Test transcription accuracy
  - [ ] Measure: Word Error Rate (WER) - target <10%
- [ ] Test Google Cloud Speech-to-Text (Swedish support)
- [ ] Test Azure Speech Services (Swedish support)
- [ ] Compare: accuracy, cost, latency
- [ ] **Decision:** Which API to use?

#### Week 2: MVP Architecture
- [ ] Design system architecture
  - [ ] Survey creation interface
  - [ ] Voice recording (web-based, mobile-friendly)
  - [ ] Audio storage (S3 or similar)
  - [ ] Transcription pipeline
  - [ ] Results dashboard
- [ ] Choose tech stack
  - [ ] Frontend: React/Next.js? or simpler (plain HTML/JS)?
  - [ ] Backend: Node.js + Express? Python + FastAPI?
  - [ ] Database: PostgreSQL? Firebase?
  - [ ] Hosting: Vercel + AWS? or DigitalOcean?
- [ ] Document tech choices in TECH_STACK.md

#### Week 3: Build Core MVP
- [ ] Survey creation form (simple, 1-5 questions)
- [ ] Voice recording UI (browser-based, no app needed)
- [ ] Audio upload & storage
- [ ] Transcription integration (chosen API)
- [ ] Basic results view (list of transcriptions)

#### Week 4: Test with Beta Users
- [ ] Recruit 5-10 Swedish-speaking beta testers
  - [ ] Post in Swedish-Finnish Facebook groups
  - [ ] Ask friends/family if Swedish-speaking
- [ ] Run test survey ("Tell us about your day in Swedish")
- [ ] Measure:
  - [ ] Transcription accuracy (manual review)
  - [ ] User experience (can they figure it out?)
  - [ ] Technical issues (audio quality, upload failures)
- [ ] Iterate based on feedback

**Success Criteria (Month 1):**
- Transcription WER <10% for Finland-Swedish accents
- 5+ beta users complete test survey successfully
- MVP works end-to-end (survey creation → voice recording → transcription → results)

---

### Month 2: Customer Discovery & Pilot Customers

#### Customer Outreach (Weeks 5-6)
- [ ] Identify 20-30 potential customers
  - [ ] Swedish-language municipalities in Finland
  - [ ] Finnish government agencies (culture, education)
  - [ ] Universities with Swedish programs (Åbo Akademi, Helsinki, etc.)
  - [ ] Swedish cultural organizations (Folktinget, Svenska kulturfonden)
  - [ ] Market research firms in Finland
- [ ] Cold outreach (email/LinkedIn)
  - [ ] Intro: who we are, what we're building
  - [ ] Value prop: easier to reach Swedish speakers, richer data (voice vs text)
  - [ ] Ask: 15-min discovery call
- [ ] Target: 10-15 calls booked

#### Discovery Calls (Weeks 6-7)
- [ ] Ask about current survey methods
  - [ ] How do they collect feedback from Swedish speakers?
  - [ ] What pain points? (low response rates, expensive, time-consuming?)
  - [ ] What tools do they use?
- [ ] Ask about willingness to pay
  - [ ] "If we could solve [pain], what's it worth?"
  - [ ] "What budget do you typically allocate for surveys?"
- [ ] Pitch pilot project
  - [ ] Free or heavily discounted pilot survey
  - [ ] Collaborate on design, collect real data
  - [ ] Testimonial/case study in exchange

#### Secure 1-2 Pilot Customers (Weeks 7-8)
- [ ] Choose 1-2 most interested customers
- [ ] Define pilot project scope
  - [ ] Survey topic
  - [ ] Number of questions (keep it simple: 3-5)
  - [ ] Target participants (how many? 50-100?)
  - [ ] Timeline (2-4 weeks)
- [ ] Sign simple pilot agreement
  - [ ] Free or €500-1,000 (cost recovery)
  - [ ] Clear deliverables (transcription data, summary report)
  - [ ] Permission to use as case study

**Success Criteria (Month 2):**
- 10+ customer discovery calls completed
- 1-2 pilot customers signed
- Pilot project scope defined

---

### Month 3: Execute Pilot & Validate

#### Panel Recruitment (Weeks 9-10)
- [ ] Recruit 50-100 Swedish speakers for pilot survey
  - [ ] Post in Swedish-Finnish Facebook groups
  - [ ] Partner with Swedish cultural organizations
  - [ ] Email lists (YLE Swedish radio, Svenska nu news, etc.)
  - [ ] Offer incentive (€5-10 per completed survey? or raffle prize?)
- [ ] Qualify participants
  - [ ] Native/fluent Swedish speakers
  - [ ] Living in Finland
  - [ ] 18+ years old

#### Run Pilot Survey (Weeks 10-11)
- [ ] Launch survey with recruited participants
- [ ] Monitor completion rate
  - [ ] How many start vs complete?
  - [ ] Any technical issues?
  - [ ] Audio quality problems?
- [ ] Collect data
- [ ] Transcribe all voice responses

#### Deliver Results (Week 12)
- [ ] Clean and analyze data
- [ ] Create summary report for pilot customer
  - [ ] Key findings
  - [ ] Participant demographics
  - [ ] Sample transcriptions (anonymized)
- [ ] Present results to customer
- [ ] Ask for feedback
  - [ ] Was the data valuable?
  - [ ] Would you pay for this service?
  - [ ] What improvements needed?
- [ ] Request testimonial/case study permission

**Success Criteria (Month 3):**
- Pilot survey completed with 50+ participants
- Customer satisfied with results (NPS 7+)
- Clear signal of willingness to pay (verbal commitment to paid project)
- Transcription quality validated in real-world use

---

## Phase 2: Product Launch & Customer Acquisition (Months 4-9)

**Goal:** Launch SaaS platform, acquire 5-10 paying customers.

### Month 4: Build SaaS Platform

#### Core Features
- [ ] User authentication & accounts
- [ ] Survey builder (drag-and-drop or form-based)
  - [ ] Question types: open-ended voice, multiple choice, rating scale
  - [ ] Survey logic (skip, branching)
- [ ] Participant recruitment tools
  - [ ] Shareable survey link
  - [ ] QR code generation
  - [ ] Email invitations
- [ ] Data export (CSV, Excel)
- [ ] Basic analytics dashboard
  - [ ] Response rate
  - [ ] Completion time
  - [ ] Keyword frequency (from transcriptions)

#### Subscription & Billing
- [ ] Set up Stripe for subscriptions
- [ ] Define pricing tiers (see MARKET_RESEARCH.md)
  - [ ] Basic: €99/month (500 responses)
  - [ ] Pro: €299/month (2,000 responses)
  - [ ] Enterprise: Custom pricing
- [ ] Build pricing page
- [ ] Payment flow integration

### Month 5-6: Marketing & Customer Acquisition

#### Website & Content
- [ ] Build marketing website
  - [ ] Landing page (value prop, features, pricing)
  - [ ] Case study page (pilot customer results)
  - [ ] About page (team, mission)
  - [ ] FAQ
- [ ] SEO optimization
  - [ ] Target keywords: "Swedish survey Finland", "röstenkät svenska", etc.
- [ ] Content marketing
  - [ ] Blog post: "Why Voice Surveys Get Better Data"
  - [ ] Blog post: "Reaching Swedish Speakers in Finland"
  - [ ] Case study write-up

#### Outreach Campaigns
- [ ] Email campaign to discovery call leads
- [ ] LinkedIn outreach to researchers, government officials
- [ ] Partner with Swedish organizations
  - [ ] Folktinget (Swedish Assembly of Finland)
  - [ ] Svenska kulturfonden (Swedish Cultural Foundation)
  - [ ] YLE Radio Sweden

#### Target: 5-10 Paying Customers
- [ ] Convert pilot customers to paid subscriptions
- [ ] Acquire 3-8 new customers through marketing

### Month 7-9: Managed Services Offering

**For customers who want full-service:**

#### Build Service Packages
- [ ] Panel recruitment (we find participants)
- [ ] Survey design consultation
- [ ] Data analysis & reporting
- [ ] Custom features (for large clients)

#### Pricing
- Small survey (<200 participants): €2,000-5,000
- Medium survey (200-1,000): €5,000-15,000
- Large survey (1,000+): €15,000-50,000

#### Target: 5-10 Managed Projects
- [ ] Pitch managed services to existing SaaS customers
- [ ] Outreach to government agencies (larger budgets)
- [ ] Bid on tenders (Finnish government procurement)

**Success Criteria (Phase 2):**
- 5+ SaaS subscriptions (€5K-30K MRR)
- 5+ managed projects completed (€10K-50K revenue)
- Platform uptime >99%
- Customer churn <10%

---

## Phase 3: Scale & Optimize (Months 10-18)

**Goal:** Grow to €150K+ annual revenue, optimize operations.

### Expand Panel
- [ ] Build ongoing participant panel (500-1,000 active members)
- [ ] Gamification (points, badges for frequent participants)
- [ ] Referral program (invite friends, get bonus)
- [ ] Partner with influencers in Swedish-Finnish community

### Product Enhancements
- [ ] Sentiment analysis (positive/negative/neutral voice tone)
- [ ] Multilingual support (Finnish-Swedish bilingual surveys)
- [ ] Mobile app (iOS/Android for easier participation)
- [ ] API access (for enterprise customers)
- [ ] White-label option (customers can brand surveys)

### Geographic Expansion
- [ ] **Sweden** - 10M Swedish speakers (massive market)
  - [ ] Adapt platform for Swedish dialects
  - [ ] Market to Swedish organizations
- [ ] **Norway** - Swedish-speaking minority
- [ ] **Åland** - 100% Swedish-speaking, separate market

### Partnerships
- [ ] White-label for market research firms
- [ ] Integration with Qualtrics/SurveyMonkey (API)
- [ ] Academic partnerships (universities offer to students/researchers)

**Success Criteria (Phase 3):**
- €150K+ annual revenue (Year 2)
- 20+ active customers
- 500+ panel members
- Expand to Sweden or Norway (validation outside Finland)

---

## Phase 4: Exit or Scale (Months 19-24)

### Option 1: Sell the Business
- [ ] Document all processes (SOPs)
- [ ] Build financial prospectus
- [ ] Target buyers:
  - [ ] Market research firms (Kantar, Norstat, etc.)
  - [ ] Survey platforms (SurveyMonkey, Typeform)
  - [ ] Nordic media companies
- [ ] Target price: 2-3x annual revenue (€300K-450K)

### Option 2: Scale Aggressively
- [ ] Raise funding (angel/seed round)
- [ ] Hire team (developers, sales, customer success)
- [ ] Expand to all Nordic countries
- [ ] Build multi-language platform (Finnish, Norwegian, Danish)

### Option 3: Lifestyle Business
- [ ] Optimize for profitability (€100K+ profit/year)
- [ ] Automate operations (minimal time input)
- [ ] Keep as side project or delegate to hired manager

---

## Key Metrics

### Phase 1 (Validation)
- Transcription Word Error Rate (WER)
- Beta user completion rate
- Pilot customer satisfaction (NPS)

### Phase 2 (Growth)
- Monthly Recurring Revenue (MRR)
- Customer Acquisition Cost (CAC)
- Churn rate
- Panel size
- Managed project revenue

### Phase 3 (Scale)
- Annual Recurring Revenue (ARR)
- Lifetime Value (LTV)
- Panel engagement rate (% active participants)
- Geographic expansion (Sweden/Norway customers)

---

## Risk Mitigation

### Technical Risks
- **Poor transcription quality** → Test early (Month 1), use multiple APIs, human review option
- **Audio upload failures** → Robust error handling, backup storage, retry logic

### Market Risks
- **Market too small** → Expand to Sweden (10M speakers) by Month 12
- **Low willingness to pay** → Focus on managed services (higher value), build panel (moat)

### Operational Risks
- **Panel recruitment fails** → Partner with orgs, paid ads, referral incentives
- **Customer churn** → Strong onboarding, case studies, upsell to annual plans

---

## Decision Points

### End of Month 3 (Phase 1)
**Question:** Did pilot project succeed? Customer willing to pay?  
**If YES:** Proceed to Phase 2 (build SaaS)  
**If NO:** Pivot (expand to Sweden immediately, or kill project)

### End of Month 9 (Phase 2)
**Question:** Do we have 5+ paying customers and €30K+ revenue?  
**If YES:** Proceed to Phase 3 (scale)  
**If NO:** Assess: is the market there? Pivot or slow down?

### End of Month 18 (Phase 3)
**Question:** Are we at €150K+ ARR with clear growth trajectory?  
**If YES:** Proceed to Phase 4 (exit or scale)  
**If NO:** Decide: sell now, maintain as lifestyle business, or shut down

---

## Next Actions (This Week)

1. **Technical test** - Record Swedish voice samples, test Whisper transcription
2. **MVP scoping** - Define minimum features for Phase 1
3. **Customer list** - Identify 20-30 potential pilot customers
4. **Landing page** - Simple "coming soon" page to collect interest
5. **GitHub setup** - Initialize repo structure, start coding

**Goal:** Technical validation complete by end of Week 1.

---

**Last Updated:** January 29, 2026  
**Next Review:** February 5, 2026 (end of Month 1, Week 1)
