import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    organization: "",
    apiKey: "",
});
const openai = new OpenAIApi(configuration);

export async function getChatGptResponse(message) {
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `${message}` }],
    });
    return completion.data.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching ChatGPT response:", error);
    return "";
  }
}

