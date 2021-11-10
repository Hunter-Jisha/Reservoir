<script>
import { onMount } from "svelte";

var sessionId

onMount(async () => {
    sessionId = window.localStorage.getItem("sessionId")
})
</script>
<p>{sessionId}</p>