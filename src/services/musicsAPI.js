// It is assync - returns a promise that needs to be solved
const getMusics = async (id) => {
  // It requires an Api response searching for an specifc ID AS A PARAM IN THE uRL
  const request = await fetch(`https://itunes.apple.com/lookup?id=${id}&entity=song`);

  // It turns the response into an js object
  const requestJson = await request.json();
  return requestJson.results;
};

export default getMusics;
