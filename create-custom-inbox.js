#!/usr/bin/env node

const { AgentMailClient } = require('agentmail');

const API_KEY = 'am_73ed2ee93a8962b43051a06c29e507313301c09c9dcaa5677a78cdb38cae08d8';

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
