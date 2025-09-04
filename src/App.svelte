<script>
  import { setAssetPath } from "@esri/calcite-components";
  setAssetPath("./assets/");

  import data from "./assets/content/data.json";
  import "@esri/calcite-components/components/calcite-combobox";
  import "@esri/calcite-components/components/calcite-combobox-item";
  import "@esri/calcite-components/components/calcite-button";
  import "@esri/calcite-components/components/calcite-card";
  import "@esri/calcite-components/components/calcite-chip";
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

  let collapsed = false;

  // data
  let links = data.links || [];
  let videos = data.videos || [];
  let demos = data.demos || [];

  let selectedDemo = demos[0] || {};
  let currentTime = 0;

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

<div class="flex flex-row h-screen w-screen" style={`background-image: ${bgImage};`}>

    <button
      class="text-white text-lg p-1 h-64 self-center glass-container"
      on:click={() => (collapsed = !collapsed)}
      aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
      {collapsed ? "▶" : "◀"}
    </button>
    <aside class={[collapsed ? "hidden" : "visible", "w-120 overflow-y-auto transition-all duration-300 p-4 glass-container my-8"]} style="scrollbar-color: rgba(255, 255, 255, 0.5) rgba(0, 0, 0, 0.25);">
      {#if !collapsed}
      <div class="m-4">
        <calcite-combobox placeholder="Select a field" on:calciteComboboxFilterChange={(event) => {
          const selectedValue = event.target.value;
          console.log("Selected value:", selectedValue);
        }}>
          <calcite-combobox-item value="Design & Engineering" heading="Design & Engineering"></calcite-combobox-item>
          <calcite-combobox-item value="Construction Management" heading="Construction Management"></calcite-combobox-item>
          <calcite-combobox-item value="Planning & Permitting" heading="Planning & Permitting"></calcite-combobox-item>
          <calcite-combobox-item value="Reality Capture" heading="Reality Capture"></calcite-combobox-item>
          <calcite-combobox-item value="3D Features" heading="3D Features"></calcite-combobox-item>
          <calcite-combobox-item value="ArcGIS Image" heading="ArcGIS Image"></calcite-combobox-item>
          <calcite-combobox-item value="Geo AI" heading="Geo AI"></calcite-combobox-item>
        </calcite-combobox>
      </div>
      {#each demos as demo, i}
        {#if demo[3] == "Yes"}
        <button
        type="button"
        class="m-4 mb-0 p-4 pb-0 bg-transparent border-none text-left glass-container cursor-pointer"
        aria-label={`Play demo video: ${demo[0]}`}
        on:click={() => (selectedDemo = demo)}
        >
        <img alt={demo[0]} src={demo[2]} class="rounded" />
        <h3 class="py-2">{demo[0]}</h3>
        </button>
        {/if}
      {/each}
      {/if}
    </aside>


    <div class="flex flex-col w-fit my-8">
      <header class="flex flex-row items-center justify-between p-4 glass-container mx-8">
        <img src={esriLogo} alt="Esri Logo" class="h-10 mr-4" />
        <h1 class="text-2xl font-bold text-white drop-shadow">Autodesk University 2025</h1>
        <div class="flex gap-2">
          <calcite-button icon-start="sliders" label="Settings" appearance="outline-filled" kind="neutral" aria-label="Settings"></calcite-button>
          <calcite-button icon-start="information" label="Info" appearance="outline-filled" kind="neutral" aria-label="Info"></calcite-button>
        </div>
      </header>

      <div class="flex flex-col glass-container p-4 gap-4 m-8 ">
        <div class="flex flex-row items-center justify-between">
          <h2 class="text-white">{selectedDemo[0]}</h2>
          <div class="flex gap-2">
        <calcite-button icon-start="sliders" label="Settings" appearance="outline-filled" kind="neutral" aria-label="Settings"></calcite-button>
        <calcite-button icon-start="information" label="Info" appearance="outline-filled" kind="neutral" aria-label="Info"></calcite-button>
          </div>
        </div>
        <main class=" overflow-hidden w-full flex">
          <video src={selectedDemo[1]} bind:currentTime controls autoplay class="w-full">
        <track kind="captions" src="" srclang="en" label="English captions" />
          </video>
        </main>
      </div>
    </div>
</div>

<style>
  aside {
		transition: all .5s;
	}
  button:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
  .glass-container {
    background: rgba(30, 30, 40, 0.35);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(12px) saturate(180%);
    -webkit-backdrop-filter: blur(12px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 16px;
  }
</style>
