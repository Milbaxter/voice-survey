#!/usr/bin/env node

const { AgentMailClient } = require('agentmail');
const fs = require('fs');

// Load the inbox config
const config = JSON.parse(fs.readFileSync('agentmail-config.json', 'utf8'));
const API_KEY = process.env.AGENTMAIL_API_KEY;

if (!API_KEY) {
  console.error('❌ Error: AGENTMAIL_API_KEY environment variable not set');
  console.log('\nUsage: AGENTMAIL_API_KEY=your-key node send-batch-1-correct.js');
  process.exit(1);
}

const client = new AgentMailClient({ apiKey: API_KEY });

const emails = [
  {
    to: 'tervesuomi@thl.fi',
    cc: 'maximilian.rehn@gmail.com',
    subject: 'Korvaa kalliit haastattelijat AI-puhelinhaastatteluilla',
    org: 'THL',
    personalization: 'Ymmärrän että THL tekee laajoja terveystutkimuksia kuten Terve Suomi -kysely 64 000 vastaajalla. Jos osa näistä tutkimuksista käyttää puhelinhaastatteluja, AI-puhelinhaastattelut voisivat olla mielenkiintoinen vaihtoehto. Palvelu toimii sekä suomeksi että ruotsiksi.\n\nJos THL tekee puhelinkyselyitä, olisiko 15 minuuttia ensi viikolla mielenkiintoista keskustella tästä?'
  },
  {
    to: 'consumer.survey@stat.fi',
    cc: 'maximilian.rehn@gmail.com',
    subject: 'Korvaa kalliit haastattelijat AI-puhelinhaastatteluilla',
    org: 'Tilastokeskus',
    personalization: 'Ymmärrän että Tilastokeskus tekee useita CATI-pohjaisia kyselyitä, kuten Kuluttajabarometri kuukausittain. Jos haluatte kokeilla edullisempaa tapaa tehdä puhelinhaastatteluja, voisin näyttää kuinka alustamme toimii. Palvelu toimii sekä suomeksi että ruotsiksi.\n\nJos Tilastokeskus tekee puhelinkyselyitä, olisiko 15 minuuttia ensi viikolla mielenkiintoista keskustella tästä?'
  },
  {
    to: 'viestinta@ttl.fi',
    cc: 'maximilian.rehn@gmail.com',
    subject: 'Korvaa kalliit haastattelijat AI-puhelinhaastatteluilla',
    org: 'Työterveyslaitos',
    personalization: 'Ymmärrän että Kunta-alan henkilöstön seurantatutkimus (FPS) on Suomen suurin ja pitkäaikaisin kunta-alan henkilöstötutkimus, joka kattaa lähes 30% kunta-alan työntekijöistä. Jos tutkimus sisältää puhelinhaastatteluja, AI-puhelinhaastattelut voisivat tarjota kustannustehokkaan vaihtoehdon. Palvelu toimii sekä suomeksi että ruotsiksi.\n\nJos Työterveyslaitos tekee puhelinkyselyitä, olisiko 15 minuuttia ensi viikolla mielenkiintoista keskustella tästä?'
  },
  {
    to: 'kansalaisbarometri@helsinki.fi',
    cc: 'maximilian.rehn@gmail.com',
    subject: 'Korvaa kalliit haastattelijat AI-puhelinhaastatteluilla',
    org: 'Kansalaisbarometri',
    personalization: 'Ymmärrän että Kansalaisbarometri on uusi innovatiivinen tutkimusinfrastruktuuri, joka etsii uusia tapoja kerätä tutkimustietoa. AI-puhelinhaastattelut voisivat olla mielenkiintoinen lisäys alustallenne, erityisesti kun haluatte kerätä syvempää laadullista dataa. Palvelu toimii sekä suomeksi että ruotsiksi.\n\nJos Kansalaisbarometri tekee puhelinkyselyitä, olisiko 15 minuuttia ensi viikolla mielenkiintoista keskustella tästä?'
  }
];

const baseBody = `Hei,

Olen Maximilian. Nopea kysymys siitä, miten ORGNAME kerää palautetta tutkimuksissanne.

Käytättekö puhelinhaastatteluja? (Eli joku soittaa ihmisille ja esittää kysymyksiä?)

Olen huomannut, että useimmat maksavat 8 000–10 000 euroa siitä, että joku soittaa 200 ihmiselle. Suurin kustannus on haastattelijoiden palkat: 20–30 euroa tunnissa, ja 200 haastattelua tarkoittaa 33-50 tuntia työtä.

Olen rakentanut vaihtoehdon:
- AI soittaa ja tekee haastattelun (kuin tavallinen puhelinhaastattelu)
- Vastaajat puhuvat normaalisti kuten haastattelijan kanssa
- AI transkriboi ja analysoi vastaukset automaattisesti suomeksi tai ruotsiksi
- Sama data ja laatutaso, mutta 40-50% halvemmalla (ei haastattelijoiden palkkakustannuksia)
- Nopeampi kuin perinteinen CATI (ei tarvitse koordinoida haastattelijoita)

Periaatteessa: sama puhelinhaastattelu, mutta AI tekee soiton - puolet hinnasta.

PERSONALIZATION

Ystävällisin terveisin,
Maximilian Rehn
+358 50 494 1660`;

async function sendEmails() {
  console.log('Sending Batch 1 emails (4 total)...');
  console.log('Using inbox:', config.inboxId);
  console.log('');
  
  for (const email of emails) {
    const body = baseBody
      .replace('ORGNAME', email.org)
      .replace('PERSONALIZATION', email.personalization);
    
    try {
      console.log(`Sending to ${email.org} (${email.to})...`);
      
      const result = await client.inboxes.messages.send(
        config.inboxId,  // inbox_id (from param)
        {
          to: email.to,
          cc: email.cc,
          subject: email.subject,
          text: body
        }
      );
      
      console.log(`✅ Sent to ${email.org}`);
      console.log(`   Message ID: ${result.message_id}`);
      console.log('');
      
      // Wait 2 seconds between emails to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      console.error(`❌ Failed to send to ${email.org}:`, error.message);
      if (error.body) {
        console.error('   Error details:', JSON.stringify(error.body, null, 2));
      }
      console.error('');
    }
  }
  
  console.log('🎉 Batch 1 complete!');
  console.log('');
  console.log('Sent to:');
  console.log('1. THL (tervesuomi@thl.fi)');
  console.log('2. Statistics Finland (consumer.survey@stat.fi)');
  console.log('3. Finnish Institute of Occupational Health (viestinta@ttl.fi)');
  console.log('4. University of Helsinki - Citizen Barometer (kansalaisbarometri@helsinki.fi)');
  console.log('');
  console.log('All emails CC: maximilian.rehn@gmail.com');
  console.log(`All emails from: ${config.inboxId}`);
}

sendEmails().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
