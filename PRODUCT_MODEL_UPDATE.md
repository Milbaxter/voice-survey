# Product Model Update - Jan 29, 2026

## ⚠️ IMPORTANT: Product Model Has Changed

**Date:** 2026-01-29  
**Status:** Current product specification

---

## What Changed

### OLD MODEL (Deprecated - Jan 29 evening)
**"Async Voice Surveys"**
- People record voice responses on their own time
- Self-service platform (like Google Forms but with voice)
- No phone calls
- Respondents access survey link, record answers, submit

### NEW MODEL (Current - Jan 29 late evening)
**"AI Phone Interviews"**
- AI makes outbound phone calls to respondents
- Real-time conversation (like traditional CATI)
- Respondent answers questions verbally during the call
- AI transcribes and analyzes responses
- **This is AI CATI replacement, not self-service surveys**

---

## Why The Change

**Mili clarified** the actual business model on Jan 29, 2026 at 20:40 UTC:
> "the service i provide is not what you described there. rather i will do the calls and people respond like they normally would to the interviewer but the interviewer is actually an AI."

This completely changes:
- Value proposition (CATI cost savings, not survey software)
- Target market (organizations doing phone interviews NOW)
- Pricing model (managed service, not SaaS platform)
- Technical architecture (telephony infrastructure, not web forms)

---

## Current Source of Truth

**Read these files (CORRECT model):**
1. **[SPEC.md](SPEC.md)** - Complete product specification
2. **[README.md](README.md)** - Project overview
3. **[READY_TO_SEND_BATCH_1.md](READY_TO_SEND_BATCH_1.md)** - Email templates (correct messaging)
4. **[EMAIL_TEMPLATES_CORRECTED.md](EMAIL_TEMPLATES_CORRECTED.md)** - All email templates

**Ignore these files (INCORRECT model):**
- EMAIL_DRAFT_v2_PHONE_REPLACEMENT.md (says "people record on their own time")
- EMAIL_DRAFT_SWEDISH.md (async model)
- READY_TO_SEND.md, READY_TO_SEND_FINNISH.md, READY_TO_SEND_SWEDISH.md (all async)
- FINNISH_MARKET_STRATEGY.md (based on old model)
- OUTREACH_STRATEGY.md (may have old model references)

**Partially outdated (need updating):**
- PROJECT_PLAN.md (references "voice survey platform" in old sense)
- PRICING_RESEARCH.md (may have old model assumptions)
- MARKET_RESEARCH.md (may reference async surveys)
- BUSINESS_VIABILITY.md (based on old model)

---

## Key Product Facts (CORRECT)

### What We Are Building
**AI phone interview service** that replaces human CATI (Computer-Assisted Telephone Interviewing) interviewers.

### How It Works
1. **AI makes outbound call** → respondent answers phone
2. **Real-time conversation** → AI asks questions, respondent answers verbally
3. **Automatic transcription** → AI captures responses in Finnish/Swedish
4. **Structured data output** → Same format as traditional CATI

### Target Market
- Government research agencies (THL, Statistics Finland, etc.)
- Market research firms (Taloustutkimus, Norstat, etc.)
- Universities (social sciences, health research)
- Public sector (municipalities, wellbeing counties)

### Value Proposition
- ✅ Same methodology (phone interviews, research protocols unchanged)
- ✅ Same data quality (structured responses)
- ✅ 40-50% cheaper (no interviewer labor costs: €20-30/hour)
- ✅ Faster deployment (no interviewer scheduling/training)
- ✅ Scalable (100s of simultaneous calls)
- ✅ Bilingual (Finnish and Swedish)

### Pricing
- **Beta:** €2,999 for 200-respondent survey (first 5 customers)
- **Standard:** €5,999 for 200-respondent survey
- **Traditional CATI cost:** €8,000-10,000 for 200 interviews

---

## What This Means For Documentation

### Need to Update (Low Priority - Wait Until After Pilots)
The following docs were written with the old "async voice survey" model in mind. They're not critical for current outreach (Jan-Feb 2026) but should be updated eventually:

1. **PROJECT_PLAN.md** - Rewrite phases to focus on AI CATI infrastructure, not web platform
2. **MARKET_RESEARCH.md** - Update use cases to focus on CATI replacement
3. **BUSINESS_VIABILITY.md** - Update unit economics (telephony costs, not hosting costs)
4. **PRICING_RESEARCH.md** - Confirm pricing still makes sense for AI CATI model

### Already Correct (Use These)
These files are already using the correct AI phone interview model:
- ✅ SPEC.md
- ✅ README.md
- ✅ READY_TO_SEND_BATCH_1.md
- ✅ EMAIL_TEMPLATES_CORRECTED.md
- ✅ OUTREACH_HUB.md (updated)
- ✅ BATCH_1_CONTACTS.md

---

## Timeline

**2026-01-29 evening:** Product model clarified  
**2026-01-29 late evening:** Core docs updated (SPEC, README, email templates)  
**2026-01-30 onwards:** Use correct model for all outreach  
**2026-02+ (after pilots):** Update remaining docs if needed  

---

## When In Doubt

**Always refer to [SPEC.md](SPEC.md)** - it's the single source of truth for what we're building.

If you see conflicting information in other docs, trust SPEC.md and this notice.

---

**Created:** 2026-01-29  
**Last Updated:** 2026-01-29  
**Author:** Moltbot (documented product model change per Mili's clarification)
