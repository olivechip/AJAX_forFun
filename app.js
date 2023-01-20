const nameButton = document.querySelector(`#nameButton`);
nameButton.addEventListener('click',function(e){
  e.preventDefault();
  printNames();
});

const spriteButton = document.querySelector(`#spriteButton`);
spriteButton.addEventListener('click', function(e){
  const search = document.querySelector(`#spriteSearch`);
  e.preventDefault();
  showSprites(search.value.toLowerCase());
  search.value = ``;
})

async function printNames(){
  const response = await axios.get('https://pokeapi.co/api/v2/pokedex/2/');
  const ul = document.querySelector('#pokemon');
  const pokemonArr = (response.data.pokemon_entries);

  for (let name of pokemonArr){
    const newLI = document.createElement('li')
    newLI.innerText = `${name.pokemon_species.name[0].toUpperCase()}`+ name.pokemon_species.name.slice(1);
    ul.append(newLI);
  }
  nameButton.remove();
}

async function showSprites(pokemon){
  try {
    const sprites = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    pokemonSprite = sprites.data.sprites.front_default;

    const img = document.querySelector(`img`);
    img.src = pokemonSprite;
  } catch(e){
    alert(`Please Enter a Valid Pokemon!`);
  } 
}

