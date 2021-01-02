<script lang="typescript">
   import { assert } from './utils'

   function setReadingMode(event: Event) {
      assert(event.target instanceof HTMLInputElement, 'badly configured reading mode')
      onSetReadingMode(event.target.checked)
   }

   export let onSetReadingMode: (newValue: boolean) => void
   export let inReadingMode: boolean
</script>

<fieldset>
   <label for="reading-mode">Reading mode</label>
   <input
      type="checkbox"
      name="reading-mode"
      id="reading-mode"
      checked={inReadingMode}
      on:change={setReadingMode}
   />
</fieldset>
