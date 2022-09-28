const config = {
    obs: {
        ws_server_ip: 'WS_SERVER_IP',
        ws_server_port: 'WS_SERVER_PORT',
        ws_server_password: 'WS_SERVER_PASSWORD', // Leave empty if authentication is not enabled
        sources: { // Source key must match the id in obs.html
            game: {
                name: 'AUDIO_SOURCE_GAME',
                icons: { // https://fonts.google.com/icons
                    off: 'videogame_asset_off',
                    on: 'videogame_asset'
                }
            },
            music: {
                name: 'AUDIO_SOURCE_MUSIC',
                icons: {
                    off: 'music_off',
                    on: 'music_note'
                }
            },
            comms: {
                name: 'AUDIO_SOURCE_COMMS',
                icons: {
                    off: 'group_off',
                    on: 'group'
                }
            },
            mic: {
                name: 'AUDIO_SOURCE_MIC',
                icons: {
                    off: 'mic_off',
                    on: 'mic_none'
                }
            }
        }
    },
    // Set to true to display the on icons.
    display_icon_when_source_is_on: true
};