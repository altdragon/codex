import express from 'express';  // <-- Import express
import * as dotenv from 'dotenv';   // <-- Import dotenv
import cors from 'cors';    // <-- Import CORS
import { Configuration, OpenAIApi } from 'openai';  // <-- Import OpenAI

dotenv.config();  // <-- Load environment variables

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // <-- Set API key
});

const openai = new OpenAIApi(configuration);  // <-- Create OpenAI instance

const app = express();  // <-- Create express app
app.use(cors());  // <-- Enable CORS
app.use(express.json());  // <-- Enable JSON parsing

app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Hello from Codex',
    })
});

app.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt;

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0
        });

        res.status(200).send({
            bot: response.data.choices[0].text
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
});

app.listen(5000, () => console.log('Server running on port http://localhost:5000'));