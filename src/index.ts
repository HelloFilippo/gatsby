const pokemonsData = [
  {
    id: 1,
    name: 'Ditto',
    sprites: {
      other: {
        dream_world: {
          front_shiny:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/132.png',
        },
      },
    },
  },
  {
    id: 2,
    name: 'Bulbasaur',
    sprites: {
      other: {
        dream_world: {
          front_shiny:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/132.png',
        },
      },
    },
  },
  {
    id: 3,
    name: 'Pikachu',
    sprites: {
      other: {
        dream_world: {
          front_shiny:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/132.png',
        },
      },
    },
  },
];
window.Webflow ||= [];
window.Webflow.push(() => {
  const itemTemplate = document.querySelector<HTMLAnchorElement>('[data-element="pokemon-item"]');
  if (!itemTemplate) return;

  const pokemonItems = pokemonsData.map(({ id, name, sprites }) => {
    const item = itemTemplate.cloneNode(true) as HTMLAnchorElement;
    const imageElement = item.querySelector<HTMLImageElement>('[data-element="pokemon-image"]');
    const idElement = item.querySelector<HTMLDivElement>('[data-element="pokemon-id"]');
    const nameElement = item.querySelector<HTMLDivElement>('[data-element="pokemon-name "]');

    if (imageElement) {
      imageElement.src = sprites.other.dream_world.front_shiny;
    }
    if (idElement) {
      idElement.textContent = id.toString();
    }
    if (nameElement) {
      nameElement.textContent = id.toString();
    }
    return item;
  });
  console.log(pokemonItems);
});
