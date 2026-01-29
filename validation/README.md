# Swedish Voice Transcription - Technical Validation

This validation suite tests whether Swedish voice transcription (using OpenAI Whisper) is accurate enough to build a business on.

**Goal:** Achieve <10% Word Error Rate (WER) for Finland-Swedish accents.

---

## Quick Start (5 Steps)

### Step 1: Record Voice Samples

1. Open `record-samples.html` in your web browser (Chrome/Firefox recommended)
2. Click "Allow" when asked for microphone access
3. Click **"Start Recording"**
4. Read the Swedish text aloud clearly
5. Click **"Stop Recording"**
6. Click **"Download This Sample"** → saves to your Downloads folder
7. Click **"Next Prompt"** and repeat for all 10 prompts

**Tips:**
- Speak naturally, not too slow or too fast
- Record in a quiet room (minimal background noise)
- Try different speakers if possible (different accents, ages, genders)
- Record at least 10 samples, ideally 15-20

### Step 2: Organize Samples

1. Create a folder: `voice-survey/validation/samples/`
2. Move all downloaded `.webm` files into this folder
3. Make sure filenames contain "sample-1", "sample-2", etc. (the recorder does this automatically)

### Step 3: Install Dependencies

```bash
cd voice-survey/validation
npm install
```

### Step 4: Set OpenAI API Key

Get your OpenAI API key from: https://platform.openai.com/api-keys

```bash
export OPENAI_API_KEY="sk-proj-your-key-here"
```

Or on Windows:
```cmd
set OPENAI_API_KEY=sk-proj-your-key-here
```

### Step 5: Run Validation

```bash
node test-transcription.js
```

The script will:
1. Load all audio samples from `samples/` folder
2. Send each to Whisper API for transcription
3. Compare transcription to expected text (ground truth)
4. Calculate Word Error Rate (WER) and accuracy
5. Generate a detailed report

---

## Understanding Results

### Word Error Rate (WER)

WER measures transcription accuracy:
- **<5% WER** 🟢 EXCELLENT - Production ready
- **5-10% WER** 🟡 GOOD - Acceptable for most use cases
- **10-15% WER** 🟠 FAIR - May need human review
- **>15% WER** 🔴 POOR - Not usable

### Sample Output

```
📄 Processing: swedish-sample-1-1234567.webm
Expected text (sample 1):
"Jag bor i Finland och talar svenska som mitt modersmål..."

⏳ Transcribing with Whisper API...
✅ Transcription result:
"Jag bor i Finland och talar svenska som mitt modersmål..."

📊 Accuracy Metrics:
   Word Error Rate (WER): 0.00%
   Accuracy: 100.00%
   Errors: 0/16 words
   Assessment: 🟢 EXCELLENT - Production ready
```

### Final Recommendation

At the end, you'll see:

```
🎯 RECOMMENDATION:
   ✅ PROCEED - Excellent transcription quality
   Swedish voice transcription is production-ready.
```

Or if quality is poor:
```
🎯 RECOMMENDATION:
   ❌ DO NOT PROCEED
   Transcription quality too low for production use.
```

---

## What Each File Does

| File | Purpose |
|------|---------|
| `record-samples.html` | Web-based voice recorder (no backend needed) |
| `test-transcription.js` | Validation script (tests Whisper API accuracy) |
| `package.json` | Node.js dependencies |
| `samples/` | Folder for audio files (you create this) |
| `validation-results.json` | Detailed test results (auto-generated) |

---

## Troubleshooting

### "OPENAI_API_KEY environment variable not set"
- Make sure you exported the API key in your terminal
- Check: `echo $OPENAI_API_KEY` (should show your key)

### "Samples directory not found"
- Create the folder: `mkdir samples`
- Move audio files into it

### "API error 401"
- Your API key is invalid or expired
- Get a new key from https://platform.openai.com/api-keys

### "No audio files found"
- Make sure files are in `samples/` folder
- Supported formats: .webm, .mp3, .wav
- Files should be named `swedish-sample-1-*.webm` etc.

### Microphone not working in browser
- Use Chrome or Firefox (Safari sometimes has issues)
- Make sure you clicked "Allow" for microphone access
- Check browser settings → Privacy → Microphone

---

## Testing Different Accents

To get comprehensive results, try recording samples with:

1. **Finland-Swedish speakers** (primary target)
   - West coast (Ostrobothnia dialect)
   - Helsinki region (capital area)
   - Åland Islands (if possible)

2. **Different age groups**
   - Young adults (20-30)
   - Middle-aged (40-50)
   - Seniors (60+)

3. **Different genders**
   - Male and female voices
   - Different voice pitches

**Ideal: 15-20 samples from 3-5 different speakers**

---

## Next Steps After Validation

### If WER < 10% (GOOD)
✅ **Proceed to MVP development**
- Build simple survey platform
- Find 1-2 pilot customers
- Run real-world test survey

### If WER 10-15% (FAIR)
⚠️ **Proceed with caution**
- Plan for hybrid approach (AI + human review)
- Set customer expectations (90% accuracy)
- Consider manual transcription backup

### If WER > 15% (POOR)
❌ **Do not proceed** or pivot:
- Try different transcription API (Google, Azure)
- Expand to Sweden immediately (different dialect)
- Pivot to manual transcription service
- Kill project

---

## Cost Estimate

**Whisper API pricing:**
- $0.006 per minute of audio
- Average 30-second sample = $0.003
- 20 samples = ~$0.06 total

**Very cheap to validate!**

---

## Questions?

If you run into issues:
1. Check the troubleshooting section above
2. Review the console output (error messages are descriptive)
3. Ask Moltbot for help (share the error message)

---

**Last Updated:** January 29, 2026
