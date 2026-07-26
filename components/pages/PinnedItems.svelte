<script lang="ts">
  import { pinnedItemsService } from "../../lib/services/pinned-items";
  import pinOffIcon from "lucide-static/icons/pin-off.svg?raw";
  import Button from "../Button.svelte";
  import AlertMessage from "../AlertMessage.svelte";

  const pinnedItems = pinnedItemsService;

  const unpin = (id: string) => pinnedItemsService.unpin(id);
  const clear = () => pinnedItemsService.clear();

  const scrollTo = (id: string) => {
    const row = Array.from(document.querySelectorAll<HTMLElement>("[data-bt-pin-id]"))
      .find((element) => element.dataset.btPinId === id);
    if (!row) return;

    row.scrollIntoView({ block: "center", behavior: "smooth" });
    row.classList.add("bt-pinned-glow");
    window.setTimeout(() => row.classList.remove("bt-pinned-glow"), 2000);
  };
</script>

<div class="pinned-items-page">
  {#if $pinnedItems.length > 0}
    <div class="items-grid">
      {#each $pinnedItems as item (item.id)}
        <article class="pinned-item-card">
          <header class="pinned-item-card__header">
            <h3 title={item.title}>{item.title}</h3>
          </header>
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
            <Button label="Unpin" iconHtml={pinOffIcon} theme="blue" onClick={() => unpin(item.id)} />
          </div>
        </article>
      {/each}
    </div>
    
    <Button label="Clear All" theme="gold" icon="✕" onClick={clear} />
    <AlertMessage type="warning" message="Note: Pinned items are only kept for the current session." />
  {:else}
    <AlertMessage type="warning" message="No pinned items yet. Use the 'Pin' button on trade results." />
  {/if}
</div>

<style>
.pinned-items-page {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 100%;
  font-family: "FontinSmallcaps", serif;
  width: 100%;
  min-width: 0;
  max-width: 100%;
}

.items-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 2px;
  width: 100%;
  min-width: 0;
}

.pinned-item-card {
  border: 1px solid rgba(238, 238, 238, 0.07);
  border-radius: 8px;
  background: linear-gradient(180deg, rgba(238, 238, 238, 0.03), rgba(238, 238, 238, 0.012)), rgba(5, 5, 5, 0.46);
  width: 100%;
  min-width: 0;
  overflow: hidden;
  box-shadow: inset 0 1px 0 rgba(238, 238, 238, 0.025), 0 8px 18px rgba(0, 0, 0, 0.12);
}
.pinned-item-card:hover {
  border-color: rgba(163, 141, 109, 0.22);
}
.pinned-item-card__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 12px 9px;
  border-bottom: 1px solid rgba(238, 238, 238, 0.07);
  background: linear-gradient(180deg, rgba(26, 42, 58, 0.58), rgba(15, 28, 46, 0.38));
}
.pinned-item-card__header h3 {
  flex: 1;
  min-width: 0;
  margin: 0;
  color: rgba(238, 238, 238, 0.95);
  font-size: calc(13px * var(--bt-text-scale, 1));
  font-weight: 700;
  line-height: 1.25;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.pinned-item-card :global(.itemPopupContainer) {
  margin: 0;
  max-width: 100%;
  background: transparent;
}
.pinned-item-card :global(.itemPopupAdditional) {
  padding: 5px;
  background-color: #000;
  font-size: calc(12px * var(--bt-text-scale, 1));
}

.rendered-wrapper {
  display: flex;
  justify-content: center;
  padding: 8px 10px;
  background: rgba(5, 5, 5, 0.28);
}

.pricing-wrapper {
  padding: 8px 12px;
  text-align: center;
  background: rgba(163, 141, 109, 0.045);
  border-top: 1px solid rgba(163, 141, 109, 0.08);
  color: rgba(196, 177, 140, 0.9);
}
.pricing-wrapper :global(img) {
  height: 24px;
  vertical-align: middle;
}

.item-actions {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 6px;
  padding: 9px 10px;
  background: rgba(5, 5, 5, 0.34);
  border-top: 1px solid rgba(238, 238, 238, 0.07);
  width: 100%;
  min-width: 0;
}
.item-actions :global(button) {
  width: 100%;
}

.pinned-items-page :global(.alert-message.is-warning) {
  margin: 0;
  border: 1px solid rgba(163, 141, 109, 0.2);
  border-radius: 8px;
  background: linear-gradient(180deg, rgba(163, 141, 109, 0.075), rgba(163, 141, 109, 0.035)), rgba(5, 5, 5, 0.48);
  color: rgba(238, 238, 238, 0.78);
  box-shadow: inset 0 1px 0 rgba(238, 238, 238, 0.02);
}
.pinned-items-page :global(.alert-message.is-warning .icon) {
  color: rgba(196, 177, 140, 0.72);
}
</style>
