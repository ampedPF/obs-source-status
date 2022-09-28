# OBS Audio Source Status

This widget displays the current status of a specified audio sources.

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
