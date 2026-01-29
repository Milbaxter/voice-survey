#!/usr/bin/env node

/**
 * Swedish Voice Transcription Validator
 * Tests Whisper API accuracy on Swedish voice samples
 */

const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const https = require('https');

// Configuration
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const SAMPLES_DIR = path.join(__dirname, 'samples');
const RESULTS_FILE = path.join(__dirname, 'validation-results.json');

// Expected transcriptions (ground truth)
const GROUND_TRUTH = {
    'sample-1': 'Jag bor i Finland och talar svenska som mitt modersmål. Det är viktigt att kunna kommunicera på sitt eget språk.',
    'sample-2': 'I morgon ska jag besöka min syster i Helsingfors. Vi planerar att gå på bio och äta middag tillsammans.',
    'sample-3': 'Vädret har varit väldigt kallt denna vecka. Jag hoppas att våren kommer snart med varmare temperaturer.',
    'sample-4': 'Min favorithobby är att läsa böcker. Jag tycker särskilt om kriminalromaner och historiska romaner.',
    'sample-5': 'Jag arbetar som lärare på en svensk skola i Finland. Det är ett givande jobb att undervisa unga elever.',
    'sample-6': 'Vi behöver fler svenska språktjänster i Finland. Det är viktigt för minoritetsspråk att bevaras.',
    'sample-7': 'Förra sommaren reste jag till Stockholm. Det var fantastiskt att höra olika svenska dialekter.',
    'sample-8': 'Jag tycker om att laga mat. Min specialitet är köttbullar med potatismos och lingonsylt.',
    'sample-9': 'Digitaliseringen har förändrat samhället mycket. Nu kan vi arbeta hemifrån och hålla möten online.',
    'sample-10': 'Hälsovården i Finland är mycket bra, men det är viktigt att kunna få service på svenska också.'
};

// Word Error Rate (WER) calculation
function calculateWER(reference, hypothesis) {
    const refWords = reference.toLowerCase().replace(/[.,!?]/g, '').split(/\s+/);
    const hypWords = hypothesis.toLowerCase().replace(/[.,!?]/g, '').split(/\s+/);
    
    const m = refWords.length;
    const n = hypWords.length;
    
    // Levenshtein distance matrix
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
    
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (refWords[i - 1] === hypWords[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.min(
                    dp[i - 1][j] + 1,      // deletion
                    dp[i][j - 1] + 1,      // insertion
                    dp[i - 1][j - 1] + 1   // substitution
                );
            }
        }
    }
    
    const wer = (dp[m][n] / m) * 100;
    return {
        wer: wer.toFixed(2),
        errors: dp[m][n],
        totalWords: m,
        accuracy: (100 - wer).toFixed(2)
    };
}

// Transcribe audio file with Whisper API
async function transcribeAudio(filePath) {
    return new Promise((resolve, reject) => {
        const form = new FormData();
        form.append('file', fs.createReadStream(filePath));
        form.append('model', 'whisper-1');
        form.append('language', 'sv'); // Swedish
        form.append('response_format', 'json');
        
        const options = {
            hostname: 'api.openai.com',
            path: '/v1/audio/transcriptions',
            method: 'POST',
            headers: {
                ...form.getHeaders(),
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            }
        };
        
        const req = https.request(options, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                if (res.statusCode === 200) {
                    try {
                        const result = JSON.parse(data);
                        resolve(result.text);
                    } catch (err) {
                        reject(new Error('Failed to parse response: ' + err.message));
                    }
                } else {
                    reject(new Error(`API error ${res.statusCode}: ${data}`));
                }
            });
        });
        
        req.on('error', (err) => {
            reject(err);
        });
        
        form.pipe(req);
    });
}

