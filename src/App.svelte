<script>
  import { setAssetPath } from "@esri/calcite-components";
  setAssetPath("./assets/");

  import data from "./assets/content/data.json";
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
  let bgImage = "url(/src/assets/uc2025.jpg)";

  // data
  let links = data.links || [];
  let videos = data.videos || [];
  let demos = data.demos || [];

  let videoSource = "./src/assets/content/vids/Walk_Bridge_Sensors_GeoBIM.mp4";
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
  import videoPrevious from "./assets/video-previous.svg";
  import videoNext from "./assets/video-next.svg";
  import videoPause from "./assets/video-pause.svg";
  import settings from "./assets/settings.svg";
</script>

<div class="flex flex-col h-screen bg-[{bgImage}] gap-4 p-8">
  <!-- Top Row: Two columns -->
  <div class="flex flex-row gap-4 h-9/10">
    <!-- Left column: fixed width, scrollable -->
    <aside class="overflow-y-auto bg-[#FAF9F6] p-4 rounded-lg w-80">
      {#each demos as demo, i}
        {#if demo[3] == "Yes"}
          <button
            type="button"
            class="mb-2 p-0 bg-transparent border-none w-full text-left"
            aria-label={`Play demo video: ${demo[0]}`}
            on:click={() => (videoSource = demo[1])}
          >
            <calcite-card>
              <img slot="thumbnail" alt={demo[0]} src={demo[2]} />
              <span slot="heading">{demo[0]}</span>
            </calcite-card>
          </button>
        {/if}
      {/each}
    </aside>
    <!-- Right column: fills remaining space -->
    <main class="rounded-lg overflow-hidden w-full">
      <video src={videoSource} bind:currentTime controls class="w-full h-full">
        <track kind="captions" src="" srclang="en" label="English captions" />
      </video>
    </main>
  </div>
  <!-- Bottom Row: Fixed height 64rem -->
  <div class="w-full bg-white/50 p-4 flex flex-row items-center rounded-lg">
    <button
      type="button"
      class="h-8 p-0 bg-transparent border-none"
      on:click={backward_button}
      aria-label="Back"
    >
      <img class="h-8" src={videoPrevious} alt="Back" height="18px" />
    </button>
    <button
      type="button"
      class="h-8 p-0 bg-transparent border-none"
      id="pauser"
      on:click={pause_button}
      aria-label="Pause"
    >
      <img class="h-8" src={videoPause} alt="Pause" height="18px" />
    </button>
    <button
      type="button"
      class="h-8 p-0 bg-transparent border-none"
      on:click={forward_button}
      aria-label="Next"
    >
      <img class="h-8" src={videoNext} alt="Next" height="18px" />
    </button>
  </div>
</div>

<style>
</style>
