<script>

const scopes = ["user-library-read"];

const client_id = "client_id=f9a04e3cfd75409c9706f8067e8f1521";
const response_type = "response_type=code";
const redirect_uri = "redirect_uri=http://localhost:5173/menu/";
const scope = `scope=${scopes.join(" ")}`;

const queryParams = [client_id, response_type, redirect_uri, scope];

const authUrl = `https://accounts.spotify.com/authorize?${queryParams.join("&")}`;

console.log(authUrl);

async function authenticate() {
  const authWindow = window.open(authUrl, 'Login with Spotify', 'width=800, height=600')
}

</script>
<h1>Spotify to Youtube Music song Migration</h1>

<button on:click={authenticate}>Login</button>