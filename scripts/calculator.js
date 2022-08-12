const itemList1 = document.getElementById('list1');
const itemList2 = document.getElementById('list2');

var items1 = itemList1.getElementsByClassName('trade-selectionbox');
var items2 = itemList2.getElementsByClassName('trade-selectionbox');

const valueText1 = document.getElementById('Value1');
const valueText2 = document.getElementById('Value2');

const itemList = document.getElementById('itempopuplist');

const popup = document.getElementById('popup');

var selected = document.getElementById('nothing');

var Value1 = 0;
var Value2 = 0;

let Data = [];

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

const loadData = async () => {

    try {

        await fetch('https://opensheet.elk.sh/1T9-q3RWbYz_m9g5RPygdAC4vod09XJIRUcN0ijkuSts/1')
        .then(result => result.json())
        .then((output) => {
    
            console.log(output);

            Data = output;
    
            displayItems(output);
    
            localStorage["DataBackup"] = JSON.stringify(output);
    
        })

    } catch (error) {

        console.log(error);

        Data = JSON.parse(localStorage["DataBackup"]);

        console.log(Data);
    
        if (Array.isArray(Data)) {
    
            displayItems(Data);

        }

    }

};

const displayItems = (characters) => {

    const htmlString = characters
        .map((character) => {

            return `
            <div id="${character.ID}" class="trade-selectionbox">

                <div id="${character.Header1}" class="text" style="font-size: 1.8rem; font-weight: 600;">${character.Header1}</div>
                <div style="padding-top: 1rem"></div>
                <img id="trade-selectionimage" src="${character.Image1}" />

            </div>
        `;
        })
    .join(''); 

    itemList.innerHTML = itemList.innerHTML + htmlString

    for (const item of itemList.getElementsByClassName('trade-selectionbox')){
    
        item.addEventListener('click', (event) => {

            if ('nothing_trade_selection_pick' == String(item.id)) {

                selected.innerHTML = '<img id="trade-selectionimage" src="https://media.discordapp.net/attachments/928207094233059388/995439861693690017/New_Project_41.png" alt="-"></div>'

                selected.id = 'pick';

            }

            for (const Table of Data){

                if (String(Table.ID) == String(item.id)) {

                    selected.innerHTML = '<div class="text" style="font-size: 2rem; font-weight: 600;">' + Table.Header1 + '</div><img id="trade-selectionimage" src="' + Table.Image1 + '" /><div class="text" style="font-size: 1.5rem; font-weight: 600; color: rgb(0, 255, 0);">Value: ' + Table.Value2 +  '</div>'

                    selected.id = Table.ID;

                }

            }
            
            setValueText()
    
            popup.style.display = 'none';
            selected = null;
    
        });
    
    }

};

const setValueText = async () => {

    Value1 = 0;
    Value2 = 0;

    for (const item of items1){

        for (const Table of Data){

            if (String(Table.ID) == String(item.id)) {

                Value1 = Value1 + parseFloat(Table.Value.replace(/,/g, ''))

            }

        } 
        
    } 

    for (const item of items2){

        for (const Table of Data){

            if (String(Table.ID) == String(item.id)) {

                Value2 = Value2 + parseFloat(Table.Value.replace(/,/g, ''))

            }

        } 
        
    } 

    valueText1.innerHTML = 'Value: ' + Value1.toLocaleString("en-US");
    valueText2.innerHTML = 'Value: ' + Value2.toLocaleString("en-US");

};   

for (const item of items1){
    
    item.addEventListener('click', (event) => {

        selected = item;

        popup.style.display = 'block';

    });

}

for (const item of items2){
    
    item.addEventListener('click', (event) => {

        selected = item;

        popup.style.display = 'block';

    });

}

loadData();

setValueText();