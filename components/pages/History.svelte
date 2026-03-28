<script lang="ts">
  import { onMount } from "svelte";
  import { tradeLocationService } from "../../lib/services/trade-location";
  import { openUrlInActiveTab } from "../../lib/services/active-trade-tab";
  import { flashMessages } from "../../lib/services/flash";
  import { languageStore, translate } from "../../lib/services/i18n";
  import { getTradeUrl } from "../../lib/utilities/trade-url";
  import type { TradeLocationHistoryStruct, TradeSiteVersion } from "../../lib/types/trade-location";

  import Button from "../Button.svelte";
  import LoadingContainer from "../LoadingContainer.svelte";
  import AlertMessage from "../AlertMessage.svelte";

  let historyEntries: TradeLocationHistoryStruct[] = [];
  let filteredEntries: TradeLocationHistoryStruct[] = [];
  let isLoading = false;
  let currentVersion: TradeSiteVersion = "1";

  onMount(() => {
    // Sync current version from the active tab/location
    const unsubscribeLocation = tradeLocationService.locationStore.subscribe(loc => {
      currentVersion = loc.version;
      applyFilter();
    });

    void fetchHistory();
    const unsubscribeHistory = tradeLocationService.onChange(() => void fetchHistory());
    
    return () => {
      unsubscribeLocation();
      unsubscribeHistory();
    };
  });

  const fetchHistory = async () => {
    isLoading = true;
    historyEntries = await tradeLocationService.fetchHistory();
    applyFilter();
    isLoading = false;
  };

  const applyFilter = () => {
    filteredEntries = historyEntries.filter(entry => entry.version === currentVersion);
  };

  const clearHistory = async () => {
    await tradeLocationService.clearHistoryEntries();
    historyEntries = [];
    flashMessages.success(translate($languageStore, "history.cleared"));
  };

  const openHistoryEntry = async (entry: TradeLocationHistoryStruct) => {
    await openUrlInActiveTab(
      getTradeUrl(entry.version, entry.type, entry.slug, entry.league || "Standard")
    );
  };
</script>

<div class="history-page">
  <LoadingContainer {isLoading} size="large">
    {#if filteredEntries.length > 0}
      <ul class="history-list">
        {#each filteredEntries as entry (entry.id)}
          <li class="history-item">
            <a
                class="history-link"
                href={getTradeUrl(entry.version, entry.type, entry.slug, entry.league || 'Standard')}
                on:click|preventDefault={() => void openHistoryEntry(entry)}
            >
              <div class="history-title">{entry.title}</div>
              <div class="history-meta">{entry.league} • {new Date(entry.createdAt).toLocaleString()}</div>
            </a>
          </li>
        {/each}
      </ul>

      <Button 
          label={translate($languageStore, "history.clear")} 
          theme="gold" 
          icon="✕" 
          onClick={clearHistory} 
          class="clear-button"
      />
    {:else}
      <AlertMessage type="warning" message={translate($languageStore, "history.empty", { version: currentVersion })} />
    {/if}
  </LoadingContainer>
</div>

<style lang="scss">
  @use "../../lib/styles/variables" as *;

  .history-list {
    width: 100%;
    min-width: 0;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .history-item {
    border-bottom: 1px solid rgba($blue-alt, 0.3);
    &:hover { background-color: rgba($white, 0.05); }
  }

  .history-link {
    display: block;
    padding: 10px;
    color: $white;
    text-decoration: none;
    overflow: hidden;
  }

  .history-title { font-size: 14px; font-weight: bold; overflow-wrap: anywhere; }
  .history-meta { font-size: 11px; color: rgba($white, 0.6); margin-top: 3px; overflow-wrap: anywhere; }

  :global(.clear-button) { width: 100%; margin-top: 15px; }
</style>
