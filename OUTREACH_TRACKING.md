# Outreach Tracking System

**Automated system for tracking email outreach and responses via AgentMail**

---

## Quick Commands

```bash
# Check inbox for new responses and update tracker
node check-responses.js

# View outreach status dashboard
node outreach-status.js

# Send batch 1 emails (already done)
node send-batch-1-correct.js
```

---

## Files

### 1. `outreach-tracker.json`
**The source of truth** for all outreach activity.

Contains:
- Who we emailed (organization, contact)
- When we sent emails
- Response status (sent, responded, no response)
- Follow-up dates
- Discovery call bookings
- Notes and priority

**Format:**
```json
{
  "batch_1": [
    {
      "organization": "THL",
      "contact_email": "tervesuomi@thl.fi",
      "sent_date": "2026-01-29",
      "status": "sent",
      "response_received": false,
      "response_date": null,
      "discovery_call_booked": false,
      ...
    }
  ],
  "summary": {
    "total_sent": 4,
    "total_responses": 0,
    "response_rate": "0%",
    ...
  }
}
```

### 2. `check-responses.js`
**Checks AgentMail inbox for new responses** and updates tracker automatically.

What it does:
- Fetches last 50 messages from AgentMail inbox
- Matches incoming emails to sent outreach
- Updates `outreach-tracker.json` with response info
- Shows summary of new responses

Run this:
- **Daily** during active outreach (manually or via cron)
- After you expect responses (3-5 days after sending)

### 3. `outreach-status.js`
**Dashboard showing current outreach status.**

What it shows:
- Summary stats (sent, responses, response rate)
- Detailed status per contact (sent date, response status, notes)
- Action items (follow-ups needed, calls to book)

Run this:
- **Anytime** you want to see status
- Before planning next batch of emails
- Before weekly review

### 4. `send-batch-1-correct.js`
**Sends emails via AgentMail API.**

Already executed on 2026-01-29. Created initial tracker entries.

---

## Workflow

### Daily Check (2 minutes)

```bash
# 1. Check for responses
node check-responses.js

# 2. View status
node outreach-status.js

# 3. If new responses → reply or book calls
```

### Weekly Review (10 minutes)

```bash
# 1. View full status
node outreach-status.js

# 2. Send follow-ups if needed (3+ days, no response)
# 3. Update tracker manually if needed (discovery calls, outcomes)
# 4. Plan next batch if ready
```

---

## Automated Checking (Optional)

### Option 1: Heartbeat (Recommended)

Add to `HEARTBEAT.md`:

```markdown
### Outreach Tracking (Every 4 hours, 9am-9pm)

During active outreach periods (when emails are out):
1. Run `cd voice-survey && node check-responses.js`
2. If new responses → notify Mili via Telegram
3. Update summary in memory

Keep quiet unless:
- New response received
- Follow-up needed (3+ days, no response)
```

### Option 2: Cron Job

```bash
# Check responses every 4 hours (9am-9pm)
cron job add "voice-survey-check" \
  --schedule "0 9,13,17,21 * * *" \
  --command "cd /home/moltbot/clawd/voice-survey && node check-responses.js"
```

---

## Manual Updates

Sometimes you'll need to manually update `outreach-tracker.json`:

### Response received (not via email)
```json
{
  "response_received": true,
  "response_date": "2026-01-30T14:30:00Z",
  "response_summary": "LinkedIn message - interested!",
  "status": "responded"
}
```

### Discovery call booked
```json
{
  "discovery_call_booked": true,
  "discovery_call_date": "2026-02-05T10:00:00Z",
  "status": "call_scheduled"
}
```

### Follow-up sent
```json
{
  "follow_up_1_date": "2026-02-01",
  "status": "follow_up_sent"
}
```

### Outcome decided
```json
{
  "outcome": "pilot_customer",  // or "not_interested", "no_response", "future"
  "status": "closed_won"  // or "closed_lost", "no_response"
}
```

---

## Status Values

### `status` field
- `sent` - Initial email sent, waiting for response
- `responded` - They replied
- `follow_up_sent` - Sent follow-up email
- `call_scheduled` - Discovery call booked
- `pilot_customer` - Agreed to pilot
- `no_response` - No response after 3 follow-ups
- `not_interested` - Declined
- `closed_won` - Became customer
- `closed_lost` - Did not become customer

### `outcome` field
- `pending` - Still in progress
- `pilot_customer` - Agreed to pilot (€2,999)
- `paying_customer` - Paying customer (€5,999+)
- `not_interested` - Not interested
- `no_response` - Never responded
- `future` - Interested but timing not right

---

## Response Rate Benchmarks

**Expected for government/research orgs:**
- 25-50% response rate (1-2 responses from 4 emails)
- 3-5 days for first response
- 1-2 discovery calls from 4 emails
- 1 pilot customer from 10-15 emails

**Batch 1 expectations:**
- Target: 1-2 responses
- Target: 1 discovery call
- Target: 0-1 pilot customer (would be exceptional!)

---

## Troubleshooting

### "No messages in inbox" but you got emails
- Check spam/promotions folder in gmail
- Emails might be CC'd to you but not IN the AgentMail inbox
- AgentMail inbox (`maximilian-rehn@agentmail.to`) is separate from your gmail

### Can't find response in tracker
- Manually update `outreach-tracker.json`
- Email might be from different address (e.g., personal vs work)
- Check `from` field carefully

### Tracker shows wrong data
- Edit `outreach-tracker.json` directly (it's just JSON)
- Commit changes to git after manual edits

---

## Git Workflow

**Always commit tracker updates:**

```bash
cd voice-survey
git add outreach-tracker.json
git commit -m "Update outreach tracker: [what changed]"
git push origin main
```

This keeps history and lets you see progress over time.

---

## Next Batches

When ready to send Batch 2 (Market Research Firms):

1. **Prepare emails** (use templates from OUTREACH_HUB.md)
2. **Create tracker entries** for batch_2
3. **Send via AgentMail** (similar to send-batch-1-correct.js)
4. **Check responses** daily

Repeat the workflow!

---

## Questions?

- **How often should I check?** Daily during first week, then every 2-3 days
- **When to follow up?** 3-4 days if no response
- **How many follow-ups?** Max 2 (3 total touches)
- **When to give up?** After 2 follow-ups and 10 days, mark "no_response"

---

**Last Updated:** 2026-01-29  
**Status:** Batch 1 sent, tracking active
