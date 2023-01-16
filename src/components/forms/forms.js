import pokedex from './pokedex.png';
import React from 'react';

//Intial instructions
const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

//Forms
const formResult = document.querySelector('.form');
const inputResult = document.querySelector('.input_search');


//Initial pokemon
let searchPokemon = 1;

//get ID of the pokemon and return this
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if(APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }
};
//result of fetchPokemon and return pokemon into API
const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';
    
    const data = await fetchPokemon(pokemon);
    if(data)
    {pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    inputResult.value = '';
    searchPokemon = data.id;}
    else{
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not Found';
        pokemonNumber.innerHTML = '';
    }
}
//Inicialization of site
renderPokemon(searchPokemon);

//Confirm button enter to return a sprite and pokemon name or number
formResult.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(inputResult.value.toLowerCase());
});

//Previous button
function buttonPrev () {
    if(searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    } else{
        searchPokemon = 649;
    }
}

//Next button
function buttonNext() {
    if(searchPokemon < 649){
        searchPokemon =+ searchPokemon + 1;
        renderPokemon(searchPokemon);
    } else{
        searchPokemon = 1;
    }
};

const formsPokedex = () => {
    return (
        <>
        <form className="form">
            <img src={pokedex} alt="pokemon" class="pokemon_image"/>
        <h1 class="pokemon_data">
            <span class="pokemon_number"></span>
            <span class="pokemon_name"></span>
        </h1>

        <form class="form">
            <input
            type="search"
            class="input_search"
            placeholder="Name or Number"
            required
            />
        </form>
        <div class='buttons'>
            <button class="button btn-prev" onClick={buttonPrev()}>Prev &lt;</button>
            <button class="button btn-next" onClick={buttonNext()}>Next &gt;</button>
        </div>
        <img src="./images/pokedex.png" class="pokedex"/>
        </form>
        </>
        
    )
}


export default formsPokedex;
//Uptadet By @Henriiquerick