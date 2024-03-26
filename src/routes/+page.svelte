<script lang="ts">
  import type { PageData } from "./$types";
  import { generations } from "./generations";
  export let data: PageData;

  // Declarations (Computed Properties) are declared with $: 
  let id: string;
  $: pokemon = data.pokemons.find((pokemon) => pokemon.id === id);
</script>

<div class="generation-container">
  {#each generations as gen (gen.id)}
    <button>{gen.main_region}</button>
  {/each}
</div>

<div class="container">
  {#each data.pokemons as pokemon (pokemon.url)}
    <div class="pokemon-card" on:click={() => alert("Hello from " + pokemon.name)}>
      <img src={pokemon.image} alt={pokemon.name} class="pokemon-img" />
      <h5>{pokemon.id}: {pokemon.name}</h5>
    </div>
  {/each}
</div>

<style>
  .generation-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    width: 75%;
    gap: 10px;
    margin: 5vh auto;
  }

  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 10px;
    width: 75%;
    margin: auto;
  }

  .pokemon-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 10vw;
    height: 15vh;
    border: 1px solid black;
    padding: 10px;
  }

  .pokemon-img {
    width: 8vw;
    max-width: 150px;
  }
</style>
