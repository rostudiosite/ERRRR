const Header1 = document.getElementById("Header1");
const Text = document.getElementById("Text");
const Image1 = document.getElementById("Image1");

const Value = document.getElementById("Value");
const Price = document.getElementById("Price");
const Max_Speed = document.getElementById("Max_Speed");
const Estimated_Copies = document.getElementById("Estimated_Copies");
const Demand = document.getElementById("Demand");

let Data = [];

let ItemNumber = parseInt(
    document.getElementById("Number").getAttribute("value")
);

console.log("Loading information for " + ItemNumber);

const loadData = async () => {

    try {

        await fetch('https://opensheet.elk.sh/1T9-q3RWbYz_m9g5RPygdAC4vod09XJIRUcN0ijkuSts/1')
        .then(result => result.json())
        .then((output) => {
    
            console.log(output);
    
            Data = output[ItemNumber];
    
            displayInformation();
            displayChart();
    
            localStorage["DataBackup"] = JSON.stringify(output);
    
        })

    } catch (error) {

        console.log(error);

        Data = JSON.parse(localStorage["DataBackup"]);

        console.log(Data);
    
        if (Array.isArray(Data)) {
    
            Data = Data[ItemNumber];
    
            displayInformation();
            displayChart();

        }

    }

    try {

        let result = await fetch("https://opensheet.elk.sh/1T9-q3RWbYz_m9g5RPygdAC4vod09XJIRUcN0ijkuSts/1");
        result = result.json();

        console.log("Loaded");

        Data = result;

        displayInformation();
        displayChart();

        localStorage["DataBackup"] = JSON.stringify(result);

    } catch (error) {

        console.log(error);

        Data = JSON.parse(localStorage["DataBackup"]);

        console.log(Data);
    
        if (Array.isArray(Data)) {
    
            Data = Data[ItemNumber];
    
            displayInformation();
            displayChart();
        }

    }

};

const displayChart = () => {
    const ctx = document.getElementById("myChart").getContext("2d");

    const config = {
        type: "line",
        data: {
            labels: Data.ValueHistoryDate.split(" "),
            datasets: [{
                label: "Value",
                data: Data.ValueHistory.split(" "),
                backgroundColor: ["rgba(255, 99, 132, 0.2)"],
                borderColor: ["rgba(255, 99, 132, 1)"],
                borderWidth: 1,
            }, ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    };

    const myChart = new Chart(ctx, config);
};

const displayInformation = () => {

    const htmlValue = "Value: " + Data.Value;

    Value.innerHTML = htmlValue;

    const htmlPrice = "Price: " + Data.Price;

    Price.innerHTML = htmlPrice;

    const htmlMaxSpeed = "Max Speed: " + Data.MaxSpeed;

    Max_Speed.innerHTML = htmlMaxSpeed;

    const htmlCopies = "Estimated Rarity: " + Data.Rarity;

    Estimated_Copies.innerHTML = htmlCopies;

    const htmlDemand = "Demand: " + Data.Demand;

    Demand.innerHTML = htmlDemand;

    const htmlString = Data.Header1;

    Header1.innerHTML = htmlString;

    const htmlString2 = `<img style="min-width : 16rem; height : 100%; display: block; margin-left: auto; margin-right: auto;" src="${Data.Image1}" alt="Brulee_Image">`;

    Image1.innerHTML = htmlString2;

    const htmlString3 = Data.Text;

    Text.innerHTML = htmlString3;
};

loadData();