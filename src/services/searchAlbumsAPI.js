// It is assync - returns a promise that needs to be solved
const searchAlbumsAPI = async (artist) => {
  // It encondes the received string to a format that the itune`s Api requires
  const artistNameURL = encodeURI(artist).replaceAll('%20', '+');
  // Sets the url with the variable artist name as the param to bee search
  const getAlbumsAPI = `https://itunes.apple.com/search?entity=album&term=${artistNameURL}&attribute=allArtistTerm`;

  // It makes the requisition for the API
  const APIResponse = await fetch(getAlbumsAPI);

  // It turns the response into an Js object and destructures the key results
  const { results } = await APIResponse.json();

  // It gets the values inside each key
  const response = results.map(
    ({
      artistId,
      artistName,
      collectionId,
      collectionName,
      collectionPrice,
      artworkUrl100,
      releaseDate,
      trackCount,
    }) => ({
      artistId,
      artistName,
      collectionId,
      collectionName,
      collectionPrice,
      artworkUrl100,
      releaseDate,
      trackCount,
    }),
  );
  return response;
};

export default searchAlbumsAPI;
