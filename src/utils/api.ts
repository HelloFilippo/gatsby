import type { PokemonData, PokemonsResponse } from './types';

export const fetchPokemonsData = async (limit: number, offset: number): Promise<PokemonData[]> => {
  try {
    const url = new URL('https://pokeapi.co/api/v2/pokemon');

    url.searchParams.append('limit', limit.toString());
    url.searchParams.append('offset', offset.toString());

    const response = await fetch(url);

    const data: PokemonsResponse = await response.json();

    const pokemonsData = (
      await Promise.all(data.results.map(async ({ url }) => fetchPokemonData(url)))
    ).filter(Boolean);

    return pokemonsData;
  } catch (err) {
    return [];
  }
};

export const fetchPokemonData = async (url: string) => {
  try {
    const response = await fetch(url);
    const data: PokemonData = await response.json();
    return data;
  } catch (err) {
    return null;
  }
};
