<script lang="ts">
  import { languageStore, translate } from "../lib/services/i18n";

  let {
    logoUrl,
    isMinimized = false,
    isDevBuild = false,
    onToggleMinimize = () => {},
    sidebarSide = 'left'
  }: {
    logoUrl: string;
    isMinimized?: boolean;
    isDevBuild?: boolean;
    onToggleMinimize?: () => void;
    sidebarSide?: 'left' | 'right';
  } = $props();
</script>

<header class="sidebar-header">
  <div class="brand">
    <img class="logo" src={logoUrl} alt="Poe Trade Plus" />
    <div class="brand-copy">
      <div class="title-row">
        <h1>Poe Trade Plus</h1>
        {#if isDevBuild}
          <span class="dev-badge" title="Development build">DEV</span>
        {/if}
      </div>
      <div class="subtitle">{translate($languageStore, "header.subtitle")}</div>
    </div>
  </div>
  
  <div class="toolbar">
    <button class="minimize-toggle" onclick={onToggleMinimize} title={isMinimized ? translate($languageStore, "header.expandSidebar") : translate($languageStore, "header.minimizeSidebar")}>
      <span class="chev-icon">
        {#if sidebarSide === 'left'}
          {isMinimized ? "▶" : "◀"}
        {:else}
          {isMinimized ? "◀" : "▶"}
        {/if}
      </span>
    </button>
  </div>
</header>

<style lang="scss">
  @use "sass:color";
  @use "../lib/styles/variables" as *;

  .sidebar-header {
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

  .title-row {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }

  .dev-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 16px;
    padding: 0 6px;
    border-radius: 999px;
    background: rgba($red, 0.16);
    border: 1px solid rgba($red, 0.36);
    color: rgba($red, 0.92);
    font-size: 9px;
    font-weight: 700;
    line-height: 1;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    flex: 0 0 auto;
  }

  .logo {
    height: 64px;
    width: auto;
    flex: 0 0 auto;
  }

  .toolbar {
    display: flex;
    gap: 6px;
    margin-left: auto;
    align-items: center;
  }

  .minimize-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    background: rgba($white, 0.04);
    border: 1px solid rgba($white, 0.08);
    border-radius: 4px;
    color: rgba($white, 0.72);
    cursor: pointer;
    transition:
      background-color 0.2s cubic-bezier(0.25, 0.8, 0.25, 1),
      border-color 0.2s cubic-bezier(0.25, 0.8, 0.25, 1),
      color 0.2s cubic-bezier(0.25, 0.8, 0.25, 1),
      box-shadow 0.2s cubic-bezier(0.25, 0.8, 0.25, 1),
      transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);

    .chev-icon {
      font-size: 10px;
      line-height: 1;
    }

    &:hover {
      background: rgba($white, 0.1);
      border-color: rgba($gold, 0.4);
      color: $gold;
    }

    &:focus-visible {
      border-color: rgba($gold, 0.62);
      color: $gold;
      box-shadow:
        0 0 0 1px rgba($gold, 0.24),
        0 0 0 3px rgba($gold, 0.12);
    }
  }
</style>
