<script lang="ts">
  import { languageStore, translate, type AppLanguage } from "../../lib/services/i18n";
  import { settings, type SidebarSide } from "../../lib/services/settings";
  import Button from "../Button.svelte";
  import { onMount } from "svelte";

  const DEFAULT_SIDEBAR_WIDTH = 360;

  async function handleSideChange(side: SidebarSide) {
    await settings.updateSide(side);
  }

  async function handleEquivalentPricingChange(showEquivalentPricing: boolean) {
    await settings.updateEquivalentPricingVisibility(showEquivalentPricing);
  }

  async function handleSidebarWidthReset() {
    await settings.updateSidebarWidth(DEFAULT_SIDEBAR_WIDTH);
  }

  async function handleLanguageChange(language: AppLanguage) {
    await settings.updateLanguage(language);
  }

  onMount(async () => {
    await settings.load();
  });
</script>

<div class="settings-page">
  <section class="settings-section">
    <h3 class="section-title">{translate($languageStore, "settings.sidebarTitle")}</h3>
    <p class="section-description">{translate($languageStore, "settings.sidebarDescription")}</p>
    
    <div class="side-selector">
      <Button 
        label={translate($languageStore, "settings.left")} 
        theme={$settings.sidebarSide === 'left' ? 'gold' : 'blue'}
        class="side-btn"
        onClick={() => handleSideChange('left')}
      />
      <Button 
        label={translate($languageStore, "settings.right")} 
        theme={$settings.sidebarSide === 'right' ? 'gold' : 'blue'}
        class="side-btn"
        onClick={() => handleSideChange('right')}
      />
      <Button
        label={translate($languageStore, "settings.resetWidth")}
        theme="blue"
        class="side-btn reset-btn"
        onClick={handleSidebarWidthReset}
      />
    </div>
  </section>

  <section class="settings-section">
    <h3 class="section-title">{translate($languageStore, "settings.languageTitle")}</h3>
    <p class="section-description">{translate($languageStore, "settings.languageDescription")}</p>

    <div class="side-selector">
      <Button
        label={translate($languageStore, "settings.languageEnglish")}
        theme={$settings.language === 'en' ? 'gold' : 'blue'}
        class="side-btn"
        onClick={() => handleLanguageChange('en')}
      />
      <Button
        label={translate($languageStore, "settings.languageSpanish")}
        theme={$settings.language === 'es' ? 'gold' : 'blue'}
        class="side-btn"
        onClick={() => handleLanguageChange('es')}
      />
    </div>
  </section>

  <section class="settings-section">
    <h3 class="section-title">{translate($languageStore, "settings.equivalentTitle")}</h3>
    <p class="section-description">{translate($languageStore, "settings.equivalentDescription")}</p>

    <div class="side-selector">
      <Button
        label={translate($languageStore, "settings.hidden")}
        theme={$settings.showEquivalentPricing ? 'blue' : 'gold'}
        class="side-btn"
        onClick={() => handleEquivalentPricingChange(false)}
      />
      <Button
        label={translate($languageStore, "settings.visible")}
        theme={$settings.showEquivalentPricing ? 'gold' : 'blue'}
        class="side-btn"
        onClick={() => handleEquivalentPricingChange(true)}
      />
    </div>
  </section>

</div>

<style lang="scss">
  @use "sass:color";
  @use "../../lib/styles/variables" as *;

  .settings-page {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 5px;
    color: $white;
    animation: fade-in 0.3s ease;
  }

  @keyframes fade-in {
    from { opacity: 0; transform: translateY(5px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .settings-section {
    background: rgba($white, 0.02);
    border: 1px solid rgba($white, 0.06);
    padding: 16px;
    border-radius: 4px;

    &.info {
      background: rgba($blue, 0.05);
      border-color: rgba($blue, 0.2);
    }
  }

  .section-title {
    margin: 0 0 8px;
    font-family: $primary-font;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: $gold;
  }

  .section-description {
    margin: 0 0 16px;
    font-size: 12px;
    color: rgba($white, 0.6);
    line-height: 1.5;
  }

  .side-selector {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  :global(.side-btn) {
    flex: 1;
    min-width: 0;
  }

  :global(.reset-btn) {
    flex: 1.35;
  }
</style>
