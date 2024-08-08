import axios from 'axios';


async function Texttospeech(param) {


    
    const item  = param.item;
    console.log(item);
    try {
        console.log("try");
        const response = await axios({
            url: 'https://ezmh9t6vbvhitgly.us-east-1.aws.endpoints.huggingface.cloud',
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer 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',
                'Content-Type': 'application/json'
            },
            data: {
                "inputs": {
                    "text": item,
                    "language": "en",
                    "model_id": "3ccb64b4-8a8b-4abe-ab73-40a2ea307b08"
                }
            }
        });
        console.log(response.data.s3_path);
        return response.data.s3_path;
    }
    catch (error) {
        console.log(error);
    }
}
export default Texttospeech;
