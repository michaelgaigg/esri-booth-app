<script>
  import { link } from "svelte-routing";

  import data from "./assets/content/data.json";
  import "@esri/calcite-components/components/calcite-combobox";
  import "@esri/calcite-components/components/calcite-combobox-item";
  import "@esri/calcite-components/components/calcite-button";
  import "@esri/calcite-components/components/calcite-card";
  import "@esri/calcite-components/components/calcite-chip";
  import "@esri/calcite-components/components/calcite-input";
  import "@esri/calcite-components/components/calcite-action";
  import "@esri/calcite-components/components/calcite-tooltip";

  // variables
  let myTimeout;
  let currentVid = 1;
  let playValue = 1;
  let demoLinks = "";
  let linkText = "";
  let bgImage = "url(../src/assets/uc2025.jpg)";
  let esriLogo = "../src/assets/esri-logo.png";
  let videoPlayer = "";
  let demoButton = "";

  let collapsed = false;
  let filterValue = "";
  let filterableValues = [];

  // data
  let links = data.links || [];
  let videos = data.videos || [];
  let demos = data.demos || [];

  let selectedDemo = {};
  let currentTime = 0;
  let currentDemo = 0;

  // Run code when data.json is loaded
  $: if (data) {
    // find all the filterable values (tags), this is used in the filter
    filterableValues = Array.from(new Set(demos.map((demo) => demo[4]))).sort();
    selectedDemo = demos[currentDemo];
    console.log("selectedDemo1", selectedDemo);
  }

  function handleAutoPlay() {
    selectedDemo = demos[currentDemo];
    currentDemo = currentDemo + 1;
    videoPlayer.play();
  }

  function handleButtonPlay(i) {
    selectedDemo = demos[i];
    currentDemo = i;
    videoPlayer.play();
  }

  function pause_button() {
    if (playValue == 1) {
      clearTimeout(myTimeout);
      playValue = 0;
      //document.getElementById("pauser").src = "content/images/play.png";
    } else {
      currentVid = currentVid - 1;
      //document.getElementById("pauser").src = "content/images/pause.png";
      playValue = 1;
    }
  }

  function forward_button() {
    clearTimeout(myTimeout);
    //document.getElementById("pauser").src = "content/images/pause.png";
    playValue = 1;
  }

  function backward_button() {
    clearTimeout(myTimeout);
    if (vidNum == 0) {
      currentVid = videos.length;
    }
    currentVid = currentVid - 2;
    //document.getElementById("pauser").src = "content/images/pause.png";
    playValue = 1;
  }

  function settings_button() {}

  //import videoPlay from "./assets/video-play.svg";
  //import videoStop from "./assets/video-stop.svg";
  // import videoPrevious from "./assets/video-previous.svg";
  // import videoNext from "./assets/video-next.svg";
  // import videoPause from "./assets/video-pause.svg";
  // import settings from "./assets/settings.svg";
</script>

<div
  class="flex flex-row h-screen w-screen"
  style={`background-image: ${bgImage};`}
