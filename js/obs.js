let hmtl_elements = {};
let obs;

window.onload = function() {
    for (const [key, value] of Object.entries(config.obs.sources)) {
        hmtl_elements[key] = document.getElementById(key);
    }

    obs = new OBSWebSocket();
    connectObsWs(config.obs.ws_server_ip, config.obs.ws_server_port, config.obs.ws_server_password)
        .then(() => {
            // Check Sources' State upon connection
            try {
                for (const [key, value] of Object.entries(config.obs.sources)) {
                    sendGetMute(key);
                }
            } catch (error) {
                console.log(error);
            }

            // Check Source State on change
            obs.on("InputMuteStateChanged", data => {
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

async function connectObsWs(address, port, password) {
    try {
        const {
            obsWebSocketVersion,
            negotiatedRpcVersion
        } = await obs.connect('ws://' + address + ':' + port, password);
        console.log(`Connected to server ${obsWebSocketVersion} (using RPC ${negotiatedRpcVersion})`);
    } catch (error) {
        console.error('Failed to connect', error.code, error.message);
    }
}

function sendGetMute(source) {
    try {
        obs.call("GetInputMute", {
            inputName: config.obs.sources[source].name
        }).then(data => {
            try {
                setMuteStatus(data.inputMuted, source);
            } catch (error) {
                console.log(error)
            }
        });
    } catch (error) {
        console.log(error)
    }
}

function checkMuteState(data, source) {
    if (data.inputName == config.obs.sources[source].name) {
        setMuteStatus(data.inputMuted, source);
    }
}

function setMuteStatus(muted, source) {
    if (muted) {
        hmtl_elements[source].innerHTML = config.obs.sources[source].icons.off;
        hmtl_elements[source].style.visibility = "visible";
    } else {
        hmtl_elements[source].innerHTML = config.obs.sources[source].icons.on;
        if (!config.display_icon_when_source_is_on) {
            hmtl_elements[source].style.visibility = "hidden";
        }
    }
}