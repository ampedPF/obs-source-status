// var obsIcon;
let elA, elB, elC, elD;
let config;
var obs;

window.onload = function () {
    $.getJSON('./config.json', function (res) {
            config = res;
        })
        .fail(function () {
            console.log("An error has occurred while loading config.json file.");
        }).then(() => {
            elA = document.getElementById('elA');
            elB = document.getElementById('elB');
            elC = document.getElementById('elC');
            elD = document.getElementById('elD');
            console.log(config);

            obs = new OBSWebSocket();
            obs.connect({
                    address: config.obs.address + ":" + config.obs.port,
                    password: config.obs.password
                })
                .catch(err => { // Promise convention dicates you have a catch on every chain.
                    console.log(err);
                });

            obs.on('ConnectionOpened', () => {
                try {
                    sendGetMute(config.obs.sources.a, elA);
                    sendGetMute(config.obs.sources.b, elB);
                    sendGetMute(config.obs.sources.c, elC);
                    sendGetMute(config.obs.sources.d, elD);
                } catch (error) {
                    console.log(error)
                }
            });

            obs.on("SourceMuteStateChanged", data => {
                try {
                    checkMuteState(data, config.obs.sources.a, elA);
                    checkMuteState(data, config.obs.sources.b, elB);
                    checkMuteState(data, config.obs.sources.c, elC);
                    checkMuteState(data, config.obs.sources.d, elD);
                } catch (error) {
                    console.log(error)
                }
            });
        });

}

function setMuteStatus(muted, source, element) {
    if (muted) {
        element.innerHTML = source.icons.muted;
        element.style.visibility = "visible";
    } else {
        element.innerHTML = source.icons.unmuted;
        if (!config.display_unmuted) {
            element.style.visibility = "hidden";
        }
    }
}

function sendGetMute(source, element) {
    obs.send("GetMute", {
        source: source.name
    }).then(data => {
        try {
            setMuteStatus(data.muted, source, element);
        } catch (error) {
            console.log(error)
        }
    });
}

function checkMuteState(data, source, element) {
    if (data.sourceName == source.name) {
        setMuteStatus(data.muted, source, element);
    }
}