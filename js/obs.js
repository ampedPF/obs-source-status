// var obsIcon;
let elA, elB, elC, elD;
let config;

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

            const obs = new OBSWebSocket();
            obs.connect({
                address: config.obs.address + ":" + config.obs.port,
                password: config.obs.password
            });

            obs.on('ConnectionOpened', () => {
                try {
                    obs.send("GetMute", {
                        source: config.obs.sources.a.name
                    }).then(data => {
                        checkMute(data.muted, elA, config.obs.sources.a);
                    })
                    obs.send("GetMute", {
                        source: config.obs.sources.b.name
                    }).then(data => {
                        checkMute(data.muted, elB, config.obs.sources.b);
                    })
                    obs.send("GetMute", {
                        source: config.obs.sources.c.name
                    }).then(data => {
                        checkMute(data.muted, elC, config.obs.sources.c);
                    })
                    obs.send("GetMute", {
                        source: config.obs.sources.d.name
                    }).then(data => {
                        checkMute(data.muted, elD, config.obs.sources.d);
                    })
                } catch (error) {
                    console.log(error)
                }
            });

            obs.on("SourceMuteStateChanged", data => {
                if (data.sourceName == config.obs.sources.a.name) {
                    console.log("source A: ", data.muted);
                    checkMute(data.muted, elA, config.obs.sources.a);
                }
            });

            obs.on("SourceMuteStateChanged", data => {
                if (data.sourceName == config.obs.sources.b.name) {
                    console.log("source B: ", data.muted);
                    checkMute(data.muted, elB, config.obs.sources.b);
                }
            });

            obs.on("SourceMuteStateChanged", data => {
                if (data.sourceName == config.obs.sources.c.name) {
                    console.log("source C: ", data.muted);
                    checkMute(data.muted, elC, config.obs.sources.c);
                }
            });

            obs.on("SourceMuteStateChanged", data => {
                if (data.sourceName == config.obs.sources.d.name) {
                    console.log("source D: ", data.muted);
                    checkMute(data.muted, elD, config.obs.sources.d);
                }
            });

        });

}

function checkMute(muted, element, source) {
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