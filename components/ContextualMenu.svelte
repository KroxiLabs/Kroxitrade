<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  type ContextualMenuItem = {
    label: string;
    onClick?: () => void;
    href?: string;
  };

  interface Props {
    items?: ContextualMenuItem[];
  }

  let { items = [] }: Props = $props();
  let visible = $state(false);
  let x = $state(0);
  let y = $state(0);

  const toggle = (e: MouseEvent) => {
    e.stopPropagation();
    visible = !visible;
    if (visible) {
      x = e.clientX;
      y = e.clientY;
    }
  };

  const close = () => {
    visible = false;
  };

  const onItemClick = (item: ContextualMenuItem) => {
    if (item.onClick) item.onClick();
    close();
  };

  onMount(() => {
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  });
</script>

<div class="contextual-menu-trigger" onclick={toggle}>
  <span>⋮</span>
</div>

{#if visible}
  <div 
    class="contextual-menu-items" 
    style:top="{y}px" 
    style:left="{x}px"
    transition:fade={{ duration: 200 }}
    onclick={(event) => event.stopPropagation()}
  >
    {#each items as item}
      {#if item.href}
        <a href={item.href} class="menu-item" target="_blank" onclick={() => onItemClick(item)}>
          {item.label}
        </a>
      {:else}
        <button class="menu-item" onclick={() => onItemClick(item)}>
          {item.label}
        </button>
      {/if}
    {/each}
  </div>
{/if}

<style lang="scss">
  @use "sass:color";
  @use "../lib/styles/variables" as *;

  .contextual-menu-trigger {
    cursor: pointer;
    padding: 5px;
    font-size: 20px;
    color: $white;
    &:hover { color: rgba($white, 0.8); }
  }

  .contextual-menu-items {
    position: fixed;
    z-index: 10000;
    min-width: 180px;
    background-color: $gray;
    border: 1px solid color.adjust($gray, $lightness: 10%);
    box-shadow: 0 2px 10px rgba(0,0,0,0.5);
    transform: translate(-100%, 0);
  }

  .menu-item {
    display: block;
    width: 100%;
    padding: 8px 12px;
    background: transparent;
    border: 0;
    text-align: left;
    color: $white;
    font-family: $default-font;
    font-size: 13px;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      background-color: color.adjust($gray, $lightness: 10%);
    }
  }
</style>
