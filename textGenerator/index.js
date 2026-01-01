import ollama from 'ollama';
import { appendFile, readFile } from 'fs/promises';
import {read,write} from './jsonWriter.js'
import {syllabus_prompt,subtopic_prompt,article_prompt,appendText,readText,generateText,generateArticle, mcq_prompt} from './prompt.js';
let syllabus = await generateText(syllabus_prompt('Python Programming'),'latest');
let n = syllabus.length;
let arr = {};
while (syllabus == false || n == 0){
    syllabus = await generateText(syllabus_prompt('Python Programming'),'12b');
    n = syllabus.length
}
for (let i = 0;i < n;i++){
    let subtopic = await generateText(subtopic_prompt(syllabus[i].topic),'latest');
    let m = subtopic.length;
    while (subtopic == false || m == 0){
        subtopic = await generateText(subtopic_prompt(syllabus[i].topic),'latest');
        m = subtopic.length
    }
    for (let j = 0;j < m;j++){
        let article = await generateText(article_prompt(syllabus[i].topic,subtopic[j].sub_topic),'latest')
        let o = article.length;
        while (article == false || o == 0){
            article = await generateText(article_prompt(syllabus[i].topic,subtopic[j].sub_topic),'latest');
            o = article.length
        }
        for (let k = 0;k < o;k++){
            await appendText('article.txt',JSON.stringify(article[k]))
            await appendText('article.txt',',')
            await appendText('article.txt','\n')
            console.log(article[k])
            console.log(',')
        }
    }
}