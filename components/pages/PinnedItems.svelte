<script lang="ts">
  import { itemResultsService } from "../../lib/services/item-results";
  import { onMount } from "svelte";
  import { sendMessageToActiveTradeTab } from "../../lib/services/active-trade-tab";
  import Button from "../Button.svelte";
  import AlertMessage from "../AlertMessage.svelte";

  const pinnedItems = itemResultsService;

  onMount(() => {
    void itemResultsService.initialize();
  });

  const unpin = (id: string) => itemResultsService.unpin(id);
  const clear = () => itemResultsService.clear();

  const scrollTo = async (id: string) => {
    await sendMessageToActiveTradeTab({ query: "scroll-to-item", itemId: id });
  };
</script>

<div class="pinned-items-page">
  {#if $pinnedItems.length > 0}
    <div class="items-grid">
      {#each $pinnedItems as item (item.id)}
        <div class="pinned-item-card">
          <div class="item-content">
            {@html item.detailsHtml}
            <div class="rendered-wrapper">
              {@html item.renderedHtml}
            </div>
            <div class="pricing-wrapper">
              {@html item.pricingHtml}
            </div>
          </div>
          <div class="item-actions">
            <Button label="Scroll to" theme="blue" onClick={() => scrollTo(item.id)} />
            <Button label="Unpin" theme="blue" onClick={() => unpin(item.id)} />
          </div>
        </div>
      {/each}
    </div>
    
    <Button label="Clear All" theme="gold" icon="✕" onClick={clear} />
  {:else}
    <AlertMessage type="warning" message="No pinned items yet. Use the 'Pin' button on trade results." />
  {/if}

  <AlertMessage type="warning" message="Note: Pinned items are only kept for the current session." />
</div>

<style lang="scss">
  @use "../../lib/styles/variables" as *;

  .pinned-items-page {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    min-width: 0;
    max-width: 100%;
  }

  .items-grid {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 10px;
    width: 100%;
    min-width: 0;
  }

  .pinned-item-card {
    background-color: #000;
    border: 1px solid $blue-alt;
    width: 100%;
    min-width: 0;
    overflow: hidden;
    
    :global(.itemPopupContainer) { margin: 0; background-color: #000; }
    :global(.itemPopupAdditional) { padding: 5px; background-color: #000; font-size: calc(12px * var(--bt-text-scale, 1)); }
  }

  .rendered-wrapper {
      display: flex;
      justify-content: center;
      background-color: #000;
  }

  .pricing-wrapper {
      padding: 10px;
      text-align: center;
      background-color: #000;
      color: #a38d6d;
      :global(img) { height: 24px; vertical-align: middle; }
  }

  .item-actions {
    display: flex;
    gap: 5px;
    padding: 10px;
    background-color: #000;
    border-top: 1px solid rgba($blue-alt, 0.3);
    width: 100%;
    min-width: 0;
    :global(button) { flex: 1; }
  }
</style>
