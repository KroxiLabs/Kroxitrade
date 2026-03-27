<script lang="ts">
  const version = chrome.runtime.getManifest().version

  const foundations = [
    {
      label: "better-trading",
      href: "https://github.com/exile-center/better-trading",
      description: "Core reference and technical foundation for several trade workflow improvements."
    },
    {
      label: "poe-trade-plus",
      href: "https://github.com/KroxiLabs/poe-trade-plus/",
      description:
        "Another major foundation for this project. That work is itself based on the original script by Maxime B and Fuzzy."
    }
  ]
</script>

<section class="about-page">
  <header class="hero">
    <div class="eyebrow">About</div>
    <h1>Kroxitrade</h1>
    <p>
      Kroxitrade is a companion for Path of Exile Trade built to save searches, organize folders, and make
      the official trade site easier to use.
    </p>
    <p class="credit">Developed by JaViJeC.</p>
    <div class="version-pill">Version {version}</div>
  </header>

  <section class="card">
    <h2>Project</h2>
    <p>
      Kroxitrade is designed to keep trade management fast and visual, with an emphasis on recurring
      searches, pinned trades, and history tracking in a lightweight workflow.
    </p>
  </section>

  <section class="card">
    <h2>Foundation and Credits</h2>
    <p>
      Kroxitrade is based on open source work that helped shape this version and preserve the spirit of
      community trade tooling.
    </p>

    <div class="foundation-list">
      {#each foundations as foundation}
        <a class="foundation" href={foundation.href} target="_blank" rel="noreferrer">
          <span class="foundation__title">{foundation.label}</span>
          <span class="foundation__description">{foundation.description}</span>
        </a>
      {/each}
    </div>
  </section>
</section>

<style>
  .about-page {
    display: grid;
    gap: 14px;
    color: #d8c7a7;
  }

  .hero,
  .card {
    border: 1px solid rgba(168, 129, 73, 0.24);
    background: linear-gradient(180deg, rgba(17, 16, 14, 0.96), rgba(9, 9, 8, 0.96));
    box-shadow: inset 0 1px 0 rgba(255, 226, 178, 0.04);
  }

  .hero {
    padding: 16px;
  }

  .card {
    padding: 14px 16px;
  }

  .eyebrow {
    margin-bottom: 6px;
    color: #b88a47;
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
  }

  h1,
  h2 {
    margin: 0;
    color: #f1dfbe;
    font-weight: 700;
  }

  h1 {
    font-size: 24px;
  }

  h2 {
    margin-bottom: 8px;
    font-size: 16px;
  }

  p {
    margin: 8px 0 0;
    color: #cbb694;
    font-size: 12px;
    line-height: 1.55;
  }

  .credit {
    color: #dfc592;
  }

  .version-pill {
    display: inline-flex;
    margin-top: 12px;
    padding: 5px 9px;
    border: 1px solid rgba(184, 138, 71, 0.24);
    background: rgba(26, 29, 39, 0.7);
    color: #f4e3bf;
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .foundation-list {
    display: grid;
    gap: 8px;
    margin-top: 12px;
  }

  .foundation {
    display: grid;
    gap: 3px;
    padding: 10px 12px;
    border: 1px solid rgba(171, 129, 68, 0.16);
    background: linear-gradient(180deg, rgba(24, 21, 18, 0.94), rgba(13, 12, 11, 0.98));
    color: inherit;
    text-decoration: none;
    transition:
      transform 120ms ease,
      border-color 120ms ease,
      background 120ms ease;
  }

  .foundation:hover,
  .foundation:focus-visible {
    transform: translateY(-1px);
    border-color: rgba(232, 192, 122, 0.32);
    background: linear-gradient(180deg, rgba(29, 24, 19, 0.96), rgba(15, 13, 12, 0.99));
    outline: none;
  }

  .foundation__title {
    color: #f0e0bf;
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .foundation__description {
    color: #c8b28f;
    font-size: 11px;
    line-height: 1.45;
  }
</style>
