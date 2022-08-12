document.addEventListener('readystatechange', event => { 

    if (event.target.readyState === "interactive") {

        if (localStorage["SiteToken"] !== null) {
            if (localStorage["SiteTokenType"] !== null) {

                fetch('https://discord.com/api/users/@me', {

                    headers: {
                        authorization: `${localStorage["SiteTokenType"]} ${localStorage["SiteToken"]}`,
                    },

                })
                .then(result => result.json())
                .then(response => {

                    console.log(response);

                    const { username, discriminator, avatar, id} = response;
                    
                    fetch("/sections/create-ad.html")
                    .then((response) => response.text())
                    .then((html) => {
                
                        document.getElementById("box-create-ad-7p979z8r").innerHTML = html;
        
                        document.getElementById("pfp-create-ad").style.backgroundImage = `https://cdn.discordapp.com/avatars/${id}/${avatar}.jpg`;
                
                    })

                })
                .catch(console.error);

            };
        };

    };

});
