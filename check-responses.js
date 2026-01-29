#!/usr/bin/env node

const { AgentMailClient } = require('agentmail');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('agentmail-config.json', 'utf8'));
const API_KEY = process.env.AGENTMAIL_API_KEY || 'am_73ed2ee93a8962b43051a06c29e507313301c09c9dcaa5677a78cdb38cae08d8';

const client = new AgentMailClient({ apiKey: API_KEY });

// Load tracker
function loadTracker() {
  if (fs.existsSync('outreach-tracker.json')) {
    return JSON.parse(fs.readFileSync('outreach-tracker.json', 'utf8'));
  }
  return null;
}

// Save tracker
function saveTracker(tracker) {
  fs.writeFileSync('outreach-tracker.json', JSON.stringify(tracker, null, 2));
}

async function checkResponses() {
  console.log('🔍 Checking AgentMail inbox for responses...\n');
  console.log(`Inbox: ${config.inboxId}\n`);
  
  try {
    // Get messages from the inbox
    const messages = await client.inboxes.messages.list(config.inboxId, {
      limit: 50  // Get last 50 messages
    });
    
    console.log(`Found ${messages.data?.length || 0} messages in inbox\n`);
    
    if (!messages.data || messages.data.length === 0) {
      console.log('✅ No messages yet. Inbox is empty.');
      return;
    }
    
    // Load tracker
    const tracker = loadTracker();
    if (!tracker) {
      console.log('⚠️  No tracker file found. Run this after sending emails.');
      return;
    }
    
    // Check for responses
    let newResponses = 0;
    
    for (const message of messages.data) {
      const fromEmail = message.from?.address || message.from;
      const subject = message.subject || '(no subject)';
      const receivedDate = new Date(message.date || message.created_at);
      
      console.log(`📧 Message from: ${fromEmail}`);
      console.log(`   Subject: ${subject}`);
      console.log(`   Date: ${receivedDate.toISOString()}`);
      
      // Check if this is a response to our outreach
      for (const batch in tracker) {
        if (batch === 'summary') continue;
        
        for (const contact of tracker[batch]) {
          if (fromEmail.includes(contact.contact_email) || 
              contact.contact_email.includes(fromEmail.split('@')[1])) {
            
            if (!contact.response_received) {
              console.log(`   🎉 NEW RESPONSE from ${contact.organization}!`);
              
              // Update tracker
              contact.response_received = true;
              contact.response_date = receivedDate.toISOString();
              contact.response_summary = `Subject: ${subject}`;
              contact.status = 'responded';
              
              newResponses++;
            } else {
              console.log(`   ✓ Already tracked (responded on ${contact.response_date})`);
            }
          }
        }
      }
      
      console.log('');
    }
    
    if (newResponses > 0) {
      // Update summary
      tracker.summary.total_responses = (tracker.summary.total_responses || 0) + newResponses;
      tracker.summary.response_rate = 
        `${Math.round((tracker.summary.total_responses / tracker.summary.total_sent) * 100)}%`;
      tracker.summary.last_updated = new Date().toISOString();
      
      // Save tracker
      saveTracker(tracker);
      
      console.log(`\n🎉 ${newResponses} new response(s) tracked!`);
      console.log(`\n📊 Summary:`);
      console.log(`   Total sent: ${tracker.summary.total_sent}`);
      console.log(`   Total responses: ${tracker.summary.total_responses}`);
      console.log(`   Response rate: ${tracker.summary.response_rate}`);
      console.log(`\n✅ Tracker updated: outreach-tracker.json`);
    } else {
      console.log('✅ No new responses since last check.');
    }
    
  } catch (error) {
    console.error('❌ Error checking inbox:', error.message);
    if (error.body) {
      console.error('Details:', JSON.stringify(error.body, null, 2));
    }
  }
}

checkResponses();
