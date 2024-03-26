/* This page connects to an external API and fetches the data from that API and exports it to be accessible by any of the pages/routes. Server Side Rendering */

import type { PageLoad } from "./$types";

type PokemonIndex = {
  name: string;
  url: string;
};

export type PokemonBasic = PokemonIndex & {
    id: string,
    image: string
}

export const load = (async ({ fetch }) => {
    // Fetch data from external API and set to var 'response'.
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=200");
    // Set var 'json' to the object of 'response.
    const json = await response.json();
    // Adding an ID attribute to our Pokemon object.
    const pokemons: PokemonBasic = json.results.map((pokemon: PokemonIndex) => {
        // Take existing URL attribute of pokemon object, split it into an array, each value seprated by '/'.
        // Per API, url looks like: 'https://pokeapi.co/api/v2/pokemon/1' when referring to a specific pokemon.
        const splitUrl = pokemon.url.split("/");
        // Grabbing the last value (the ID).
        const id = splitUrl[splitUrl.length - 2];

        return {
            name: pokemon.name,
            url: pokemon.url,
            id,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        }
    });

    return {
        // Returning the 'pokemons' object we created on line 16.
        pokemons
    };
}) satisfies PageLoad;
