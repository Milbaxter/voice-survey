# Voice Survey Service - Product Specification

**Version:** 1.0  
**Last Updated:** 2026-01-29  
**Owner:** Maximilian Rehn

---

## What We Are Building

**AI-powered phone interview service** that replaces human CATI (Computer-Assisted Telephone Interviewing) interviewers.

---

## How It Works

### 1. AI Makes the Call
- **AI calls respondents** (outbound phone calls)
- Just like traditional CATI, but AI conducts the interview instead of a human

### 2. Real-Time Conversation
- **Respondent answers questions verbally** (normal phone conversation)
- AI asks questions in sequence
- AI adapts to responses (follow-up questions, clarifications)
- Feels like talking to a human interviewer

### 3. Transcription & Analysis
- **AI transcribes responses** in real-time
- Supports **Finnish and Swedish**
- Structured data output (same format as CATI)
- Automatic quality checks

---

## What We Replace

### Traditional CATI (Current Model)
- Human interviewer calls respondent
- Interviewer reads questions from script (CATI software)
- Interviewer types/clicks responses
- Cost: €20-30/hour per interviewer
- 200 interviews = 33-50 hours = €3,000-4,000 in labor alone

### Our Model (AI CATI)
- **AI calls respondent**
- AI asks questions (natural voice)
- AI captures and transcribes responses
- Cost: ~€5-10 per interview (mostly phone minutes + API costs)
- 200 interviews = €1,000-2,000 total

**Savings: 40-50% cost reduction**

---

## Value Proposition

### For Research Organizations
✅ **Same methodology** - Still phone interviews, no research protocol changes  
✅ **Same data quality** - Structured interview responses  
✅ **40-50% cheaper** - No interviewer labor costs  
✅ **Faster deployment** - No interviewer recruitment/training/scheduling  
✅ **Scalable** - Can run 100s of calls simultaneously  
✅ **Bilingual** - Finnish and Swedish support built-in  

### What Stays the Same
- Respondent experience (gets a call, answers questions)
- Research methodology (phone interview)
- Data structure (structured responses)
- Sample management (call list, scheduling, follow-ups)

### What Changes
- Interviewer is AI instead of human
- No interviewer scheduling/coordination needed
- Faster turnaround time
- Lower cost per interview

---

## Target Market

### Primary (Finland)
1. **Government research agencies** (THL, Statistics Finland, etc.)
2. **Market research firms** (Taloustutkimus, Norstat, etc.)
3. **Universities** (social sciences, health research)
4. **Public sector** (municipalities, wellbeing counties)

### Languages
- **Finnish** (primary - 5.4M speakers)
- **Swedish** (secondary - 285K Finland-Swedish speakers)

### Survey Types
- Health surveys (THL, occupational health)
- Consumer surveys (Statistics Finland)
- Public opinion polling
- Customer satisfaction (B2B, B2C)
- Academic research

---

## Pricing

### Beta Pricing (First 5 Customers)
- **€2,999** for 200-respondent survey
- Includes: AI calling, transcription, basic analysis
- Full support during pilot phase

### Standard Pricing (Year 1)
- **€5,999** for 200-respondent survey
- 60% gross margin
- 40% cheaper than traditional CATI (€8,000-10,000)

### What's Included
- Survey design consultation
- AI voice setup (Finnish/Swedish)
- 200 completed interviews
- Transcription and data export (CSV/Excel)
- Basic analysis and reporting

### What Costs Extra
- Respondent incentives (€5-10 per person = €1,000-2,000)
- Custom voice training
- Advanced analytics
- Multiple language versions

---

## Technical Architecture (Simplified)

### Components
1. **Voice AI** - Conducts interviews (GPT-4 + voice API)
2. **Telephony** - Outbound calling infrastructure
3. **Transcription** - Real-time speech-to-text (Whisper)
4. **Database** - Store responses, manage call list
5. **Reporting** - Dashboard + data export

### Stack (TBD)
- Voice AI: OpenAI Realtime API or similar
- Telephony: Twilio or local Finnish telecom
- Transcription: Whisper (OpenAI or KB-Whisper for Swedish)
- Backend: Node.js + PostgreSQL
- Frontend: Simple dashboard for client access

---

## Competitive Advantage

### vs Traditional CATI Firms
✅ **50% cheaper** (no interviewer labor)  
✅ **Faster** (no interviewer scheduling)  
✅ **Scalable** (100s of simultaneous calls)  
✅ **Consistent** (no interviewer variance)  

### vs Online Surveys
✅ **Voice data** (richer, more natural responses)  
✅ **Higher response rates** (phone > email)  
✅ **Better for older demographics** (not tech-dependent)  
✅ **Same methodology** (research protocol unchanged)  

### vs Async Voice Surveys
✅ **Phone interview format** (familiar to researchers)  
✅ **Real-time probing** (AI can ask follow-ups)  
✅ **Higher completion rates** (people answer when called)  

---

## Success Metrics

### Phase 0: Validation (Current)
- ✅ Market research complete
- ✅ Pricing validated
- ⏳ Landing page live
- ⏳ First 10 emails sent
- Target: 2-4 discovery calls

### Phase 1: Pilot (Q1 2026)
- 3-5 pilot customers
- €2,999 pricing
- Prove: AI can conduct quality interviews
- Prove: Cost savings are real
- Prove: Data quality matches CATI

### Phase 2: MVP (Q2 2026)
- 10-15 paying customers
- €5,999 pricing
- €60K revenue
- Automated survey setup
- Self-service dashboard

### Phase 3: Scale (H2 2026)
- 50+ customers
- €170K revenue
- Expand to Sweden (10M speakers)
- White-label for market research firms
- Managed service for large projects

---

## What We Are NOT Building

❌ **Async voice surveys** - People record on their own time  
❌ **Chatbots** - AI replaces customer service  
❌ **Survey software** - DIY survey builder  
❌ **Transcription service** - General audio transcription  
❌ **Market research consulting** - Full-service research firm  

We are **AI CATI** - replacing human phone interviewers with AI.

---

## Key Risks

### Technical
- Voice AI quality in Finnish/Swedish (mitigated: Whisper performs well)
- Call completion rates (mitigated: same as human CATI)
- Handling complex responses (mitigated: AI can ask clarifications)

### Market
- Resistance to AI (mitigated: cost savings > skepticism)
- Regulatory/ethics approval (mitigated: methodology unchanged)
- Data privacy concerns (mitigated: GDPR compliance, no worse than CATI)

### Business
- Long sales cycles (government procurement)
- Need pilots to prove quality
- Competition from established CATI firms

---

## Timeline

**2026-01-29:** Market research + outreach prep  
**2026-02:** Send first batch of emails (4-10 orgs)  
**2026-02:** Discovery calls, demo AI interviews  
**2026-03:** First 1-2 pilot customers (€2,999 each)  
**2026-04-06:** Deliver pilot surveys, gather feedback  
**2026-06:** Launch public pricing (€5,999), scale to 10+ customers  
**2026-12:** €60K revenue, 15-20 customers  

---

## Contact

**Maximilian Rehn**  
Email: maximilian.rehn@gmail.com  
Phone: +358 50 494 1660  
GitHub: https://github.com/Milbaxter/voice-survey  

---

**Remember:** We are building **AI phone interviewers**, not self-service voice surveys. The respondent experience is identical to CATI - they get a call, they answer questions. We just remove the most expensive part (human interviewer labor).
