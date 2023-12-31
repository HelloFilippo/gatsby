import { PokemonData, PokemonsResponse } from './types';

window.Webflow ||= [];
window.Webflow.push(async () => {
  const pokemonsData = await fetchPokemonsData();
  console.log(pokemonsData);
  const itemTemplate = document.querySelector<HTMLAnchorElement>('[data-element="pokemon-item"]');
  if (!itemTemplate) return;

  const itemsList = itemTemplate.parentElement!;

  itemTemplate.remove();
  const pokemonItems = pokemonsData.map(({ id, name, sprites }) => {
    const item = itemTemplate.cloneNode(true) as HTMLAnchorElement;
    const imageElement = item.querySelector<HTMLImageElement>('[data-element="pokemon-image"]');
    const idElement = item.querySelector<HTMLDivElement>('[data-element="pokemon-id"]');
    const nameElement = item.querySelector<HTMLDivElement>('[data-element="pokemon-name"]');

    if (imageElement) {
      imageElement.src = sprites.other.dream_world.front_default;
    }
    if (idElement) {
      idElement.textContent = id.toString();
    }
    if (nameElement) {
      nameElement.textContent = name.toString();
    }
    item.removeAttribute('data-cloak');
    return item;
  });
  console.log(pokemonItems);
  itemsList.append(...pokemonItems);
});

const fetchPokemonsData = async (): Promise<PokemonData[]> => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=5&offset=0');

    const data: PokemonsResponse = await response.json();
    console.log(data);
    const pokemonsData = (
      await Promise.all(
        data.results.map(async ({ url }) => {
          try {
            const response = await fetch(url);
            const data: PokemonData = await response.json();
            return data;
          } catch (err) {
            return null;
          }
        })
      )
    ).filter(Boolean);
    return pokemonsData;
  } catch (err) {
    return [];
  }
};
