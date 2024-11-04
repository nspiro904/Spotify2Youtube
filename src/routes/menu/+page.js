export async function load({ url }) {
  const code = url.searchParams.get('code');

  const cid = 'f9a04e3cfd75409c9706f8067e8f1521';
  const csecret = 'da59d0bb7d07435a84c801f5bf8b1c25';

  const encodedStuff = btoa(`${cid}:${csecret}`);

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: new URLSearchParams({ grant_type: "authorization_code", code, redirect_uri: "http://localhost:5173/menu/" }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `Basic ${encodedStuff}`
    }
  });


  const data = await response.json();
    

  const fetchTracksResponse = await fetch('https://api.spotify.com/v1/me/tracks', {
    headers: {
      "Authorization": `Bearer ${data.access_token}`
    }
  })
  const songs = await fetchTracksResponse.json();
    
return {songs};
}