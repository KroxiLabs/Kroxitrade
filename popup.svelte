<script lang="ts">
  const tradeLinks = [
    {
      label: "PoE 1 Trade",
      hint: "Official Path of Exile trade",
      href: "https://www.pathofexile.com/trade/search"
    },
    {
      label: "PoE 2 Trade",
      hint: "Official Path of Exile 2 trade",
      href: "https://www.pathofexile.com/trade2/search/poe2"
    }
  ]
</script>

<svelte:head>
  <title>Kroxitrade</title>
</svelte:head>

<div class="popup-shell">
  <div class="hero">
    <div class="eyebrow">Kroxitrade</div>
    <h1>Trade Shortcuts</h1>
    <p>Open the official trade page you need and continue from there.</p>
  </div>

  <div class="trade-grid">
    {#each tradeLinks as link}
      <a class="trade-link" href={link.href} target="_blank" rel="noreferrer">
        <span class="trade-link__label">{link.label}</span>
        <span class="trade-link__hint">{link.hint}</span>
      </a>
    {/each}
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    min-width: 300px;
    background:
      radial-gradient(circle at top left, rgba(184, 124, 52, 0.18), transparent 38%),
      linear-gradient(180deg, #0f0d0b 0%, #070707 100%);
    color: #f0dfbd;
    font-family: Georgia, "Times New Roman", serif;
  }

  .popup-shell {
    padding: 14px;
  }

  .hero {
    margin-bottom: 10px;
    padding: 12px 14px;
    border: 1px solid rgba(173, 132, 72, 0.22);
    background: linear-gradient(180deg, rgba(23, 20, 17, 0.95), rgba(12, 11, 10, 0.97));
    box-shadow: inset 0 1px 0 rgba(255, 226, 178, 0.06);
  }

  .eyebrow {
    margin-bottom: 6px;
    color: #d4ad65;
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }

  h1 {
    margin: 0 0 4px;
    color: #f5e6c5;
    font-size: 17px;
    font-weight: 700;
  }

  p {
    margin: 0;
    color: #bca887;
    font-size: 11px;
    line-height: 1.45;
  }

  .trade-grid {
    display: flex;
    gap: 8px;
  }

  .trade-link {
    flex: 1 1 0;
    display: block;
    padding: 8px 10px;
    border: 1px solid rgba(188, 145, 77, 0.16);
    background: linear-gradient(180deg, rgba(24, 21, 18, 0.94), rgba(14, 13, 12, 0.98));
    color: inherit;
    text-decoration: none;
    transition:
      border-color 120ms ease,
      background 120ms ease,
      transform 120ms ease;
  }

  .trade-link:hover,
  .trade-link:focus-visible {
    transform: translateY(-1px);
    border-color: rgba(238, 199, 130, 0.32);
    background: linear-gradient(180deg, rgba(31, 27, 22, 0.96), rgba(16, 15, 13, 0.99));
    outline: none;
  }

  .trade-link__label {
    display: block;
    color: #f1e1bf;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .trade-link__hint {
    display: block;
    margin-top: 2px;
    color: #bda886;
    font-size: 10px;
    line-height: 1.3;
  }
</style>
