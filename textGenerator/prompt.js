import { appendFile, readFile } from 'fs/promises';
import ollama from 'ollama';
import { config } from 'process';

async function appendText(filePath, text) {
  try {
    await appendFile(filePath, text + '\n');
    console.log('Text appended successfully.');
  } catch (err) {
    console.error('Error appending text:', err);
  }
}
function syllabus_prompt(topic) {
    return `
    You are a professional ${topic} teacher.
    everything should be in string JSON format.
    Generate its syllabus.
    Strictly generate valid JSON for the syllabus.  
    Each topic must be in the following strict JSON format (as a list of objects):
    [
        {
            "index_no": "unit no",
            "topic": "topic on ${topic}",
            "description": "description of the topic"
            },
            ...
    ]
            
    Important:
    - Only output valid JSON.
    - Each field value must be a string.
    - Do not include special characters or numbers in field values.
    - Do not include any explanations, text, or formatting other than JSON.
    - Only return the JSON output with no extra text.
    `
    ;
}
function subtopic_prompt(topic, description, index_no) {
    return `You are a professional ${topic} teacher and it's description is ${description}.

    Generate its syllabus.

    Each sub-topic must be in the following strict JSON format (as a list of objects):
    
    [
    {
        "sub_topic": "topic on ${topic}",
        "parent_topic": "${topic}",
    },
    ...
    ]

Important:
- Generate upto 5 sub-topics for each topic.
- Only output valid JSON.
- Each option should be a string and not contain any special characters or numbers.
- The "question" should be a string and not contain any special characters or numbers.
- Do not include any additional text or explanations.
- Do not include any other formatting or metadata.
- Do not include any other content or text.
- Do not include any other characters or symbols.
- Do not include any other information or context.
- Do not include any other notes or comments.
`
}
function article_prompt(topic, subtopic) {
    return `You are a professional instructor in the field of ${topic}. Your task is to teach the subtopic: ${subtopic}.

Instructions:
- Write multiple unique, self-contained articles on the subtopic.
- Each article must be clear, educational, and no more than 300 words.
- Do not rely on external references or prior knowledge.
- Each article should be easy to understand and instructional in tone.
- Generate only one article per request.
Output Format:
Return a valid JSON array using this structure only:
[{
    topic: "${topic}",
    subtopic: "${subtopic}",
    info: "an article on ${topic} in minimum 200 words and upto 350 words"
}]
    Important:
- Output only valid JSON.
- Do not include markdown, explanations, or comments.
`;
}

async function readText(filePath) {

    try {
        let data = await readFile(filePath, 'utf-8')
        console.log(data)
    }
    catch (err) {
    }
}
function mcq_prompt(subject, subtopic, article) {
    return `
  You are a professional ${subject} trainer and assessment creator.
  
  Generate exactly 10 multiple-choice questions (MCQs) on ${subtopic} on the basis of this article ${article}. 
  Each question must be in the following strict JSON format (as a list of objects):
  it should only output valid JSON.
  [
    {
      "subject": "${subject}",
      "subtopic": "${subtopic}",
      "question": "question on ${subtopic}",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correct_answer": index_of_correct_option (0-3)
    },
    ...
  ]
  IMPORTANT:
  - Only output valid JSON.
  - Make sure each question has exactly four options.
  - Each option should be a string and not contain any special characters or numbers.
  - The "question" should be a string and not contain any special characters or numbers.
  - "options" should be an array of strings with exactly four options.
  - "correct_answer" should be the index (0-3) of the correct option.
  - Do not include any additional text or explanations.
  - Do not include any other formatting or metadata.
  - Do not include any other content or text.
  - Do not include any other characters or symbols.
  - Do not include any other information or context.
  - Do not include any other notes or comments.
  `
}
async function generateText(customPrompt,parameter) {

    const response = await ollama.chat({

        model: `gemma3:${parameter}`,
        messages: [{ role: 'user', content: customPrompt }]
    });
    let gate = false;
    // Extract content after "<think>"
    const content = response.message.content;
    let cleaned = content
        .replace(/^```json\s*/, '')
    
        .replace(/```$/, '');
    try{
        cleaned = JSON.parse(cleaned)
        gate = true;
    }
    catch (error){
        return false;
    }
    return cleaned;
}
async function generateArticle(customPrompt,parameter) {

    const response = await ollama.chat({

        model: `gemma3:latest`,
        messages: [{ role: 'user', content: customPrompt }]
    });

    // Extract content after "<think>"
    const content = response.message.content;
    return content;
}
export { syllabus_prompt, subtopic_prompt, article_prompt, mcq_prompt, appendText, generateArticle, readText, generateText}