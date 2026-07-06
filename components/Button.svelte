<script lang="ts">
  import SvgIcon from "./SvgIcon.svelte";

  let {
    label = "",
    icon = "",
    iconHtml = "",
    href = "",
    theme = "blue",
    onFileChange = null,
    onClick = null,
    fileAccept = "*",
    class: className = ""
  }: {
    label?: string;
    icon?: string;
    iconHtml?: string;
    href?: string;
    theme?: "blue" | "gold" | "red";
    onFileChange?: ((event: Event) => void) | null;
    onClick?: (() => void) | null;
    fileAccept?: string;
    class?: string;
  } = $props();

  const handleClick = () => {
    if (onClick) onClick();
  };
</script>

{#if href}
  <a {href} target="_blank" rel="noopener" class="button is-{theme} {className}">
    {#if iconHtml}<span class="icon icon-html"><SvgIcon svg={iconHtml} size={14} className="toolbar-svg" /></span>{:else if icon}<span class="icon">{icon}</span>{/if}
    {#if label}<span class="label">{label}</span>{/if}
  </a>
{:else if onFileChange}
  <label class="button is-{theme} {className}">
    <input type="file" class="file-input" accept={fileAccept} onchange={onFileChange} />
    {#if iconHtml}<span class="icon icon-html"><SvgIcon svg={iconHtml} size={14} className="toolbar-svg" /></span>{:else if icon}<span class="icon">{icon}</span>{/if}
    {#if label}<span class="label">{label}</span>{/if}
  </label>
{:else}
  <button type="button" class="button is-{theme} {className}" onclick={handleClick}>
    {#if iconHtml}<span class="icon icon-html"><SvgIcon svg={iconHtml} size={14} className="toolbar-svg" /></span>{:else if icon}<span class="icon">{icon}</span>{/if}
    {#if label}<span class="label">{label}</span>{/if}
  </button>
{/if}

<style lang="scss">
  @use "sass:color";
  @use "../lib/styles/variables" as *;

  .button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 28px;
    padding: 0 14px;
    border: 1px solid rgba($white, 0.1);
    background: rgba($white, 0.03);
    border-radius: 2px;
    text-decoration: none;
    font-family: $primary-font;
    font-size: calc(11px * var(--bt-text-scale, 1));
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 600;
    color: rgba($white, 0.8);
    cursor: pointer;
    transition:
      background-color 0.2s cubic-bezier(0.25, 0.8, 0.25, 1),
      border-color 0.2s cubic-bezier(0.25, 0.8, 0.25, 1),
      color 0.2s cubic-bezier(0.25, 0.8, 0.25, 1),
      box-shadow 0.2s cubic-bezier(0.25, 0.8, 0.25, 1),
      transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);

    &:hover {
      background: rgba($white, 0.08);
      color: $white;
      border-color: rgba($white, 0.3);
    }

    &:active {
      transform: translateY(1px);
    }

    &:focus-visible {
      border-color: rgba($gold, 0.72);
      box-shadow:
        0 0 0 1px rgba($gold, 0.3),
        0 0 0 3px rgba($gold, 0.14);
    }

    &.is-blue {
      border-color: rgba($blue, 0.4);
      background: rgba($blue, 0.1);
      color: color.adjust($blue, $lightness: 20%);
      &:hover { 
          background: rgba($blue, 0.2);
          border-color: rgba($blue, 0.8);
          box-shadow: 0 0 8px rgba($blue, 0.3);
          color: $white;
      }
    }

    &.is-gold {
      border-color: rgba($gold, 0.4);
      background: rgba($gold, 0.08);
      color: $gold;
      &:hover { 
          background: rgba($gold, 0.15);
          border-color: $gold;
          box-shadow: 0 0 8px rgba($gold, 0.2);
          color: color.adjust($gold, $lightness: 20%);
      }
    }

    &.is-red {
      border-color: rgba($red, 0.4);
      background: rgba($red, 0.08);
      color: color.adjust($red, $lightness: 15%);
      &:hover { 
          background: rgba($red, 0.15);
          border-color: $red;
          box-shadow: 0 0 8px rgba($red, 0.3);
          color: $white;
      }
    }
  }

  .file-input { display: none !important; }
  .icon { margin-right: 8px; font-size: calc(14px * var(--bt-text-scale, 1)); }
  .icon-html {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    font-size: 0;
  }

  .icon-html :global(.toolbar-svg) {
    width: 14px;
    height: 14px;
    min-width: 14px;
    min-height: 14px;
    display: block;
    overflow: visible;
    stroke-width: 1.65;
  }

  .label { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
</style>
