function getContentTypeClasHtml(i, typeSpans, pokemons,mainType){
    return `
    <div class="borderStyle type-${mainType}">
    ${getContentPokemon(i, typeSpans, pokemons)}
    </div>
    `;
}

function getContentPokemon(i, typeSpans, pokemons){
    return `
    <div class="borderStyle" onclick="showSize(${i})">
        <div>
            <div>
                <span>#${pokemons[i].id}</span>
                <span>${pokemons[i].name}</span>
            </div>
            <img src="${pokemons[i].sprites.front_default}">
        </div>
        <div class="text">${typeSpans}</div>
    </div>
    `;
}

function getTypeClass(type) {                   //dieser code ersetzt alle 18 Zeilen: return 'type-' + type
                                                //1. oder und diese Zeile: <div class="borderStyle ${getTypeClass(mainType)}">
                                                //2. mit dieser Zeile ersetzen: <div class="borderStyle type-${mainType}">
    
    if (type === 'normal') return 'type-normal';
    if (type === 'fire') return 'type-fire';
    if (type === 'water') return 'type-water';
    if (type === 'electric') return 'type-electric';
    if (type === 'grass') return 'type-grass';
    if (type === 'ice') return 'type-ice';
    if (type === 'fighting') return 'type-fighting';
    if (type === 'poison') return 'type-poison';
    if (type === 'ground') return 'type-ground';
    if (type === 'flying') return 'type-flying';
    if (type === 'psychic') return 'type-psychic';
    if (type === 'bug') return 'type-bug';
    if (type === 'rock') return 'type-rock';
    if (type === 'ghost') return 'type-ghost';
    if (type === 'dragon') return 'type-dragon';
    if (type === 'dark') return 'type-dark';
    if (type === 'steel') return 'type-steel';
    if (type === 'fairy') return 'type-fairy';
    return '';
}


function getSizeStyleContent(i) {
    return `
    <div onclick="removeCard()" class="pokemonCard" id="pokemonCard">      
        <div>${pokemons[i].name} ${pokemons[i].id}</div>
        <div class="sizeSpecsBackend"> 
            <img src="${pokemons[i].sprites.front_default}">
            <div class="heightWeightStyle">
                <div class="basic-properties">Height: ${pokemons[i].height}</div> 
                <div class="basic-properties">Weight: ${pokemons[i].weight}</div>
                <div class="basic-properties">Moves: ${pokemons[i].moves[3] ? pokemons[i].moves[3].move.name : 'No move'}</div>
                <div class="basic-properties">Base Experience: ${pokemons[i].base_experience}</div>
                <div class="basic-properties">Abilities: ${pokemons[i].abilities[0].ability.name} 
                </div>
                <div id="progress-bars"></div>
                <div class="leftRightCard">
                    <button onclick="backPokemon(event)"><i class="fa fa-angle-left" style="font-size:26px"></i></button>
                    <button onclick="nextPokemon(event)"><i class="fa fa-angle-right" style="font-size:26px"></i></button>
                </div>                             
            </div>
        </div>
    </div>         
    `;
}



function getStatsContainerHtml(statName, statValue, colorClass, width){
    return `
    <div class="stat-row">
        <span class="stat-name">${statName}: ${statValue}</span>
        <div class="progress">
            <div class="progress-bar ${colorClass}" style="width: ${width}%;">
            </div>
        </div>
    </div>
    `;
}