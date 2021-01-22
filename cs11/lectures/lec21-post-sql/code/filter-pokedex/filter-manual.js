/**
 * Takes a json parameter and returns a JSON
 * matching the following conditions:
 *   - has a name containing letter 'a',
 *   - has an id less than 145,
 *   - has a weakness of 'rock'.
 * the returned JSON is sorted by type (breaks tie by name
 * alphabetically descending),
 * and only name, id, type, and weakness is returned.
 */
function filterJSON(pokemonJSON) {
  let resultJSON = {"pokemon" : []};
  let pokemons = JSON.parse(pokemonJSON).pokemon;
  for (let i = 0; i < pokemons.length; i++) {
    let pokemon = pokemons.pokemon[i];
    let name = pokemon.name;
    let id = pokemon.id;
    let weakness = pokemon.weakness;
    let type = pokemon.type;
    if (name.includes("r") && id < 145 && weakness == "rock") {
      resultJSON.pokemon.push({
        "name" : name,
        "id" : id,
        "type" : type,
        "weakness" : weakness
      });
    }
  }

  // Bubble Sort!!! sort by TYPE and break ties by name reverse-alphabetically
  let length = resultJSON.pokemon.length;
  for (let i = length - 1; i >= 0; i--) {
    for (let j = 1; j <= i; j++) {
      let firstPokemon = resultJSON.pokemon[j - 1];
      let secondPokemon = resultJSON.pokemon[j];
      if (firstPokemon.type > secondPokemon.type) {
        let temp = firstPokemon;
        firstPokemon = secondPokemon;
        secondPokemon = temp;
      } else if (firstPokemon.type == secondPokemon.type) { // handles tie
        if (firstPokemon.name < secondPokemon.name) {
            let temp = firstPokemon;
            firstPokemon = secondPokemon;
            secondPokemon = temp;
        }
      }
    }
  }
  return resultJSON;
}
