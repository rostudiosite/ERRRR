const charactersList = document.getElementById('list');
const searchBar = document.getElementById('searchBar');

let Data = null;

var setInnerHTML = function(elm, html) {
    elm.innerHTML = html;
    Array.from(elm.querySelectorAll("script")).forEach( oldScript => {
      const newScript = document.createElement("script");
      Array.from(oldScript.attributes)
        .forEach( attr => newScript.setAttribute(attr.name, attr.value) );
      newScript.appendChild(document.createTextNode(oldScript.innerHTML));
      oldScript.parentNode.replaceChild(newScript, oldScript);
    });
}

function getJSON(url, success) {

    var ud = '_' + +new Date,
        script = document.createElement('script'),
        head = document.getElementsByTagName('head')[0] 
               || document.documentElement;

    window[ud] = function(data) {
        head.removeChild(script);
        success && success(data);
    };

    script.src = url.replace('callback=?', 'callback=' + ud);
    head.appendChild(script);

}

searchBar.addEventListener('keyup', (e) => {
    const searchString = (e.target.value.toLowerCase()).trim();

    const filteredCharacters = Data.filter((character) => {
        return (
            character.Name.toLowerCase().includes(searchString)
        );
    });
    displayCharacters(filteredCharacters);
});

const loadData = async () => {

    try {

        await fetch('https://opensheet.elk.sh/1T9-q3RWbYz_m9g5RPygdAC4vod09XJIRUcN0ijkuSts/1')
        .then(result => result.json())
        .then((output) => {
    
            console.log(output);
    
            displayCharacters(output);
    
            localStorage["DataBackup"] = JSON.stringify(output);
    
        })

    } catch (error) {

        console.log(error);

        Data = JSON.parse(localStorage["DataBackup"]);

        console.log(Data);
    
        if (Array.isArray(Data)) {
    
            displayCharacters(Data);

        }

    }

};

const displayCharacters = (characters) => {

    const htmlString = characters
        .map((character) => {
            return `
            <div class="selectionbox">
                <a href="${character.Link}">
                    <div class="text" style="font-size: 2.5rem; font-weight: 600;">${character.Header1}</div>
                    <img id="selectionimage" src="${character.Image1}" />
                    <div class="text" style="font-size: 2rem; font-weight: 600; color: rgb(0, 255, 0);">Value: ${character.Value2}</div>
                </a>
            </div>
        `;
        })
        .join(''); 

    setInnerHTML(charactersList, htmlString);

};

loadData(); 