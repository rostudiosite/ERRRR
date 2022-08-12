const ad = document.getElementById('ad');

let AdInfo = [];

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

const loadInfo = async () => {

    fetch('https://opensheet.elk.sh/1YVUKVTNxdLsDT9-_RGMZ5Xy1MiUE1vvljzTfWuk0Rus/1')
    .then(result => result.json())
    .then((output) => {

        console.log('Output: ', output);

        AdInfo = output;

        displayAd(AdInfo);
        
    }).catch(err => console.error(err));

};

const displayAd = (characters) => {

    const randomElement = AdInfo[Math.floor(Math.random() * AdInfo.length)];

    if (randomElement.Type == "Rectangle") {

        ad.innerHTML = '<a href="' + randomElement.Link + '" target="_blank"><img style = "width: 38rem; max-width: 90%;" src="' + randomElement.Image + '" alt="Advertisment"></a>'

    }

    if (randomElement.Type == "Square") {

        ad.innerHTML = '<a href="' + randomElement.Link + '" target="_blank"><img style = "width: 20rem; max-width: 45%;" src="' + randomElement.Image + '" alt="Advertisment"></a>'

    }

};

loadInfo();