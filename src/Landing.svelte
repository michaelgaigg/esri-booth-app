<script>
    import data from './assets/content/industries.json';
    let bgImage = "url(../src/assets/bg_default.jpg)";
    let esriLogo = "../src/assets/esri-logo.png";
    let uc2025 = "../src/assets/uc2025.jpg";
</script>

<div class="flex flex-row h-screen w-screen" style={`background-image: ${bgImage}; background-size: cover; background-position: center;`}>
    <aside class="flex flex-col p-4 m-8 gap-8">
        <img
            src={esriLogo}
            alt="Esri Logo"
            class="w-32 cursor-pointer"
        />
        <div class="flex gap-2 glass-container p-8">
            <ul>
                {#each data.industries as industry}
                    <li class="my-2 text-lg"><a href={`/demo/${industry.id}`} class="text-white">{industry.title}</a></li>
                {/each}
            </ul>
        </div>
    </aside>

    <main class="flex-grow p-8">
        <div class="glass-container cursor-pointer w-64 p-4">
            <a href={`/demo/1`}
            class="bg-transparent border-none text-left"
            >
            <img alt="Esri UC 2025" src={uc2025} class="rounded" />
            <calcite-chip class="absolute top-6 right-6">2025</calcite-chip>
            <h3 class="py-2">Esri UC 2025</h3>
            </a>
        </div>
    </main>
</div>

<style>

</style>