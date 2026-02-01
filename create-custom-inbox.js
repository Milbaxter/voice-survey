#!/usr/bin/env node

const { AgentMailClient } = require('agentmail');

const API_KEY = process.env.AGENTMAIL_API_KEY;

if (!API_KEY) {
  console.error('❌ Error: AGENTMAIL_API_KEY environment variable not set');
  console.log('\nUsage: AGENTMAIL_API_KEY=your-key node create-custom-inbox.js');
  process.exit(1);
}

async function createCustomInbox() {
  console.log('Creating custom inbox: maximilian.rehn@agentmail.to\n');
  
  const client = new AgentMailClient({ apiKey: API_KEY });
  
  try {
    const inbox = await client.inboxes.create({
      username: 'maximilian.rehn',
      domain: 'agentmail.to'
    });
    
    console.log('✅ Custom inbox created!');
    console.log('Response:', JSON.stringify(inbox, null, 2));
    
    const fs = require('fs');
    fs.writeFileSync('agentmail-config.json', JSON.stringify(inbox, null, 2));
    console.log('\n✅ Saved to agentmail-config.json');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Details:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

createCustomInbox();
