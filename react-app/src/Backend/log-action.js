// netlify/functions/log-action.js
export async function handler(event, context) {
  try {
    const params = event.queryStringParameters || {};
    const page = params.page || "unknown";
    const action = params.action || "n/a";

    console.log(`➡ User action log: page=${page}, action=${action}`);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, page, action }),
    };
  } catch (error) {
    console.error("Log function error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
}
