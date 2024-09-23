// functions/proxy.js
const axios = require('axios');

exports.handler = async (event) => {
    const url = event.queryStringParameters.url;

    if (!url) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Please provide a URL to proxy." }),
        };
    }

    try {
        const response = await axios.get(url);
        return {
            statusCode: 200,
            body: response.data,
            headers: {
                "Content-Type": "text/html",
            },
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Error fetching the URL." }),
        };
    }
};
