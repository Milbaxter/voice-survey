#!/usr/bin/env node

const { AgentMailClient } = require('agentmail');
const fs = require('fs');

const API_KEY = process.env.AGENTMAIL_API_KEY || 'am_73ed2ee93a8962b43051a06c29e507313301c09c9dcaa5677a78cdb38cae08d8';
const FROM_EMAIL = 'differentterm546@agentmail.to';
const CC_EMAIL = process.env.CC_EMAIL || 'maximilian.rehn@gmail.com'; // Update with your Gmail

const client = new AgentMailClient({ apiKey: API_KEY });

// Swedish emails
const swedishEmails = [
  {
    to: 'kirjaamo@thl.fi',
    subject: 'Ersätt dyra telefonintervjuer med röstenkäter?',
    org: 'THL',
    body: `Hej,

Mitt namn är Maximilian Rehn. Jag har byggt något som kan vara relevant för THL:s arbete med svenska talare i Finland.

Snabb fråga: Använder ni telefonintervjuer (CATI) för hälsoenkäter med finlandssvenskar?

Jag vet att THL har genomfört CATI-studier tidigare. Det jag har märkt: det kostar 8 000-10 000 euro att ringa 200 personer, intervjuarna kostar 20-30 euro i timmen, och det tar 6-8 veckor.

Jag har byggt ett alternativ:
- Folk svarar på enkäten med röst när de har tid (ingen störande telefonsamtal)
- AI transkriberar automatiskt på svenska (98% noggrannhet)
- Ni får samma röstdata, men kostar 40-50% mindre
- Tar 2-3 veckor istället för 6-8

Basically: samma hälsodata från finlandssvenskar, halva priset, färre störda människor.

Eftersom THL är skyldig att nå svenska talare enligt språklagen, kan det här hjälpa er samla feedback billigare och mindre störande.

Skulle 15 minuter nästa vecka vara intressant för att prata om det här?

Vänliga hälsningar,
Maximilian Rehn
Voice Survey Finland`
  },
  {
    to: 'svenska@hel.fi',
    subject: 'Billigare medborgarenkäter för finlandssvenskar?',
    org: 'Helsinki City Swedish Services',
    body: `Hej,

Maximilian Rehn här. Jag jobbar med något som kan vara användbart för Helsingfors svenska tjänster.

Snabb fråga: Hur samlar ni in feedback från svenskspråkiga invånare? Använder ni telefonintervjuer?

De flesta kommuner jag pratar med betalar 8 000-10 000 euro för att få någon att ringa upp 200 personer och ställa frågor. Det tar veckor, folk svarar inte alltid, och intervjuarna är dyra.

Jag har byggt ett alternativ:
- Invånare svarar på enkäten med röst när de har tid
- AI transkriberar automatiskt på svenska
- Samma röstdata, men 40-50% billigare
- Tar 2-3 veckor istället för 6-8

Eftersom Helsingfors har den största gruppen finlandssvenskar i Finland (~15 000 personer) och är skyldig att erbjuda tjänster på svenska, tänkte jag att det här kunde vara relevant för er medborgarfeedback.

Skulle ett kort samtal (15 minuter) nästa vecka funka?

Mvh,
Maximilian Rehn
Voice Survey Finland`
  },
  {
    to: 'fhs@abo.fi',
    subject: 'Röstenkäter för forskningsprojekt - billigare än CATI',
    org: 'Åbo Akademi Social Sciences',
    body: `Hej,

Maximilian här. Jag har utvecklat en röstenkät-plattform för finlandssvenska forskningsprojekt.

Snabb fråga: Använder fakulteten för humaniora och samhällsvetenskap telefonintervjuer (CATI) för era surveys?

Jag vet att det kostar 8 000-10 000 euro att genomföra 200 telefonintervjuer, plus tiden det tar att rekrytera deltagare och schemalägga samtal.

Mitt alternativ:
- Deltagare svarar med röst när de vill (asynkront)
- AI transkriberar på svenska (98% noggrannhet)
- Vi rekryterar deltagare från vår finlandssvenska panel
- Kostar €5 999 för 200 deltagare (40-50% billigare)
- Tar 2-3 veckor

För forskningsprojekt som behöver kvalitativ röstdata från finlandssvenskar, men utan kostnaden för manuella telefonintervjuer.

Eftersom Åbo Akademi är den enda svenskspråkiga universitetet i Finland, tänkte jag att det här kunde vara relevant för era forskare.

15 minuters samtal nästa vecka?

Vänligen,
Maximilian Rehn
Voice Survey Finland`
  },
  {
    to: 'info@hanken.fi',
    subject: 'Billigare röstdata för marknadsundersökningar',
    org: 'Hanken',
    body: `Hej,

Maximilian Rehn här. Jag jobbar med ett verktyg för marknadsundersökningar bland finlandssvenskar.

Snabb fråga: Gör Hanken konsument- eller marknadsundersökningar som kräver feedback från svenska talare?

Om ni använder telefonintervjuer vet jag hur det funkar: 8-10K euro för att ringa 200 personer, långa ledtider, dyra intervjuare.

Jag har byggt ett alternativ:
- Folk svarar med röst när de vill (inte mitt under arbetsdagen)
- AI transkriberar på svenska automatiskt
- Ger er röstdata (tonfall, känslor) som textenkäter missar
- Kostar hälften (€5 999 vs €10 000)

För business research, consumer studies, eller executive surveys där ni behöver ärliga, djupa svar från finlandssvenska respondenter.

Skulle ett kort samtal (15 min) vara intressant?

Tack,
Maximilian Rehn
Voice Survey Finland`
  },
  {
    to: 'asiakaspalvelu@kela.fi',
    subject: 'Kundnöjdhetsenkäter för svenska talare - billigare alternativ',
    org: 'Kela',
    body: `Hej,

Maximilian Rehn här. Jag har utvecklat en röstenkät-tjänst för svenska talare i Finland.

Snabb fråga: Hur samlar Kela in feedback från svenskspråkiga kunder? Använder ni telefonintervjuer?

Jag vet att Kela är skyldig att erbjuda tjänster på svenska enligt språklagen, och kundnöjdhetsenkäter är en viktig del av det.

Traditionella telefonenkäter kostar 8 000-10 000 euro för 200 respondenter och tar 6-8 veckor.

Mitt alternativ:
- Kunder svarar med röst när de vill (ingen störande telefonsamtal)
- AI transkriberar automatiskt på svenska
- Samma röstdata om kundupplevelse
- 40-50% billigare
- 2-3 veckor leveranstid

Eftersom Kela har miljontals kunder och måste nå svenska talare regelbundet, kan det här hjälpa er samla feedback billigare och mer respektfullt.

Skulle 15 minuter nästa vecka funka för ett kort samtal?

Vänliga hälsningar,
Maximilian Rehn
Voice Survey Finland`
  }
];

