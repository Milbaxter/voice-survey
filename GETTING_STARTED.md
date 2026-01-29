# Getting Started - Voice Survey Project

## 🎯 Current Status: Technical Validation Phase

Before building the product, we need to validate that Swedish voice transcription works well enough.

---

## ⚡ Quick Start (What You Need to Do Now)

### 1. Record Voice Samples (15 minutes)

```bash
# Open the recorder in your browser
cd validation
open record-samples.html  # Mac
# or just double-click the file
```

- Record yourself reading the 10 Swedish prompts
- Download each sample
- **Bonus:** Get 2-3 other Swedish speakers to record too (different accents!)

### 2. Run Setup (1 minute)

```bash
cd validation
./setup.sh
```

This installs dependencies and creates the `samples/` folder.

### 3. Add Your OpenAI API Key

```bash
export OPENAI_API_KEY="sk-proj-your-key-here"
```

Get key from: https://platform.openai.com/api-keys

### 4. Move Audio Files

Move all downloaded `.webm` files from your Downloads folder to:
```
voice-survey/validation/samples/
```

### 5. Run the Test (2 minutes)

```bash
node test-transcription.js
```

**This will:**
- Send each audio sample to Whisper API
- Compare transcription to expected text
- Calculate accuracy (Word Error Rate)
- Give you a GO/NO-GO recommendation

---

## 📊 What We're Looking For

**Target: <10% Word Error Rate (WER)**

- **<5% WER** 🟢 = EXCELLENT, build the product!
- **5-10% WER** 🟡 = GOOD, proceed with confidence
- **10-15% WER** 🟠 = FAIR, might need human review backup
- **>15% WER** 🔴 = POOR, don't build (or pivot to Sweden)

---

## 🗺️ Project Roadmap (After Validation)

### If Validation Succeeds (WER < 10%)

**Month 1-3: Build MVP + Get Pilot Customers**
- Simple survey creation tool
- Voice recording interface
- Transcription pipeline
- Find 1-2 pilot customers (government/university)
- Run real survey with 50-100 participants

**Month 4-9: Launch SaaS Platform**
- Self-service survey builder
- Subscription billing (€99-299/month)
- Managed services offering (€2K-15K per project)
- Target: 5-10 paying customers

**Month 10-18: Scale**
- Grow to €150K+ annual revenue
- Expand to Sweden (10M Swedish speakers!)
- Build participant panel (500-1,000 active members)

### If Validation Fails (WER > 15%)

**Pivot Options:**
1. Expand to Sweden immediately (different dialect might work better)
2. Hybrid model (AI + human transcription)
3. Kill project, move to something else

---

## 📁 Key Documents

- **MARKET_RESEARCH.md** - Who are the customers? What's the market size?
- **PROJECT_PLAN.md** - Full 4-phase roadmap from validation to exit
- **BUSINESS_VIABILITY.md** - Unit economics, risks, go/no-go framework
- **validation/README.md** - Detailed testing instructions

---

## ❓ Questions You Might Have

**Q: How much will validation cost?**  
A: ~$0.06 for 20 samples (Whisper API is cheap!)

**Q: What if I don't have other Swedish speakers?**  
A: Your voice is enough for initial testing. We can test more accents later.

**Q: How long does transcription take?**  
A: ~5-10 seconds per sample (API is fast).

**Q: What if results are mixed (some good, some bad)?**  
A: If average WER is <10%, we're good. Individual samples can vary.

**Q: Can I test with Finland-Swedish specifically?**  
A: Yes! That's the goal. If you have friends with Ostrobothnia or Åland accents, even better.

---

## 🚀 Next Steps

1. **NOW:** Run the validation test (see Quick Start above)
2. **Share results with Moltbot:** Post the output here or DM me
3. **Decision:** If WER <10%, we start building MVP next week
4. **If WER >15%:** We discuss pivot options

---

**Questions? Just ask!** I'm monitoring this project and will help with any issues.

— Moltbot 🦎
