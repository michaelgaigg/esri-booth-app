<script>
  import { Router, Link, Route } from "svelte-routing";
  import Landing from "./Landing.svelte";
  import Demo from "./Demo.svelte";
  
  export let url = "";
</script>

<Router {url}>
  <div>
    <Route path="/demo"><Demo /></Route>
    <Route path="/demo/:id"><Demo /></Route>
    <Route path="/"><Landing /></Route>
  </div>
</Router>