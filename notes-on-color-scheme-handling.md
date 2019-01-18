If I add a bit of JS that flips the UI behavior, it should have basically the following _default_:

| prefers-color-scheme | result |
| -------------------- | ------ |
| none                 | light  |
| light                | light  |
| dark                 | dark   |

Something like this should do the trick: it sets the right default *and* allows the user to toggle afterward.

```js
const ColorSchemePref = { None: 0, Light: 1, Dark: 2 };
const ColorScheme = { Light: 'light', Dark: 'dark' };

function userPreference() {
  const mqLight = window.matchMedia('prefers-color-scheme: light');
  const mqDark = window.matchMedia('prefers-color-scheme: dark');
  return (
    mqLight.matches ? ColorSchemePref.Light
    : mqDark.matches ? ColorSchemePref.Dark
    : ColorSchemePref.None;
  );
}

function clearScheme() {
  Object.values(ColorScheme).forEach(scheme => {
      document.body.classList.removeClass(scheme);
  })
}

function setSchemeTo(scheme) {
  clearScheme();
  document.body.classList.addClass(scheme);
}

function setToggleTo(scheme) {
  const toggle = document.querySelector('#lightMode');
  if (!toggle)
    throw 'Impossible state: no `#lightMode` element';

  toggle.setAttribute('data-mode', scheme);
}

function setInitialColorScheme() {
  const pref = userPreference();
  let scheme;
  switch (pref) {
    case ColorSchemePref.Light:
      scheme = ColorScheme.Light;
      break;

    case ColorSchemePref.Dark:
      scheme = ColorScheme.Dark;
      break;

    case ColorSchemePref.None:
      scheme = ColorScheme.Light;
      break;

    default:
      throw `Impossible state: ${pref}!`;
  }

  setSchemeTo(scheme);
  setToggleTo(scheme);
}

function toggleScheme(event) {
  event.preventDefault();

  setSchemeTo(scheme);
  setToggleTo(scheme);

  return false;
}
```

To make it work, the CSS needs to override `:root` in some way. The basic rule should be something like: media query *and* not-`.light`.