module.exports.handler = async () => {
  try {
    const apiKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMWJlMTg3OGI4MDg3OTUwMDgxNThkYzFiNzYxMThmYiIsIm5iZiI6MTc2NDA2Njg0OC41NjQ5OTk4LCJzdWIiOiI2OTI1ODYyMGVjN2IyMTAwNmVkOWMzYWEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.wbWS-dgSjlECkEiaPmhbnrChoP8xEs_9GCAf4rMa8Eo";
    return { apiKey };
  } catch (error) {
    return { apiKey: null, error: error.message };
  }
};

