# &lt;lucency-slider&gt;

A tiny web component for inputting translucency/opacity.

Demo: https://luncheon.github.io/lucency-slider/

[<img alt="image" height="20px" src="https://luncheon.github.io/lucency-slider/image.png">](https://luncheon.github.io/lucency-slider/)

## Usage

```html
<link rel="stylesheet" href="lucency-slider/lucency-slider.css">
<script type="module" src="lucency-slider/lucency-slider.js"></script>
<lucency-slider style="color: rebeccapurple;"></lucency-slider>
```

## HTML Attributes

```html
<lucency-slider value="100" min="0" max="100" step="1"></lucency-slider>
```

| Name     | Type                     | Default | Description        |
| -------- | ------------------------ | ------: | ------------------ |
| disabled | boolean (existence)      |   false | Immutability       |
| max      | number [0, 100]          |     100 | Upper bound        |
| min      | number [0, 100]          |       0 | Lower bound        |
| name     | string                   |         | Form control name  |
| step     | number [0, 100] or `any` |       1 | Granularity        |
| value    | number [0, 100]          |     100 | Opacity percentage |
| vertical | boolean (existence)      |   false | Orientation        |

## DOM Element Properties

```js
const lucencySlider = document.createElement("lucency-slider");
lucencySlider.valueAsNumber = 100;
```

The attributes listed above can be used as properties with the same names.

| Name     | Type              | Description        |
| -------- | ----------------- | ------------------ |
| disabled | boolean           | Immutability       |
| max      | number            | Upper bound        |
| min      | number            | Lower bound        |
| name     | string            | Form control name  |
| step     | number or `"any"` | Granularity        |
| value    | string            | Opacity percentage |
| vertical | boolean           | Orientation        |

Additionally, `valueAsNumber` can be used in the same way as `HTMLInputElement`.

| Name          | Type   | Description                    |
| ------------- | ------ | ------------------------------ |
| valueAsNumber | number | Opacity percentage as a number |

## DOM Events

```js
const lucencySlider = document.createElement("lucency-slider");
lucencySlider.addEventListener("input", event => {
  document.body.style.background = `rgb(from rebeccapurple r g b / ${event.target.valueAsNumber}%)`;
});
```

| Type   | Description                                      |
| ------ | ------------------------------------------------ |
| input  | User modified the opacity                        |
| change | User modified the opacity and released the thumb |

## Styling

```html
<lucency-slicer class="slider1"></lucency-slider>

<style>
  .slider1 {
    /* slider color */
    color: rebeccapurple;

    /* checker grid size is based on line-height (1/4 lh) */
    line-height: 24px;

    /* checker grid colors */
    /* default: */
    --checker-color-1: #ddd;
    --checker-color-2: #fff;

    &::part(thumb) {
      /* where your skills come into play */
      /* default: */
      inline-size: 4px;
      border-radius: 9px;
      border: 1px solid #fff;
      box-shadow: 0 0 0 1px #333;
    }

    &:hover:not(:active):not([disabled])::part(thumb) {
      /* recommended to highlight */
      /* default: */
      border-color: #ddd;
    }

    &[disabled] {
      /* recommended to lowlight */
      /* default: */
      &::part(thumb) {
        box-shadow: 0 0 0 1px #888;
      }
    }
  }
</style>
```

## License

[WTFPL](http://www.wtfpl.net)


## Sibling Packages

- [reinvented-color-wheel](https://github.com/luncheon/reinvented-color-wheel): HSV color wheel
- [lch-color-wheel](https://github.com/luncheon/lch-color-wheel): L\*C\*h color wheel
