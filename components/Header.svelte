<script lang="ts">
  export let logoUrl: string;
</script>

<header class="header">
  <div class="brand">
    <img class="logo" src={logoUrl} alt="Kroxitrade" />
    <div class="brand-copy">
      <h1>Kroxitrade</h1>
      <div class="subtitle">Trade Companion</div>
    </div>
  </div>
  
  <div class="toolbar">
    <div class="sidepanel-badge">In Page</div>
  </div>
</header>

<style lang="scss">
  @use "sass:color";
  @use "../lib/styles/variables" as *;

  .header {
    padding: 14px 14px 12px;
    background-color: color.adjust($black, $lightness: 3%);
    border-bottom: 1px solid rgba($gold, 0.18);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;

    h1 {
      margin: 0;
      font-family: $primary-font;
      font-size: 18px;
      line-height: 1;
      letter-spacing: 0.9px;
      color: $gold;
    }

    .subtitle {
        margin-top: 3px;
        font-size: 11px;
        color: rgba($white, 0.58);
    }
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }

  .brand-copy {
    min-width: 0;
  }

  .logo {
    height: 22px;
    width: auto;
    flex: 0 0 auto;
  }

  .toolbar {
    display: flex;
    gap: 6px;
    margin-left: auto;
    align-items: center;
  }

  .sidepanel-badge {
    padding: 5px 8px;
    background-color: rgba($white, 0.04);
    border: 1px solid rgba($white, 0.08);
    color: rgba($white, 0.72);
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    line-height: 1;
  }
</style>
