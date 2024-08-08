import axios from "axios";

export async function generateAnswer(parms) {
    try {
        console.log(parms);
        const data = parms;

        const response = await axios({
            url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=
            ${import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT}`,
            method: "post",
            data: { "contents": [{ "parts": [{ "text": data }] }] }
        });
        // console.log(response.data.candidates[0].content.parts[0].text);
        return response.data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.log(error);
    }

}