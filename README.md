# OBS Source Status

This widget displays the current status of the specified OBS sources.

It can be used as an overlay and/or as a dock.

You can use any icons from <https://fonts.google.com/icons>

![Audio Mixer](/assets/audio_mixer.png)

![Dock](/assets/dock.png)

## Requirements

- [OBS 28.0.2](https://github.com/obsproject/obs-studio/releases/tag/28.0.2) or later
- [obs-websocket v5.0.1](https://github.com/obsproject/obs-websocket/releases/tag/5.0.1) or later (bundled with OBS 28+ by default)

## Configuration

1. Edit ```config_example.js``` to configure the widget then rename it to ```config.js```
1. Rename sources' name with the name displayed on OBS Studio
1. Create a browser source to `obs.html`
1. Set its `width` to `50` times the number of sources you want to display (so `350` in the example above) and its `height` to `50`
1. (Optional) You can add custom css to each icon in the `config.js` file.  
    e.g. rotating the cam 90° clockwise:
    ```js
    custom_css: 'transform: rotate(90deg) scaleY(-1);'
    ```
1. (Optional) To control the layout of the icons, in obs browser source properties add the following to the `Custom CSS` panel
```css
#obs_div {
    flex-direction: column; // Default: row | Available row-reverse / column / column-reverse
}
```
