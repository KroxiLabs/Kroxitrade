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

<style>
.button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 28px;
  padding: 0 14px;
  border: 1px solid rgba(238, 238, 238, 0.1);
  background: rgba(238, 238, 238, 0.03);
  border-radius: 2px;
  text-decoration: none;
  font-family: "FontinSmallcaps", serif;
  font-size: calc(11px * var(--bt-text-scale, 1));
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
  color: rgba(238, 238, 238, 0.8);
  cursor: pointer;
  transition: background-color 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), border-color 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), color 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.button:hover {
  background: rgba(238, 238, 238, 0.08);
  color: #eeeeee;
  border-color: rgba(238, 238, 238, 0.3);
}
.button:active {
  transform: translateY(1px);
}
.button:focus-visible {
  border-color: rgba(163, 141, 109, 0.72);
  box-shadow: 0 0 0 1px rgba(163, 141, 109, 0.3), 0 0 0 3px rgba(163, 141, 109, 0.14);
}
.button.is-blue {
  border-color: rgba(15, 28, 46, 0.4);
  background: rgba(15, 28, 46, 0.1);
  color: rgb(40.0819672131, 74.8196721311, 122.9180327869);
}
.button.is-blue:hover {
  background: rgba(15, 28, 46, 0.2);
  border-color: rgba(15, 28, 46, 0.8);
  box-shadow: 0 0 8px rgba(15, 28, 46, 0.3);
  color: #eeeeee;
}
.button.is-gold {
  border-color: rgba(163, 141, 109, 0.4);
  background: rgba(163, 141, 109, 0.08);
  color: #a38d6d;
}
.button.is-gold:hover {
  background: rgba(163, 141, 109, 0.15);
  border-color: #a38d6d;
  box-shadow: 0 0 8px rgba(163, 141, 109, 0.2);
  color: rgb(202.4285714286, 189.8571428571, 171.5714285714);
}
.button.is-red {
  border-color: rgba(109, 28, 28, 0.4);
  background: rgba(109, 28, 28, 0.08);
  color: rgb(169.8649635036, 43.6350364964, 43.6350364964);
}
.button.is-red:hover {
  background: rgba(109, 28, 28, 0.15);
  border-color: #6d1c1c;
  box-shadow: 0 0 8px rgba(109, 28, 28, 0.3);
  color: #eeeeee;
}

.file-input {
  display: none !important;
}

.icon {
  margin-right: 8px;
  font-size: calc(14px * var(--bt-text-scale, 1));
}

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

.label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
