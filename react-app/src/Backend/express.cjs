const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMWJlMTg3OGI4MDg3OTUwMDgxNThkYzFiNzYxMThmYiIsIm5iZiI6MTc2NDA2Njg0OC41NjQ5OTk4LCJzdWIiOiI2OTI1ODYyMGVjN2IyMTAwNmVkOWMzYWEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.wbWS-dgSjlECkEiaPmhbnrChoP8xEs_9GCAf4rMa8Eo'
  }
};

fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));
