const fetchPokemon = () => {
  const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

  const pokemonPromises = []

  for (let i = 1; i < 150; i++) {
    pokemonPromises.push(
      fetch(getPokemonUrl(i)).then(response => response.json())
    )
  }

  Promise.all(pokemonPromises)
    .then(pokemons => {

      const lisPokemons = pokemons.reduce((acc, pokemon) => {
        const types = pokemon.types.map(typeInfo => typeInfo.type.name)
        const pokemonImgUrl = 'https://pokeres.bastionbot.org/images/pokemon'
        acc += `
          <li class="card ${types[0]}">
            <img class="card-image" alt="${pokemon.name}" src="${pokemonImgUrl}/${pokemon.id}.png" />
            <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
            <p class="card-subtitle">${pokemon.types.map(
              typeInfo => typeInfo.type.name).join(' | ')}</p>
          </li>`
        return acc
      }, '')

      const ul = document.querySelector('[data-js="pokedex"]')
      ul.innerHTML = lisPokemons
    })
}

fetchPokemon()