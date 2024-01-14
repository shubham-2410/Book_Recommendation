const { OpenAI } = require('openai');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY, 
});

async function recommendation(prompt) {

    try {
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'gpt-3.5-turbo',
        });
    
        console.log(chatCompletion);     
        
        return chatCompletion;
    } 
    catch (error) {
        console.error('Error in recommendation:', error.message);
        throw error;
    }
}


module.exports = recommendation;
