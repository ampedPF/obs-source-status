let html_elements = {};
let obs;

window.onload = function() {
    var obs_div = document.getElementById("obs_div");
    for (const [key, value] of Object.entries(config.obs.sources)) {
        var source_el = document.createElement("div");
        source_el.id = key;
        source_el.classList = "mat-icons material-icons-outlined";
        html_elements[key] = source_el;
        obs_div.appendChild(source_el);
    }

    obs = new OBSWebSocket();
    connectObsWs(config.obs.ws_server_ip, config.obs.ws_server_port, config.obs.ws_server_password)
        .then(() => {
            // Check Sources' State upon connection
            try {
                for (const [key, value] of Object.entries(config.obs.sources)) {
                    if (value.state_type == "mute") {
                        getInputMuteState(key);
                    } else if (value.state_type == "show") {
                        getInputSettings(key);
                    }
                }
            } catch (error) {
                console.log(error);
            }

            // Check Source Mute State on change
            obs.on("InputMuteStateChanged", data => {
                console.log("InputMuteStateChanged");
                try {
                    for (const [key, value] of Object.entries(config.obs.sources)) {
                        updateInputMuteState(data, key, value.state_type);
                    }
                } catch (error) {
                    console.log(error);
                }
            });

            // Check Source State on change
            obs.on("SceneItemEnableStateChanged", data => {
                updateInputSourceState(data);
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
                setSourceStateIcon(!data.inputMuted, source);
            } catch (error) {
                console.log(error);
            }
        });
    } catch (error) {
        console.log(error);
    }
}

function getInputSettings(source) {
    try {
        obs.call("GetSourceActive", {
            sourceName: config.obs.sources[source].name
        }).then(data => {
            try {
                setSourceStateIcon(data.videoShowing, source);
            } catch (error) {
                console.log(error);
            }
        });
    } catch (error) {
        console.log(error)
    }
}

function updateInputMuteState(data, source, type) {
    if (data.inputName == config.obs.sources[source].name) {
        if(type == "mute") {
            setSourceStateIcon(!data.inputMuted, source);
        } else if (type == "show") {
            setSourceStateIcon(data.videoShowing, source);
        }
    }
}

function updateInputSourceState(data) {
    try {
        obs.call("GetSceneItemList", {
            sceneName: data.sceneName
        }).then(sceneItemList => {
            try {
                var [sceneItem] = sceneItemList.sceneItems.filter(sceneItem => {
                        return sceneItem.sceneItemId === data.sceneItemId
                    });
                for (const [key, value] of Object.entries(config.obs.sources)){
                    if(config.obs.sources[key].name == sceneItem.sourceName) {
                        setSourceStateIcon(sceneItem.sceneItemEnabled, key);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        });
    } catch (error) {
        console.log(error);
    }
}

function setSourceStateIcon(stateOn, source) {
    if (config.obs.sources[source].custom_css) {
        html_elements[source].style.cssText = config.obs.sources[source].custom_css;
    }
    if (stateOn) {
        html_elements[source].innerHTML = config.obs.sources[source].icons.on;
        if (!config.display_icon_when_source_is_on) {
            html_elements[source].style.visibility = "hidden";
        }
    } else {
        html_elements[source].innerHTML = config.obs.sources[source].icons.off;
        html_elements[source].style.visibility = "visible";
    }
}