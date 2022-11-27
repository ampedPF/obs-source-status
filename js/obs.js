let hmtl_elements = {};
let obs;

window.onload = function() {
    var obs_div = document.getElementById("obs_div");
    for (const [key, value] of Object.entries(config.obs.sources)) {
        var source_el = document.createElement("div");
        source_el.id = key;
        source_el.classList = "mat-icons material-icons-outlined";
        hmtl_elements[key] = source_el;
        obs_div.appendChild(source_el);
    }

    obs = new OBSWebSocket();
    connectObsWs(config.obs.ws_server_ip, config.obs.ws_server_port, config.obs.ws_server_password)
        .then(() => {
            // Check Sources' State upon connection
            try {
                for (const [key, value] of Object.entries(config.obs.sources)) {
                    getInputMuteState(key);
                }
            } catch (error) {
                console.log(error);
            }

            // Check Source State on change
            obs.on("InputMuteStateChanged", data => {
                try {
                    for (const [key, value] of Object.entries(config.obs.sources)) {
                        updateInputMuteState(data, key);
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

function getInputMuteState(source) {
    try {
        obs.call("GetInputMute", {
            inputName: config.obs.sources[source].name
        }).then(data => {
            try {
                setInputMuteIcon(data.inputMuted, source);
            } catch (error) {
                console.log(error)
            }
        });
    } catch (error) {
        console.log(error)
    }
}

function updateInputMuteState(data, source) {
    if (data.inputName == config.obs.sources[source].name) {
        setInputMuteIcon(data.inputMuted, source);
    }
}

function setInputMuteIcon(muted, source) {
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