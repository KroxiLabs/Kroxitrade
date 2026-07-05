<script lang="ts">
  import Button from "./Button.svelte";

  let {
    eyebrow = "",
    title = "",
    description = "",
    iconHtml = "",
    actionLabel = "",
    onAction = null
  }: {
    eyebrow?: string;
    title?: string;
    description?: string;
    iconHtml?: string;
    actionLabel?: string;
    onAction?: (() => void) | null;
  } = $props();
</script>

<section class="empty-state">
  {#if iconHtml}
    <div class="empty-state__icon" aria-hidden="true">{@html iconHtml}</div>
  {/if}

  <div class="empty-state__copy">
    {#if eyebrow}
      <div class="empty-state__eyebrow">{eyebrow}</div>
    {/if}

    <h3 class="empty-state__title">{title}</h3>
    <p class="empty-state__description">{description}</p>
  </div>

  {#if actionLabel && onAction}
    <div class="empty-state__actions">
      <Button label={actionLabel} theme="gold" onClick={onAction} />
    </div>
  {/if}
</section>

<style lang="scss">
  @use "../lib/styles/variables" as *;

  .empty-state {
    position: relative;
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 14px;
    align-items: start;
    margin: 4px;
    padding: 18px 16px;
    border: 1px solid rgba($gold, 0.2);
    border-radius: 8px;
    background:
      linear-gradient(180deg, rgba($white, 0.035), rgba($white, 0.012)),
      radial-gradient(circle at top left, rgba($gold, 0.1), transparent 48%),
      rgba($black, 0.34);
    box-shadow:
      inset 0 1px 0 rgba($white, 0.04),
      0 10px 28px rgba(0, 0, 0, 0.18);
    overflow: hidden;
  }

  .empty-state::after {
    content: "";
    position: absolute;
    inset: auto 14px 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba($gold, 0.34), transparent);
    opacity: 0.7;
  }

  .empty-state__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border: 1px solid rgba($gold, 0.2);
    border-radius: 6px;
    background: rgba($gold, 0.07);
    color: rgba($gold-alt, 0.92);
    box-shadow: inset 0 1px 0 rgba($white, 0.04);
  }

  .empty-state__icon :global(svg) {
    width: 22px;
    height: 22px;
    stroke-width: 1.7;
  }

  .empty-state__copy {
    min-width: 0;
  }

  .empty-state__eyebrow {
    margin-bottom: 6px;
    color: rgba($gold-alt, 0.84);
    font-family: $primary-font;
    font-size: calc(10px * var(--bt-text-scale, 1));
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .empty-state__title {
    margin: 0;
    color: rgba($white, 0.96);
    font-family: "Fontin", serif;
    font-size: calc(19px * var(--bt-text-scale, 1));
    line-height: 1.15;
  }

  .empty-state__description {
    margin: 8px 0 0;
    color: rgba($white, 0.72);
    font-size: calc(12px * var(--bt-text-scale, 1));
    line-height: 1.55;
  }

  .empty-state__actions {
    grid-column: 1 / -1;
    display: flex;
    padding-top: 2px;
  }

  @container (max-width: 359px) {
    .empty-state {
      grid-template-columns: 1fr;
    }

    .empty-state__icon {
      width: 38px;
      height: 38px;
    }
  }
</style>
