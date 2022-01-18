let elements = {};
let config;
var obs;

window.onload = function () {
    $.getJSON('./config.json', function (res) {
            config = res;
        })
        .fail(function () {
            console.log("An error has occurred while loading config.json file.");
        }).then(() => {
            for (const [key, value] of Object.entries(config.obs.sources)) {
                elements[key] = document.getElementById(key);
            }

            obs = new OBSWebSocket();
            obs.connect({
                    address: config.obs.address + ":" + config.obs.port,
                    password: config.obs.password
                })
                .catch(err => { // Promise convention dicates you have a catch on every chain.
                    console.log(err);
                });

            // Checking Source State when connected to the socket
            obs.on('ConnectionOpened', () => {
                try {
                    for (const [key, value] of Object.entries(config.obs.sources)) {
                        sendGetMute(key);
                    }
                } catch (error) {
                    console.log(error)
                }
            });

            // Check Source State on change
            obs.on("SourceMuteStateChanged", data => {
                try {
                    for (const [key, value] of Object.entries(config.obs.sources)) {
                        checkMuteState(data, key);
                    }
                } catch (error) {
                    console.log(error)
                }
            });
        });

}

function setMuteStatus(muted, source) {
    if (muted) {
        elements[source].innerHTML = config.obs.sources[source].icons.muted;
        elements[source].style.visibility = "visible";
    } else {
        elements[source].innerHTML = config.obs.sources[source].icons.unmuted;
        if (!config.display_unmuted) {
            elements[source].style.visibility = "hidden";
        }
    }
}

function sendGetMute(source) {
    obs.send("GetMute", {
        source: config.obs.sources[source].name
    }).then(data => {
        try {
            setMuteStatus(data.muted, source);
        } catch (error) {
            console.log(error)
        }
    });
}

function checkMuteState(data, source) {
    if (data.sourceName == config.obs.sources[source].name) {
        setMuteStatus(data.muted, source);
    }
}