#!/usr/bin/env node

const { AgentMailClient } = require('agentmail');
const fs = require('fs');

const API_KEY = 'am_73ed2ee93a8962b43051a06c29e507313301c09c9dcaa5677a78cdb38cae08d8';

const variations = [
  'maximilian-rehn',
  'maxrehn',
  'max.rehn',
  'mrehn',
  'maximilian.rehn.voice',
  'rehn.maximilian'
];

async function tryCreate(username) {
  const client = new AgentMailClient({ apiKey: API_KEY });
  
  try {
    console.log(`Trying: ${username}@agentmail.to...`);
    const inbox = await client.inboxes.create({
      username: username,
      domain: 'agentmail.to'
    });
    
    console.log(`✅ SUCCESS! Created: ${username}@agentmail.to`);
    console.log('Details:', JSON.stringify(inbox, null, 2));
    
    fs.writeFileSync('agentmail-config.json', JSON.stringify(inbox, null, 2));
    console.log('✅ Saved to agentmail-config.json');
    
    return true;
    
  } catch (error) {
    console.log(`❌ ${username} - ${error.message}\n`);
    return false;
  }
}

async function main() {
  console.log('Trying inbox variations...\n');
  
  for (const variant of variations) {
    const success = await tryCreate(variant);
    if (success) {
      console.log('\n✅ Done! Inbox created successfully.');
      return;
    }
  }
  
  console.log('\n❌ All variations taken. Please suggest a custom name.');
}

main();
