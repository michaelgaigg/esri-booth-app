<script>
  import svelteLogo from './assets/svelte.svg'
  import { setAssetPath } from "@esri/calcite-components";
  setAssetPath("./assets/");
  import "@esri/calcite-components/components/calcite-button";
</script>

<main>
  <div>
    <a href="https://vite.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo" alt="Svelte Logo" />
    </a>
  </div>

  <calcite-button>My button</calcite-button>

</main>

<style>
</style>