>
  <button
    class="text-white text-lg p-1 h-64 self-center h-auto self-stretch border-0"
    on:click={() => (collapsed = !collapsed)}
    aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
  >
    {collapsed ? "▶" : "◀"}
  </button>
  <aside
    class={[
      collapsed ? "hidden" : "visible",
      "w-120 overflow-y-auto transition-all duration-300 py-4 px-0 glass-container my-8",
    ]}
    style="scrollbar-color: rgba(255, 255, 255, 0.5) rgba(0, 0, 0, 0.25);"
  >
    {#if !collapsed}
      <div class="m-4">
        <calcite-combobox
          placeholder="Select filter tags"
          on:calciteComboboxFilterChange={(event) => {
            // after filter is applied, set the filterValue to either a string (for one) or an array (for multiple)
            filterValue = event.target.value;
          }}
        >
          {#each filterableValues as value}
            <calcite-combobox-item {value} heading={value}
            ></calcite-combobox-item>
          {/each}
        </calcite-combobox>
      </div>
      {#each demos as demo, i}
        {#if (!filterValue || demo[4] === filterValue) && demo[3] == "Yes"}
          <button
            type="button"
            bind:this={demoButton}
            class={`m-4 mb-0 p-4 pb-0 border-none text-left cursor-pointer ${i === currentDemo ? "bg-gray-900" : "glass-container bg-transparent"}`}
            aria-label={`Play demo video: ${demo[currentDemo]}`}
            on:click={() => handleButtonPlay(i)}
          >
            <calcite-chip class="absolute top-2 right-2">{demo[4]}</calcite-chip
            >
            <img
              alt={demo[0]}
              src={demo[2]}
              class={`rounded ${i === currentDemo ? "opacity-100" : "opacity-20"}`}
            />
            <h3 class="py-2">{demo[0]}</h3>
          </button>
        {/if}
      {/each}
    {/if}
  </aside>

  <div class="flex flex-col w-fit my-8 w-full">
    <header
      class="flex flex-row items-center justify-between p-4 glass-container mx-8"
    >
      <a href="/" use:link aria-label="Go to home page">
        <img src={esriLogo} alt="Esri Logo" class="h-10 mr-4 cursor-pointer" />
      </a>
      <h1 class="text-2xl font-bold text-white drop-shadow">
        Autodesk University 2025
      </h1>
      <div class="flex gap-2">
        <calcite-button
          icon-start="sliders"
          label="Settings"
          appearance="outline-filled"
          kind="neutral"
          aria-label="Settings"
        ></calcite-button>
        <calcite-button
          icon-start="information"
          label="Info"
          appearance="outline-filled"
          kind="neutral"
          aria-label="Info"
        ></calcite-button>
      </div>
    </header>

    <div class="flex flex-col glass-container p-4 gap-4 mx-8 mt-8 h-full">
      <div class="flex flex-row items-center justify-between">
        <h2 class="text-white">{selectedDemo[0]}</h2>
        <div class="flex gap-2">
          <calcite-button
            icon-start="sliders"
            label="Settings"
            appearance="outline-filled"
            kind="neutral"
            aria-label="Settings"
          ></calcite-button>
          <calcite-button
            icon-start="information"
            label="Info"
            appearance="outline-filled"
            kind="neutral"
            aria-label="Info"
          ></calcite-button>
        </div>
      </div>
      <main class="justify-self-center my-auto overflow-hidden w-full flex">
        <video
          muted
          playsinline
          src={selectedDemo[1]}
          controls
          autoplay
          class="w-full video-container absolute top-0 left-0 h-full object-cover"
        >
          <track kind="captions" src="" srclang="en" label="English captions" />
        </video>
        <div class="video-container--glass"></div>
        <video
          muted
          playsinline
          src={selectedDemo[1]}
          controls
          autoplay
          class="w-full"
          bind:this={videoPlayer}
          on:ended={handleAutoPlay}
        >
          <track kind="captions" src="" srclang="en" label="English captions" />
        </video>
      </main>
    </div>
  </div>
</div>

<style>
  aside {
    transition: all 0.5s;
    scrollbar-gutter: stable both-edges;
    scrollbar-width: thin;
    overflow: hidden;

    &:hover {
      overflow: auto;
    }
  }

  button {
    position: relative;
    border-radius: 0;
  }

  button:has(img) {
    border: 1px solid rgba(255, 255, 255, 0.18);
  }

  button:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }

  button img {
    transition: opacity 0.5s ease-out;
  }

  button:hover img {
    opacity: 1;
  }

  calcite-chip {
    z-index: 1;
  }

  calcite-button {
    overflow: hidden;
    border-radius: 0;
  }

  calcite-combobox {
    overflow: hidden;
    border-radius: 0;
  }

  :global(body:has(calcite-combobox-item[selected]) calcite-combobox),
  :global(calcite-combobox[open]),
  calcite-combobox:focus {
    overflow: visible;
    /* height: 150px; */
    border-radius: 0;
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
  }
</style>
