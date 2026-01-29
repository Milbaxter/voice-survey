#!/usr/bin/env node

const fs = require('fs');

function loadTracker() {
  if (fs.existsSync('outreach-tracker.json')) {
    return JSON.parse(fs.readFileSync('outreach-tracker.json', 'utf8'));
  }
  return null;
}

function showStatus() {
  const tracker = loadTracker();
  
  if (!tracker) {
    console.log('❌ No tracker file found. Run send-batch-1-correct.js first.');
    return;
  }
  
  console.log('\n╔════════════════════════════════════════════════════════════════╗');
  console.log('║         VOICE SURVEY OUTREACH TRACKER - STATUS DASHBOARD       ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');
  
  // Summary
  const summary = tracker.summary;
  console.log('📊 SUMMARY');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`   Total sent:              ${summary.total_sent}`);
  console.log(`   Responses received:      ${summary.total_responses}`);
  console.log(`   Response rate:           ${summary.response_rate}`);
  console.log(`   Discovery calls booked:  ${summary.discovery_calls_booked || 0}`);
  console.log(`   Last updated:            ${new Date(summary.last_updated).toLocaleString()}`);
  console.log('');
  
  // Detailed status by batch
  for (const batchName in tracker) {
    if (batchName === 'summary') continue;
    
    const batch = tracker[batchName];
    console.log(`\n📧 ${batchName.toUpperCase().replace('_', ' ')}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    for (const contact of batch) {
      const statusEmoji = contact.response_received ? '✅' : 
                         contact.status === 'sent' ? '📤' : '⏳';
      
      console.log(`\n   ${statusEmoji} ${contact.organization}`);
      console.log(`      Email:     ${contact.contact_email}`);
      console.log(`      Sent:      ${contact.sent_date} ${contact.sent_time}`);
      console.log(`      Status:    ${contact.status}`);
      console.log(`      Priority:  ${contact.priority}`);
      
      if (contact.response_received) {
        console.log(`      ✉️  Response: ${contact.response_date}`);
        console.log(`          ${contact.response_summary}`);
      } else {
        const sentDate = new Date(contact.sent_date);
        const now = new Date();
        const daysSince = Math.floor((now - sentDate) / (1000 * 60 * 60 * 24));
        
        if (daysSince >= 3) {
          console.log(`      ⚠️  No response (${daysSince} days) - Follow-up needed?`);
        } else {
          console.log(`      ⏳ Waiting for response (${daysSince} days)`);
        }
      }
      
      if (contact.discovery_call_booked) {
        console.log(`      📞 Discovery call: ${contact.discovery_call_date}`);
      }
      
      if (contact.notes) {
        console.log(`      💡 ${contact.notes}`);
      }
    }
  }
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  // Action items
  console.log('📋 ACTION ITEMS\n');
  
  let actionItems = [];
  
  for (const batchName in tracker) {
    if (batchName === 'summary') continue;
    
    for (const contact of tracker[batchName]) {
      const sentDate = new Date(contact.sent_date);
      const now = new Date();
      const daysSince = Math.floor((now - sentDate) / (1000 * 60 * 60 * 24));
      
      if (!contact.response_received) {
        if (daysSince >= 3 && !contact.follow_up_1_date) {
          actionItems.push(`   • Send follow-up 1 to ${contact.organization}`);
        } else if (daysSince >= 7 && !contact.follow_up_2_date) {
          actionItems.push(`   • Send follow-up 2 to ${contact.organization}`);
        }
      } else if (contact.response_received && !contact.discovery_call_booked) {
        actionItems.push(`   • Book discovery call with ${contact.organization}`);
      }
    }
  }
  
  if (actionItems.length > 0) {
    actionItems.forEach(item => console.log(item));
  } else {
    console.log('   ✅ No immediate actions needed. Wait for responses.');
  }
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  console.log('💡 TIP: Run `node check-responses.js` to check for new replies\n');
}

showStatus();
