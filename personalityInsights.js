// require("dotenv").config();
const readline = require('readline')
const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3')
const personality_insights = new PersonalityInsightsV3({
  username: 'f1e45bbd-5924-4c78-ac0a-e41848fac157',
  password: 'mU0HQ8MBpf2q',
  version_date: '  '
})

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question('Please enter a short paragraph for Watson to analyze...', text => {
  let params = {
    content: text,
    content_type: 'text/plain',
    raw_scores: true,
    consumption_preferences: true
  }

  personality_insights.profile(params, function(error, response) {
    if (error) console.log('Error:', error)
    else console.log(JSON.stringify(response, null, 2))
  })

  rl.close()
})
