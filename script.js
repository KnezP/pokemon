const pokeApiUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";
const searchButton = document.getElementById("search-button");
const input = document.getElementById("search-input");
const resultsContainer = document.getElementById("results");
const fetchDataFromPokeAPI = async (pokemonIdentifier) => {
    try {
        const response = await fetch(`${pokeApiUrl}${pokemonIdentifier}`);
        const data = await response.json();
        handlePokeAPIData(data);
    } catch (error) {
        console.error("Error fetching data from PokeAPI:", error);
        alert("Pokemon not found");
    }
};

const handlePokeAPIData = (data) => {
    const { name, id, height, weight, stats, sprites, types } = data;
    const pictureDiv = document.getElementById("picture");
    pictureDiv.innerText = "";
    const img = document.createElement("img");
    img.src = sprites.front_default;
    img.alt = name;
    img.id = "sprite";
    const capName = name.charAt(0).toUpperCase() + name.slice(1);
    pictureDiv.appendChild(img);
    document.getElementById("pokemon-name").textContent = `${capName}\u00A0`;
    document.getElementById("pokemon-id").textContent = `#${id}`;
    document.getElementById("weight").textContent = `Weight: ${weight}\u00A0`;
    document.getElementById("height").textContent = `Height: ${height}`;
    const typesContainer = document.getElementById("types");
    typesContainer.innerHTML = "";
    types.forEach(type => {
        const typeElement = document.createElement("span");
        typeElement.textContent = `${type.type.name}\u00A0`;
        typesContainer.appendChild(typeElement);
    });
    document.getElementById("hp").textContent = stats[0].base_stat;
    document.getElementById("attack").textContent = stats[1].base_stat;
    document.getElementById("defense").textContent = stats[2].base_stat;
    document.getElementById("special-attack").textContent = stats[3].base_stat;
    document.getElementById("special-defense").textContent = stats[4].base_stat;
    document.getElementById("speed").textContent = stats[5].base_stat;

};

const search = () => {
    const pokemonIdentifier = input.value.trim().toLowerCase();
    if (pokemonIdentifier !== "") {
        fetchDataFromPokeAPI(pokemonIdentifier);
    }
};

searchButton.addEventListener("click", search);

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        search();
    }
});
