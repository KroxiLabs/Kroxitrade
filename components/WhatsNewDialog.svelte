<script lang="ts">
  import Button from "./Button.svelte";
  import { getWhatsNewEntry, latestWhatsNew } from "../lib/data/whats-new";
  import { languageStore, translate } from "../lib/services/i18n";

  let {
    open = false,
    version = latestWhatsNew.version,
    onClose = () => {}
  }: {
    open?: boolean;
    version?: string;
    onClose?: () => void;
  } = $props();

  let entry = $derived(getWhatsNewEntry(version));
</script>

{#if open}
  <div class="whats-new-backdrop" role="presentation">
    <div
      class="whats-new-dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="whats-new-title">
      <header class="whats-new-dialog__header">
        <div>
          <div class="whats-new-dialog__eyebrow">
            {translate($languageStore, "whatsNew.eyebrow")}
          </div>
          <h3 id="whats-new-title">
            {translate($languageStore, "whatsNew.title", { version: entry.version })}
          </h3>
        </div>
        <button
          type="button"
          class="whats-new-dialog__close"
          aria-label={translate($languageStore, "whatsNew.close")}
          onclick={onClose}>
          ×
        </button>
      </header>

      <div class="whats-new-dialog__body">
        <p class="whats-new-dialog__intro">
          {translate($languageStore, "whatsNew.intro")}
        </p>

        <div class="whats-new-meta">
          <span>{entry.date}</span>
          <span>{translate($languageStore, "whatsNew.releaseBadge")}</span>
        </div>

        <div class="whats-new-sections">
          {#each entry.sections as section (section.titleKey || section.title)}
            <section class="whats-new-section">
              <h4>{section.title || translate($languageStore, section.titleKey || "")}</h4>
              {#if section.groups}
                <div class="whats-new-groups">
                  {#each section.groups as group (group.titleKey)}
                    <div class="whats-new-group">
                      <h5>{translate($languageStore, group.titleKey)}</h5>
                      <ul>
                        {#each group.items as item (item)}
                          <li>
                            <strong>{item.title}</strong>
                            <span>{item.description}</span>
                          </li>
                        {/each}
                      </ul>
                    </div>
                  {/each}
                </div>
              {:else}
                <ul>
                  {#each section.items || [] as item (item)}
                    <li>
                      <strong>{item.title}</strong>
                      <span>{item.description}</span>
                    </li>
                  {/each}
                </ul>
              {/if}
            </section>
          {/each}
        </div>
      </div>

      <footer class="whats-new-dialog__actions">
        <Button
          label={translate($languageStore, "whatsNew.dismiss")}
          theme="gold"
          onClick={onClose} />
      </footer>
    </div>
  </div>
{/if}

<style lang="scss">
  @use "../lib/styles/variables" as *;

  .whats-new-backdrop {
    position: fixed;
    inset: 0;
    z-index: 2147483647;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    background: rgba($black, 0.72);
    backdrop-filter: blur(6px);
  }

  .whats-new-dialog {
    width: min(100%, 720px);
    max-height: min(760px, calc(100vh - 32px));
    display: flex;
    flex-direction: column;
    border: 1px solid rgba($gold, 0.24);
    border-radius: 8px;
    background:
      linear-gradient(180deg, rgba($gold, 0.06), rgba($gold, 0.015)),
      rgba($poe-black, 0.98);
    box-shadow:
      inset 0 1px 0 rgba($white, 0.03),
      0 18px 38px rgba($black, 0.55);
    overflow: hidden;
  }

  .whats-new-dialog__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    padding: 18px 22px 14px;
    border-bottom: 1px solid rgba($gold, 0.12);
  }

  .whats-new-dialog__eyebrow {
    margin-bottom: 5px;
    color: rgba($gold-alt, 0.82);
    font-family: $primary-font;
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  h3 {
    margin: 0;
    color: $gold;
    font-family: $primary-font;
    font-size: 17px;
    letter-spacing: 0.04em;
  }

  .whats-new-dialog__close {
    flex: 0 0 auto;
    width: 28px;
    height: 28px;
    padding: 0;
    border: 1px solid rgba($gold, 0.18);
    border-radius: 6px;
    background: rgba($black, 0.24);
    color: rgba($gold-alt, 0.88);
    font-size: 15px;
    line-height: 1;
    cursor: pointer;
  }

  .whats-new-dialog__close:hover,
  .whats-new-dialog__close:focus-visible {
    border-color: rgba($gold, 0.38);
    background: rgba($black, 0.44);
    color: $gold-alt;
    outline: none;
  }

  .whats-new-dialog__body {
    min-height: 0;
    overflow-y: auto;
    padding: 16px 22px 6px;
  }

  .whats-new-dialog__intro {
    margin: 0 0 14px;
    color: rgba($white, 0.82);
    font-size: 12px;
    line-height: 1.5;
  }

  .whats-new-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 14px;
  }

  .whats-new-meta span {
    display: inline-flex;
    align-items: center;
    min-height: 20px;
    padding: 0 8px;
    border: 1px solid rgba($gold, 0.16);
    border-radius: 999px;
    background: rgba($gold, 0.06);
    color: rgba($gold-alt, 0.86);
    font-family: $primary-font;
    font-size: 10px;
    letter-spacing: 0.04em;
  }

  .whats-new-sections {
    display: grid;
    gap: 10px;
  }

  .whats-new-section {
    padding: 14px;
    border: 1px solid rgba($white, 0.08);
    border-radius: 6px;
    background: rgba($white, 0.025);
  }

  h4 {
    margin: 0 0 10px;
    color: rgba($gold-alt, 0.96);
    font-family: $primary-font;
    font-size: 14px;
    letter-spacing: 0.06em;
  }

  .whats-new-groups {
    display: grid;
    gap: 12px;
  }

  .whats-new-group {
    display: grid;
    gap: 8px;
  }

  h5 {
    margin: 0;
    color: rgba($gold-alt, 0.82);
    font-family: $primary-font;
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  ul {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
    margin: 0;
    padding: 0;
    list-style: none;
    color: rgba($white, 0.78);
    font-size: 11px;
    line-height: 1.5;
  }

  li {
    padding-left: 10px;
    border-left: 2px solid rgba($gold, 0.28);
  }

  li strong {
    display: block;
    margin-bottom: 2px;
    color: rgba($white, 0.92);
    font-size: 11px;
    line-height: 1.35;
  }

  li span {
    display: block;
    color: rgba($white, 0.64);
    line-height: 1.45;
  }

  .whats-new-dialog__actions {
    display: flex;
    justify-content: flex-end;
    padding: 12px 22px 18px;
  }

  @media (max-width: 640px) {
    .whats-new-dialog {
      width: min(100%, 500px);
    }

    .whats-new-dialog__header,
    .whats-new-dialog__body,
    .whats-new-dialog__actions {
      padding-left: 16px;
      padding-right: 16px;
    }

    ul {
      grid-template-columns: 1fr;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .whats-new-dialog__close {
      transition: none !important;
    }
  }
</style>