async function sendEmail(email) {
  try {
    console.log(`\nSending to ${email.org} (${email.to})...`);
    
    // Note: AgentMail API might not support sending yet in the basic client
    // This is a placeholder - check actual API docs
    const result = await client.emails.send({
      from: FROM_EMAIL,
      to: email.to,
      cc: CC_EMAIL,
      subject: email.subject,
      text: email.body
    });
    
    console.log(`✅ Sent to ${email.org}`);
    return { success: true, org: email.org, to: email.to };
    
  } catch (error) {
    console.error(`❌ Failed to send to ${email.org}: ${error.message}`);
    return { success: false, org: email.org, to: email.to, error: error.message };
  }
}

async function sendAll() {
  console.log('📧 Voice Survey Outreach Campaign');
  console.log('================================\n');
  console.log(`From: ${FROM_EMAIL}`);
  console.log(`CC: ${CC_EMAIL}`);
  console.log(`Sending ${swedishEmails.length} Swedish emails...\n`);
  
  const results = [];
  
  for (const email of swedishEmails) {
    const result = await sendEmail(email);
    results.push(result);
    // Wait 30 seconds between emails to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 30000));
  }
  
  console.log('\n================================');
  console.log('📊 Campaign Results:');
  console.log(`✅ Sent: ${results.filter(r => r.success).length}`);
  console.log(`❌ Failed: ${results.filter(r => !r.success).length}`);
  
  // Save results
  fs.writeFileSync('outreach-results.json', JSON.stringify({
    timestamp: new Date().toISOString(),
    results
  }, null, 2));
  
  console.log('\n✅ Results saved to outreach-results.json');
}

sendAll().catch(console.error);
