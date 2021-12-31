<script lang="ts">
   import { assert } from './utils';

   export let onSetReadingMode: (newValue: boolean) => void;
   export let inReadingMode: boolean;
</script>

<fieldset>
   <label for="reading-mode">Reading mode</label>
   <input
      type="checkbox"
      name="reading-mode"
      id="reading-mode"
      checked={inReadingMode}
      on:change={(event) => onSetReadingMode(event.currentTarget.checked)}
   />
</fieldset>
