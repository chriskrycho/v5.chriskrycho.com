<script>
   import ColorScheme from './ColorScheme.svelte'
   import Adjust from './Icons/Adjust.svelte'
   import Close from './Icons/Close.svelte'
   import ReadingMode from './ReadingMode.svelte'

   import {
      Theme,
      loadPreferences,
      persistTheme,
      persistReadingMode,
   } from './preferences'

   let showPreferences = false
   let { theme = Theme.System, readingMode = false } = loadPreferences()

   // At initialization, make sure the initial values are set correctly.
   persistTheme(theme)
   persistReadingMode(readingMode)

   const updateTheme = (newTheme: Theme) => {
      persistTheme(newTheme)
      theme = newTheme
   }

   const updateReadingMode = (newValue: boolean) => {
      persistReadingMode(newValue)
      readingMode = newValue
   }
</script>

{#if !showPreferences}
   <button on:click={(_) => (showPreferences = true)} class="preferences-button"><Adjust
      /></button>
{/if}

{#if showPreferences}
   <div class="panel">
      <button
         on:click={(_) => (showPreferences = false)}
         class="preferences-button preferences-button--close"
      >
         <Close />
      </button>

      <form>
         <ColorScheme selectedTheme={theme} onSelectTheme={updateTheme} />
         <ReadingMode inReadingMode={readingMode} onSetReadingMode={updateReadingMode} />
      </form>
   </div>
{/if}
