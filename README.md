# OBS Audio Source Status

This widget displays the current status of the specified OBS audio sources.

It can be used as an overlay and/or as a projector.

You can use any icons from <https://fonts.google.com/icons>

![Windowed Projector over Audio Mixer](/assets/audio_mixer_and_projector.png)

## Requirements

- OBS 28.0.2 or later

## Configuration

1. Edit ```config_example.js``` to configure the widget then rename it to ```config.js```
1. Rename sources' name with the name displayed on OBS Studio's Audio Mixer
1. Create a browser source to `obs.html`
1. Set its `width` to `200` and its `height` to `50`
1. (Optional) To control the layout of the icons, add the following to the `Custom CSS` panel

```css
#obs_div {
    flex-direction: column; // Default: row | Available row-reverse / column / column-reverse
}
```
