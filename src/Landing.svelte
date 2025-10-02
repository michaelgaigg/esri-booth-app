<script>
  import { onMount } from "svelte";
  import data from "./assets/content/industries.json";
  import { flip } from "svelte/animate";
  import { cubicOut } from "svelte/easing";

  let bgImage = "url(../src/assets/bg_default.jpg)";
  let esriLogo = "../src/assets/esri-logo.png";
  // let conferences = $state(data?.industries?.conferences);
  let conferencesFiltered = $state([]);
  let conferences = $derived(
    data?.industries?.conferences
      ? data?.industries?.conferences
      : [
          {
            id: 1,
            title: "Autodesk University 2025",
            year: "2025",
            description: "The Autodesk University 2025",
            image: "../src/assets/uc2025.jpg",
          },
          {
            id: 2,
            title: "Esri UC 2022",
            year: "2022",
            description: "The Esri User Conference 2022",
            image: "../src/assets/uc2025.jpg",
          },
          {
            id: 3,
            title: "Esri UC 2023",
            year: "2023",
            description: "The Esri User Conference 2023",
            image: "../src/assets/uc2025.jpg",
          },
          {
            id: 4,
            title: "Esri UC 2024",
            year: "2024",
            description: "The Esri User Conference 2024",
            image: "../src/assets/uc2025.jpg",
          },
          {
            id: 5,
            title: "Esri UC 2025",
            year: "2025",
            description: "The Esri User Conference 2025",
            image: "../src/assets/uc2025.jpg",
          },
          {
            id: 6,
            title: "Esri UC 2026",
            year: "2026",
            description: "The Esri User Conference 2026",
            image: "../src/assets/uc2025.jpg",
          },
          {
            id: 7,
            title: "Esri UC 2027",
            year: "2027",
            description: "The Esri User Conference 2027",
            image: "../src/assets/uc2025.jpg",
          },
          {
            id: 8,
            title: "Esri UC 2028",
            year: "2028",
            description: "The Esri User Conference 2028",
            image: "../src/assets/uc2025.jpg",
          },
        ]
  );

  onMount(() => {
    conferencesFiltered = conferences;
  });

  function handleSearchInput(event) {
    const searchTerm = event.target.value.toLowerCase();
    conferencesFiltered = conferences.filter((c) =>
      c.title.toLowerCase().includes(searchTerm)
    );
  }
</script>

<div
  class="e-layout__default min-h-screen h-full w-screen"
  style={`background-image: ${bgImage}; background-size: cover; background-position: center;`}
>
  <header class="e-layout__default-header">
    <img src={esriLogo} alt="Esri Logo" class="w-32 cursor-pointer" />
    <calcite-input
      on:calciteInputInput={handleSearchInput}
      placeholder="Search conferences"
    ></calcite-input>
  </header>

  <main class="e-layout__default-main">
    <ul>
      {#each data.industries as industry}
        <li class="my-2 text-lg">
          <a href={`/demo/${industry.id}`} class="text-white flex gap-2"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="0.75"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-cuboid-icon lucide-cuboid"
              ><path
                d="m21.12 6.4-6.05-4.06a2 2 0 0 0-2.17-.05L2.95 8.41a2 2 0 0 0-.95 1.7v5.82a2 2 0 0 0 .88 1.66l6.05 4.07a2 2 0 0 0 2.17.05l9.95-6.12a2 2 0 0 0 .95-1.7V8.06a2 2 0 0 0-.88-1.66Z"
              /><path d="M10 22v-8L2.25 9.15" /><path
                d="m10 14 11.77-6.87"
              /></svg
            >{industry.title}</a
          >
        </li>
      {/each}
    </ul>
    <div class="grid grid-cols-3 gap-8">
      {#each conferencesFiltered as conference, i (conference.id)}
        <calcite-card
          animate:flip={{ duration: (d) => d * 0.3, easing: cubicOut }}
          label={conference.title}
        >
          <a
            href={`/demo/${conference.id}`}
            class="bg-transparent border-none text-left cursor-pointer"
            slot="thumbnail"
          >
            <img alt={conference.title} src={conference.image} />
          </a>

          <span slot="heading">
            <a
              href={`/demo/${conference.id}`}
              class="bg-transparent border-none text-left"
            >
              {conference.title}
            </a>
          </span>
          <div slot="footer-end">
            <calcite-chip
              class="flex items-center"
              value="calcite chip"
              scale="s">{conference.year}</calcite-chip
            >
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://conferences.autodesk.com/flow/autodesk/au2025/web/page/overview"
            >
              <div class="sr-only">autodesk</div>
              <calcite-chip
                value="calcite chip"
                class="cursor-pointer"
                icon="globe"
                scale="s"
              ></calcite-chip>
            </a>
          </div>
          <div slot="footer-start">
            <calcite-chip value="calcite chip" icon="user" scale="s"
            ></calcite-chip>
          </div>
        </calcite-card>
      {/each}
    </div>
  </main>
</div>

<style>
  .e-layout__default {
    display: grid;
    grid-template-columns: clamp(250px, 15vw, 500px) 1fr;
    grid-template-rows: 112px 1fr;
    grid-template-areas:
      "header header"
      "main main";
  }

  .e-layout__default-header {
    display: grid;
    grid-area: header;
    align-items: center;
    grid-template-columns: clamp(250px, 15vw, 500px) 1fr;
    grid-template-rows: auto;
    gap: 2rem;
    padding: 4rem;
  }

  .e-layout__default-main {
    display: grid;
    grid-area: main;
    grid-template-columns: clamp(250px, 15vw, 500px) 1fr;
    grid-template-rows: auto;
    gap: 2rem;
    place-content: flex-start;
    padding: 4rem;

    & ul {
      padding-inline-end: 3rem;
    }
  }
</style>
