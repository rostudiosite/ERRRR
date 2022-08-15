const charactersList = document.getElementById('tutorialList');
const searchBar = document.getElementById('searchBar');
let hpCharacters = [
    {"name": "What are unions?", "image": '/media/uniontutorialicon.png', "link": "/buildingtutorials/unions", "skill": "(Normal)"},
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