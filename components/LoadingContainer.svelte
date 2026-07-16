<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    isLoading = false,
    size = "large",
    children
  }: {
    isLoading?: boolean;
    size?: "small" | "large";
    children?: Snippet;
  } = $props();
</script>

<div class="loading-container">
  {#if isLoading}
    <div class="loader is-{size}">
      <span class="spinner">↻</span>
    </div>
  {:else}
    <div class="content">
      {@render children?.()}
    </div>
  {/if}
</div>

<style>
@keyframes fade-in-keyframes {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes delayed-fade-in-keyframes {
  0% {
    opacity: 0;
  }
  25% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.loading-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  min-height: 0;
}

.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex: 0 0 auto;
  margin: 10px 0;
  font-size: calc(25px * var(--bt-text-scale, 1));
  color: #eeeeee;
  animation: delayed-fade-in-keyframes 0.2s ease forwards;
}
.loader.is-small {
  margin: 5px 0;
  font-size: calc(15px * var(--bt-text-scale, 1));
}
.loader.is-large {
  margin: 20px 0;
  font-size: calc(25px * var(--bt-text-scale, 1));
}

.spinner {
  display: inline-block;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.content {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  animation: fade-in-keyframes 0.2s ease;
  width: 100%;
  min-width: 0;
  min-height: 0;
}
</style>
