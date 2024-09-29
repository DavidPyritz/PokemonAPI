const pokemons = []; 
let index = 1;
let currentPokemonIndex = 0;

function searchPokemon() {
    const input = document.getElementById('search_input').value.toLowerCase();
    const resultsContainer = document.getElementById('search_results');
    resultsContainer.innerHTML = '';
    if (input.length < 3) {
        return;
    }
    const filteredPokemons = pokemons.filter(pokemon => 
        pokemon.name.toLowerCase().includes(input)
    );
    const displayedPokemons = filteredPokemons.slice(0, 10);
    displayedPokemons.forEach(pokemon => {
        resultsContainer.innerHTML += `<div onclick="showSize(${pokemon.id - 1})" style="padding: 8px; cursor: pointer;">${pokemon.name}</div>`;
    });
}

async function init() {
    let loader = document.getElementById('loader');
    loader.style.display = 'flex';
    await loadPokemonDetails();
    loader.style.display = 'none';
}

async function loadPokemonDetails() {
    let content = document.getElementById('content');
    await fetchPokemonDetails();
    for (let i = index - 1; i < index + 20 - 1; i++) {
        let pokemon = pokemons[i];
        let typeInfo = pokemon.types.map(typeData => typeData.type.name);
        let mainType = typeInfo[0];
        let typeSpans = typeInfo.map(type => `<span class="${getTypeClass(type)}">${type}</span>`).join(' ');  
        content.innerHTML += getContentTypeClasHtml(i, typeSpans, pokemons, mainType);  
    }
}

async function fetchPokemonDetails() {
    for (let i = index; i < index + 20; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        let response = await fetch(url);
        let pokemonDetails = await response.json();
        pokemons.push(pokemonDetails);
    }
}

function showSize(i) {
    currentPokemonIndex = i;
    let sizeStyleContent = document.getElementById('sizeStyle'); 
    sizeStyleContent.classList.remove('d-none'); 
    sizeStyleContent.innerHTML = getSizeStyleContent(i);
    renderStats(pokemons[i]);
    document.body.classList.add('no-scroll');
}

function renderStats(pokemon) {
    const statsContainer = document.getElementById('progress-bars');
    statsContainer.innerHTML = '';
    const stats = pokemon.stats;  
    stats.forEach(stat => {
        const statHtml = createStatHtml(stat);
        statsContainer.innerHTML += statHtml;
    });
}

function createStatHtml(stat) {
    const statName = stat.stat.name;
    const statValue = stat.base_stat;
    const width = (statValue / 255) * 100;
    let colorClass = '';
    if (statValue >= 100) {
        colorClass = 'progress-bar-high';
    } else if (statValue >= 50) {
        colorClass = 'progress-bar-medium';
    } else {
        colorClass = 'progress-bar-low';
    }
    return getStatsContainerHtml(statName, statValue, colorClass, width);
}

function removeCard() {
    document.getElementById('sizeStyle').classList.add('d-none');
    document.body.classList.remove('no-scroll');
}

function nextPokeContent() {
    index += 20;
    init();
}

function backPokemon(event) {
    event.stopPropagation();
    currentPokemonIndex--;
    if (currentPokemonIndex < 0) {
        currentPokemonIndex = pokemons.length - 1;
    }
    showSize(currentPokemonIndex);
}

function nextPokemon(event) {
    event.stopPropagation();
    currentPokemonIndex++;
    if (currentPokemonIndex >= pokemons.length) {
        currentPokemonIndex = 0;
    }
    showSize(currentPokemonIndex);
}

