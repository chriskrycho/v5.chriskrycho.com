import Preferences from './Preferences.svelte'
import { selectorFor } from './utils'

const preferences = new Preferences({
   target: document.querySelector(selectorFor('preferences')),
})

export default preferences
