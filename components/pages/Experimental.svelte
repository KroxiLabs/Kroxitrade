<script lang="ts">
  import { languageStore, translate } from "../../lib/services/i18n";
</script>

<section class="experimental-page">
  <header class="hero">
    <div class="eyebrow">{translate($languageStore, "experimental.eyebrow")}</div>
    <h1>{translate($languageStore, "experimental.title")}</h1>
    <p>{translate($languageStore, "experimental.description")}</p>
  </header>

  <div class="panel">
    <div class="panel__copy">
      <h2>{translate($languageStore, "experimental.devOnlyTitle")}</h2>
      <p>{translate($languageStore, "experimental.devOnlyBody")}</p>
    </div>
  </div>
</section>

<style lang="scss">
  @use "../../lib/styles/variables" as *;

  .experimental-page {
    display: flex;
    flex-direction: column;
    gap: 14px;
    min-height: 100%;
    color: #d8c7a7;
  }

  .hero,
  .panel {
    border: 1px solid rgba($gold, 0.24);
    background: linear-gradient(180deg, rgba(17, 16, 14, 0.96), rgba(9, 9, 8, 0.96));
    box-shadow: inset 0 1px 0 rgba(255, 226, 178, 0.04);
    padding: 16px;
  }

  .eyebrow {
    margin-bottom: 6px;
    color: #b88a47;
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
  }

  h1,
  h2 {
    margin: 0;
    color: #f1dfbe;
    font-weight: 700;
  }

  h1 {
    font-size: 20px;
  }

  h2 {
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  p {
    margin: 8px 0 0;
    color: #cbb694;
    font-size: 11px;
    line-height: 1.55;
  }

  .panel__copy {
    min-width: 0;
  }
</style>
