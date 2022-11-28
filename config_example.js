const config = {
    obs: {
        ws_server_ip: 'WS_SERVER_IP',
        ws_server_port: 'WS_SERVER_PORT',
        ws_server_password: 'WS_SERVER_PASSWORD', // Leave empty if authentication is not enabled
        sources: {
            game: {
                state_type: 'mute',
                name: 'AUDIO_SOURCE_GAME',
                icons: { // https://fonts.google.com/icons
                    off: 'videogame_asset_off',
                    on: 'videogame_asset'
                }
            },
            music: {
                state_type: 'mute',
                name: 'AUDIO_SOURCE_MUSIC',
                icons: {
                    off: 'music_off',
                    on: 'music_note'
                }
            },
            comms: {
                state_type: 'mute',
                name: 'AUDIO_SOURCE_COMMS',
                icons: {
                    off: 'group_off',
                    on: 'group'
                }
            },
            mic: {
                state_type: 'mute',
                name: 'AUDIO_SOURCE_MIC',
                icons: {
                    off: 'mic_off',
                    on: 'mic_none'
                }
            },
            desktop: {
                state_type: 'mute',
                name: 'AUDIO_SOURCE_DESKTOP',
                icons: {
                    off: 'volume_off',
                    on: 'volume_up'
                }
            },
            facecam: {
                state_type: 'show',
                name: 'VIDEO_SOURCE_FACECAM',
                icons: {
                    off: 'videocam_off',
                    on: 'videocam'
                }
            },
            overhead: {
                state_type: 'show',
                name: 'VIDEO_SOURCE_OVERHEAD',
                icons: {
                    off: 'videocam_off',
                    on: 'videocam'
                },
                custom_css: 'transform: rotate(90deg) scaleY(-1);'
            },
        }
    },
    // Set to true to display the on icons.
    display_icon_when_source_is_on: true
};