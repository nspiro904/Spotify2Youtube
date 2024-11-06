<script>
   export let data;

   const {songs} = data;
      
</script>
<h1>Migrate {songs.length} Songs</h1>

{#each songs as song }
   <p>{song.track.name} - {song.track.artists}</p>
{/each}