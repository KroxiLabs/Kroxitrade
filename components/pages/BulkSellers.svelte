<script lang="ts">
  import { onMount } from "svelte";
  import layersIcon from "lucide-static/icons/layers-3.svg?raw";
  import { storageService } from "../../lib/services/storage";
  import { bulkSellersService } from "../../lib/services/bulk-sellers";
  import { flashMessages } from "../../lib/services/flash";
  import { languageStore, translate } from "../../lib/services/i18n";
  import Button from "../Button.svelte";
  import EmptyState from "../EmptyState.svelte";

  const COLLAPSED_STORAGE_KEY = "bulk-sellers-collapsed";
  const VISITED_STORAGE_KEY = "bulk-sellers-visited";
  const bulkSellers = bulkSellersService;
  let collapsedSellers: string[] = [];
  let collapsedLookup = new Set<string>();
  let visitedItems = new Set<string>();
  let visitedSellerLookup = new Set<string>();

  const loadCollapsedState = () => {
    const raw = storageService.getLocalValue(COLLAPSED_STORAGE_KEY);

    try {
      const parsed = raw ? JSON.parse(raw) : [];
      collapsedSellers = Array.isArray(parsed) ? parsed.filter((value): value is string => typeof value === "string") : [];
    } catch {
      collapsedSellers = [];
    }
  };

  const persistCollapsedState = () => {
    storageService.setLocalValue(COLLAPSED_STORAGE_KEY, JSON.stringify(collapsedSellers));
  };

  const loadVisitedState = () => {
    const raw = storageService.getLocalValue(VISITED_STORAGE_KEY);
    try {
      const parsed = raw ? JSON.parse(raw) : [];
      visitedItems = new Set(Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === "string") : []);
    } catch {
      visitedItems = new Set();
    }
  };

  const persistVisitedState = () => {
    storageService.setLocalValue(VISITED_STORAGE_KEY, JSON.stringify(Array.from(visitedItems)));
  };

  const toggleSeller = (seller: string) => {
    if (collapsedLookup.has(seller)) {
      collapsedSellers = collapsedSellers.filter((entry) => entry !== seller);
    } else {
      collapsedSellers = [...collapsedSellers, seller];
    }

    persistCollapsedState();
  };

  onMount(() => {
    loadCollapsedState();
    loadVisitedState();
  });

  $: collapsedLookup = new Set(collapsedSellers);

  $: {
    const validSellers = new Set($bulkSellers.map((group) => group.seller));
    const nextCollapsed = collapsedSellers.filter((seller) => validSellers.has(seller));

    if (nextCollapsed.length !== collapsedSellers.length) {
      collapsedSellers = nextCollapsed;
      persistCollapsedState();
    }
  }

  $: visitedSellerLookup = new Set(
    $bulkSellers.filter((group) => group.items.some((item) => visitedItems.has(item.id))).map((group) => group.seller)
  );

  const findItem = (id: string) => {
    if (!bulkSellersService.find(id)) {
      flashMessages.alert(translate($languageStore, "bulk.findError"));
    }
  };

  const buyItem = (id: string) => {
    if (!bulkSellersService.buy(id)) {
      flashMessages.alert(translate($languageStore, "bulk.buyError"));
    } else {
      visitedItems = new Set([...visitedItems, id]);
      persistVisitedState();
    }
  };

  const refreshBulkSellers = () => {
    bulkSellersService.refresh();
  };
</script>