// Main validation function
async function runValidation() {
    console.log('🎤 Swedish Voice Transcription Validation');
    console.log('==========================================\n');
    
    if (!OPENAI_API_KEY) {
        console.error('❌ Error: OPENAI_API_KEY environment variable not set');
        console.log('\nUsage: OPENAI_API_KEY=your-key node test-transcription.js');
        process.exit(1);
    }
    
    if (!fs.existsSync(SAMPLES_DIR)) {
        console.error(`❌ Error: Samples directory not found: ${SAMPLES_DIR}`);
        console.log('\nPlease create a "samples" folder and add your audio files.');
        console.log('Expected naming: swedish-sample-1-*.webm, swedish-sample-2-*.webm, etc.');
        process.exit(1);
    }
    
    const files = fs.readdirSync(SAMPLES_DIR)
        .filter(f => f.endsWith('.webm') || f.endsWith('.mp3') || f.endsWith('.wav'))
        .sort();
    
    if (files.length === 0) {
        console.error('❌ Error: No audio files found in samples directory');
        process.exit(1);
    }
    
    console.log(`Found ${files.length} audio sample(s)\n`);
    
    const results = [];
    let totalWER = 0;
    let successfulTests = 0;
    
    for (const file of files) {
        const filePath = path.join(SAMPLES_DIR, file);
        const sampleMatch = file.match(/sample-(\d+)/);
        const sampleNum = sampleMatch ? parseInt(sampleMatch[1]) : null;
        const groundTruth = sampleNum ? GROUND_TRUTH[`sample-${sampleNum}`] : null;
        
        console.log(`\n📄 Processing: ${file}`);
        console.log(`Expected text (sample ${sampleNum}):`);
        console.log(`"${groundTruth || 'N/A'}"\n`);
        
        try {
            console.log('⏳ Transcribing with Whisper API...');
            const transcription = await transcribeAudio(filePath);
            
            console.log(`✅ Transcription result:`);
            console.log(`"${transcription}"\n`);
            
            if (groundTruth) {
                const werResult = calculateWER(groundTruth, transcription);
                totalWER += parseFloat(werResult.wer);
                successfulTests++;
                
                console.log(`📊 Accuracy Metrics:`);
                console.log(`   Word Error Rate (WER): ${werResult.wer}%`);
                console.log(`   Accuracy: ${werResult.accuracy}%`);
                console.log(`   Errors: ${werResult.errors}/${werResult.totalWords} words`);
                
                // Color-coded assessment
                const wer = parseFloat(werResult.wer);
                let assessment;
                if (wer < 5) {
                    assessment = '🟢 EXCELLENT - Production ready';
                } else if (wer < 10) {
                    assessment = '🟡 GOOD - Acceptable quality';
                } else if (wer < 15) {
                    assessment = '🟠 FAIR - May need human review';
                } else {
                    assessment = '🔴 POOR - Not usable';
                }
                console.log(`   Assessment: ${assessment}`);
                
                results.push({
                    file,
                    sampleNumber: sampleNum,
                    groundTruth,
                    transcription,
                    wer: werResult.wer,
                    accuracy: werResult.accuracy,
                    errors: werResult.errors,
                    totalWords: werResult.totalWords
                });
            } else {
                console.log('⚠️  No ground truth available for this sample (cannot calculate WER)');
                results.push({
                    file,
                    transcription,
                    note: 'No ground truth for accuracy calculation'
                });
            }
            
        } catch (err) {
            console.error(`❌ Error transcribing ${file}: ${err.message}`);
            results.push({
                file,
                error: err.message
            });
        }
    }
    
    // Summary
    console.log('\n\n==========================================');
    console.log('📊 VALIDATION SUMMARY');
    console.log('==========================================\n');
    
    if (successfulTests > 0) {
        const avgWER = totalWER / successfulTests;
        const avgAccuracy = 100 - avgWER;
        
        console.log(`Total samples tested: ${successfulTests}`);
        console.log(`Average WER: ${avgWER.toFixed(2)}%`);
        console.log(`Average Accuracy: ${avgAccuracy.toFixed(2)}%\n`);
        
        // Final recommendation
        console.log('🎯 RECOMMENDATION:');
        if (avgWER < 5) {
            console.log('   ✅ PROCEED - Excellent transcription quality');
            console.log('   Swedish voice transcription is production-ready.');
        } else if (avgWER < 10) {
            console.log('   ✅ PROCEED WITH CONFIDENCE');
            console.log('   Good transcription quality, suitable for production.');
        } else if (avgWER < 15) {
            console.log('   ⚠️  PROCEED WITH CAUTION');
            console.log('   Acceptable quality, but consider human review for critical applications.');
        } else {
            console.log('   ❌ DO NOT PROCEED');
            console.log('   Transcription quality too low for production use.');
            console.log('   Consider: manual transcription, hybrid approach, or different market.');
        }
    } else {
        console.log('⚠️  No successful transcriptions with ground truth');
    }
    
    // Save results
    fs.writeFileSync(RESULTS_FILE, JSON.stringify(results, null, 2));
    console.log(`\n💾 Detailed results saved to: ${RESULTS_FILE}`);
    
    console.log('\n==========================================\n');
}

// Run validation
runValidation().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});
