#!/usr/bin/env node

const { AgentMailClient } = require('agentmail');

const API_KEY = process.env.AGENTMAIL_API_KEY;

if (!API_KEY) {
  console.error('❌ Error: AGENTMAIL_API_KEY environment variable not set');
  console.log('
Usage: AGENTMAIL_API_KEY=your-key node delete-and-recreate-inbox.js');
  process.exit(1);
}
const OLD_INBOX = 'differentterm546@agentmail.to';

async function recreateInbox() {
  const client = new AgentMailClient({ apiKey: API_KEY });
  
  try {
    // Delete old inbox
    console.log(`Deleting old inbox: ${OLD_INBOX}...`);
    await client.inboxes.delete(OLD_INBOX);
    console.log('✅ Old inbox deleted\n');
    
    // Create new custom inbox
    console.log('Creating new inbox: maximilian.rehn@agentmail.to...');
    const inbox = await client.inboxes.create({
      username: 'maximilian.rehn',
      domain: 'agentmail.to'
    });
    
    console.log('✅ New inbox created!');
    console.log('Email:', inbox.inboxId || inbox.email || 'maximilian.rehn@agentmail.to');
    console.log('Details:', JSON.stringify(inbox, null, 2));
    
    // Save config
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

recreateInbox();
