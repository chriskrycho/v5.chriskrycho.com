<script>
   import { stringIsTheme, Theme } from './preferences'
   import { assert } from './utils'

   const themes = [Theme.System, Theme.Light, Theme.Dark] as const

   const descriptions: Record<Theme, string> = {
      system: 'match <abbr title="operating system">OS</abbr>',
      light: 'light',
      dark: 'dark',
   }

   function selectTheme(event: Event) {
      assert(event.target instanceof HTMLInputElement, 'badly configured theme chooser')
      assert(stringIsTheme(event.target.value), 'badly configured theme component')

      onSelectTheme(event.target.value)
   }

   export let selectedTheme: Theme
   export let onSelectTheme: (newTheme: Theme) => void
</script>

<fieldset>
   <legend>Color scheme</legend>

   {#each themes as theme}
      <label for={theme}>{@html descriptions[theme]}</label>
      <input
         type="radio"
         name="theme"
         id={theme}
         value={theme}
         on:input={selectTheme}
         checked={theme === selectedTheme}
      />
   {/each}
</fieldset>
