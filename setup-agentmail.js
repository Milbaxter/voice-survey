#!/usr/bin/env node

const { AgentMailClient } = require('agentmail');

const API_KEY = process.env.AGENTMAIL_API_KEY || 'am_73ed2ee93a8962b43051a06c29e507313301c09c9dcaa5677a78cdb38cae08d8';

async function setup() {
  console.log('Setting up AgentMail...\n');
  
  const client = new AgentMailClient({ apiKey: API_KEY });
  
  try {
    // Create inbox
    console.log('Creating inbox...');
    const inbox = await client.inboxes.create();
    
    console.log('✅ Inbox created!');
    console.log('Full response:', JSON.stringify(inbox, null, 2));
    
    // Save to file
    const fs = require('fs');
    fs.writeFileSync('agentmail-config.json', JSON.stringify(inbox, null, 2));
    console.log('\n✅ Saved to agentmail-config.json');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Response:', JSON.stringify(error.response.data, null, 2));
    }
    console.error('Full error:', error);
  }
}

setup();
