

export const load = async ({ url, fetch }) => {
  const code = url.searchParams.get('code');

  const cid = 'f9a04e3cfd75409c9706f8067e8f1521';
  const csecret = 'da59d0bb7d07435a84c801f5bf8b1c25';

  const encodedStuff = btoa(`${cid}:${csecret}`);

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: (new URLSearchParams({ grant_type: "authorization_code", code, redirect_uri: "http://localhost:5173/menu/" })).toString(),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `Basic ${encodedStuff}`
    }
  });


  const data = await response.json();
    

  const limit = 50;
  

  let fetchTracksResponse = await fetch(`https://api.spotify.com/v1/me/tracks?limit=${limit}`, {
    headers: {
      "Authorization": `Bearer ${data.access_token}`
    }
  })

  let trackResponse = await fetchTracksResponse.json();

  let songs = trackResponse.items;
    
  let pageCounter = 1;

  while(songs.length % 50 == 0) {

    fetchTracksResponse = await fetch(`https://api.spotify.com/v1/me/tracks?limit=${limit}&offset=${limit * pageCounter}`, {
      headers: {
        "Authorization": `Bearer ${data.access_token}`
      }
    })
  
    trackResponse = await fetchTracksResponse.json();

    if(trackResponse.items) songs = songs.concat(trackResponse.items);
    ++pageCounter;
  }

return {songs};
}