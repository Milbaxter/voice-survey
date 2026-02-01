#!/usr/bin/env node

const { AgentMailClient } = require('agentmail');

const API_KEY = process.env.AGENTMAIL_API_KEY;

if (!API_KEY) {
  console.error('❌ Error: AGENTMAIL_API_KEY environment variable not set');
  console.log('\nUsage: AGENTMAIL_API_KEY=your-key node setup-agentmail.js');
  process.exit(1);
}

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