<div class="bulk-sellers-page">
  {#if $bulkSellers.length > 0}
    <div class="groups">
      {#each $bulkSellers as group (group.seller)}
        <section class="seller-group">
          <button class="seller-header" type="button" on:click={() => toggleSeller(group.seller)}>
            <div class="seller-header-main">
              <span class="seller-caret">{collapsedLookup.has(group.seller) ? "▶" : "▼"}</span>
              <div class="seller-name">{group.seller}</div>
            </div>
            <div class="seller-header-meta">
              {#if visitedSellerLookup.has(group.seller)}
                <span class="visited-badge">{translate($languageStore, "bulk.visited")}</span>
              {/if}
              <div class="seller-count">({group.total})</div>
            </div>
          </button>

          {#if !collapsedLookup.has(group.seller)}
            <div class="seller-items">
              {#each group.items as item (item.id)}
                <div class="seller-item" title={item.itemName} aria-label={`${item.itemName}: ${item.priceLabel}`}>
                  <div class="item-price">
                    <span class="price-prefix">{translate($languageStore, "bulk.price")}</span>
                    {#if item.priceAmount}
                      <span class="price-amount">{item.priceAmount}</span>
                    {/if}

                    {#if item.currencyIconUrl}
                      <img
                        class="currency-icon"
                        src={item.currencyIconUrl}
                        alt={item.currencyIconAlt || item.priceLabel}
                        title={item.priceLabel}
                      />
                    {:else}
                      <span class="price-fallback">{item.priceLabel}</span>
                    {/if}
                  </div>

                  <div class="item-actions">
                    <Button label={translate($languageStore, "bulk.find")} theme="blue" onClick={() => findItem(item.id)} />
                    <Button label={translate($languageStore, "bulk.buy")} theme="gold" onClick={() => buyItem(item.id)} />
                    {#if visitedItems.has(item.id)}
                      <span class="visited-badge">{translate($languageStore, "bulk.visited")}</span>
                    {/if}
                  </div>
                </div>
              {/each}
            </div>
          {/if}
        </section>
      {/each}
    </div>
  {:else}
    <EmptyState
      iconHtml={layersIcon}
      eyebrow={translate($languageStore, "layout.nav.bulk")}
      title={translate($languageStore, "bulk.emptyTitle")}
      description={translate($languageStore, "bulk.empty")}
      actionLabel={translate($languageStore, "bulk.refresh")}
      onAction={refreshBulkSellers}
    />
  {/if}
</div>

<style lang="scss">
  @use "../../lib/styles/variables" as *;

  .bulk-sellers-page {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    min-width: 0;
    max-width: 100%;
  }

  .groups {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .seller-group {
    border: 1px solid rgba($gold, 0.14);
    background: rgba($black, 0.34);
    border-radius: 4px;
    overflow: hidden;
  }

  .seller-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    width: 100%;
    padding: 10px 12px;
    background: rgba($white, 0.03);
    border: 0;
    border-bottom: 1px solid rgba($white, 0.06);
    color: inherit;
    cursor: pointer;
    text-align: left;
  }

  .seller-header-meta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    flex: 0 0 auto;
  }

  .seller-header:hover {
    background: rgba($white, 0.05);
  }

  .seller-header-main {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }

  .seller-caret {
    color: rgba($white, 0.66);
    font-size: 10px;
    flex: 0 0 auto;
  }

  .seller-name {
    font-family: $primary-font;
    color: $gold-alt;
    font-size: 13px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .seller-count {
    color: rgba($white, 0.72);
    font-family: $primary-font;
    font-size: 12px;
    flex: 0 0 auto;
  }

  .seller-items {
    display: flex;
    flex-direction: column;
  }

  .seller-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    padding: 6px 10px;
    border-top: 1px solid rgba($white, 0.05);
    min-width: 0;
  }

  .seller-item:first-child {
    border-top: 0;
  }

  .item-price {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    min-width: 0;
    font-size: 12px;
    white-space: nowrap;
  }

  .price-prefix {
    color: rgba($white, 0.9);
    font-family: $primary-font;
    font-weight: 600;
  }

  .price-amount {
    color: $poe-rare;
    font-family: $primary-font;
    font-weight: 700;
  }

  .currency-icon {
    width: 16px;
    height: 16px;
    object-fit: contain;
    vertical-align: middle;
  }

  .price-fallback {
    color: $poe-rare;
    font-family: $primary-font;
  }

  .item-actions {
    display: flex;
    gap: 6px;
    flex: 0 0 auto;
    align-items: center;
    flex-wrap: nowrap;
  }

  .item-actions :global(.button) {
    min-width: 58px;
    height: 24px;
    padding: 0 10px;
    font-size: 10px;
    white-space: nowrap;
  }

  .visited-badge {
    display: inline-flex;
    align-items: center;
    padding: 0 8px;
    height: 20px;
    background: rgba($green, 0.15);
    border: 1px solid rgba($green, 0.4);
    border-radius: 2px;
    color: $green;
    font-family: $primary-font;
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .visited-badge {
    display: inline-flex;
    align-items: center;
    padding: 0 8px;
    height: 28px;
    background: rgba($green, 0.15);
    border: 1px solid rgba($green, 0.4);
    border-radius: 2px;
    color: $green;
    font-family: $primary-font;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    white-space: nowrap;
  }

  @container (max-width: 359px) {
    .seller-item {
      gap: 6px;
    }
  }
</style>
