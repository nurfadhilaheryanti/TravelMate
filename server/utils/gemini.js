// import { VertexAI } from '@google-cloud/vertexai';

// /**
//  * TODO(developer): Update these variables before running the sample.
//  */
// async function generate_from_text_input(projectId = 'inner-topic-424902-m7') {
//   const vertexAI = new VertexAI({project: projectId, location: 'us-central1'});

//   const generativeModel = vertexAI.getGenerativeModel({
//     model: 'gemini-1.5-pro-001',
//   })

//   const country = "japan"

//   const prompt =
//     `Please give me recommendation for travelling in Bangkok for cultural immersion with infinity budget for 1 days and i love history in 2024, give me the exact name of the place, not the event. Send your result in format of an array in JSON. Please give the coordinates too
//     `;

//   const resp = await generativeModel.generateContent(prompt);
//   const contentResponse = await resp.response;
//   // console.log(contentResponse.candidates[0].content.parts[0].text);
//   const data = contentResponse.candidates[0].content.parts[0].text
//   const replace = data.replace(/^```json\s/,"")
//   const recommendation = replace.replace(/^```\s+|\s+```$/g, "")
//   const parsedData = JSON.parse(recommendation)

  

// }
// generate_from_text_input();