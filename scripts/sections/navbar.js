const fragment = new URLSearchParams(window.location.hash.slice(1));
const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];

console.log(accessToken);
console.log(tokenType);

document.addEventListener('readystatechange', event => { 

    if (event.target.readyState === "interactive") {

        fetch("/sections/navbar.html")
        .then((response) => response.text())
        .then((html) => {

            document.getElementById("navbar").innerHTML = html;

            if (localStorage["SiteToken"]) {
                if (localStorage["SiteTokenType"]) {

                    console.log("Logged In | Cookie");
            
                    document.getElementById("navbar-textbutton").innerText = "Logged In";

                };
            };
    
            if (accessToken) {

                console.log("Logged In | Discord");
    
                localStorage["SiteToken"] = accessToken;

                localStorage["SiteTokenType"] = tokenType;

                document.getElementById("navbar-textbutton").innerText = "Logged In";

                window.location.href = window.location.href.split('?')[0];

            };

        })
        .catch((error) => {
            console.warn(error);
        });

    };

});

/*
fetch('https://discord.com/api/users/@me', {
headers: {
    authorization: `${tokenType} ${accessToken}`,
},
})
.then(result => result.json())
.then(response => {
    console.log(response);
    const { username, discriminator, avatar, id} = response;
    //set the welcome username string
    document.getElementById('name').innerText = ` ${username}#${discriminator}`;

    //set the avatar image by constructing a url to access discord's cdn
    document.getElementById("avatar").src = `https://cdn.discordapp.com/avatars/${id}/${avatar}.jpg`;
})
.catch(console.error);
*/