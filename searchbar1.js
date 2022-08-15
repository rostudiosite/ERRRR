const charactersList = document.getElementById('tutorialList');
const searchBar = document.getElementById('searchBar');
let hpCharacters = [
    {"name": "How to make an e to enter vehicle?", "image": '/media/tutorial1.png', "link": "/scriptingtutorials/e-to-enter-vehicle", "skill": "(Normal)"},
    {"name": "How to make a shift to sprint?", "image": '/media/tutorial2.png', "link": "/scriptingtutorials/shift-to-sprint", "skill": "(Normal)"},
    {"name": "How to make a day / night cycle?", "image": '/media/tutorial3.png', "link": "/scriptingtutorials/day-night-cycle", "skill": "(Simple)"},
    {"name": "How to make a coin animation?", "image": '/media/tutorial4.png', "link": "/scriptingtutorials/coin-animation", "skill": "(Simple)"},
    {"name": "How to make a clickable teleporter", "image": '/media/tutorial5.png', "link": "/scriptingtutorials/clickable-teleporter", "skill": "(Simple)"},
    {"name": "What are modules?", "image": '/media/module_script.png', "link": "/scriptingtutorials/modules", "skill": "(Medium)"},
];


searchBar.addEventListener('keyup', (e) => {
    const searchString = (e.target.value.toLowerCase()).trim();

    const filteredCharacters = hpCharacters.filter((character) => {
        return (
            character.name.toLowerCase().includes(searchString)
        );
    });
    displayCharacters(filteredCharacters);
});

const displayCharacters = (characters) => {
    const htmlString = characters
        .map((character) => {
            return `
            <div class="selectionbox">
                <a href="${character.link}">
                    <h2>${character.name}</h2>
                    <img id="selectionimage" src="${character.image}" />
                    <h3>${character.skill}</h3>
                </a>
            </div>
        `;
        })
        .join(''); 
    charactersList.innerHTML = htmlString;
};

displayCharacters(hpCharacters);