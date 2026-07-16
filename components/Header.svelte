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

<style>
.sidebar-header {
  padding: 14px 14px 12px;
  background-color: rgb(12.65, 12.65, 12.65);
  border-bottom: 1px solid rgba(163, 141, 109, 0.18);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}
.sidebar-header h1 {
  margin: 0;
  font-family: "FontinSmallcaps", serif;
  font-size: calc(18px * var(--bt-text-scale, 1));
  line-height: 1;
  letter-spacing: 0.9px;
  color: #a38d6d;
}
.sidebar-header .subtitle {
  margin-top: 3px;
  font-size: calc(11px * var(--bt-text-scale, 1));
  color: rgba(238, 238, 238, 0.58);
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
  background: rgba(109, 28, 28, 0.16);
  border: 1px solid rgba(109, 28, 28, 0.36);
  color: rgba(109, 28, 28, 0.92);
  font-size: calc(9px * var(--bt-text-scale, 1));
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
  background: rgba(238, 238, 238, 0.04);
  border: 1px solid rgba(238, 238, 238, 0.08);
  border-radius: 4px;
  color: rgba(238, 238, 238, 0.72);
  cursor: pointer;
  transition: background-color 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), border-color 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), color 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.minimize-toggle .chev-icon {
  font-size: calc(10px * var(--bt-text-scale, 1));
  line-height: 1;
}
.minimize-toggle:hover {
  background: rgba(238, 238, 238, 0.1);
  border-color: rgba(163, 141, 109, 0.4);
  color: #a38d6d;
}
.minimize-toggle:focus-visible {
  border-color: rgba(163, 141, 109, 0.62);
  color: #a38d6d;
  box-shadow: 0 0 0 1px rgba(163, 141, 109, 0.24), 0 0 0 3px rgba(163, 141, 109, 0.12);
}
</style>
