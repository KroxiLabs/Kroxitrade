<script lang="ts">
  interface Props {
    checked: boolean;
    label: string;
    stateLabel: string;
    onToggle: () => void;
    className?: string;
    ariaLabel?: string;
  }

  let {
    checked,
    label,
    stateLabel,
    onToggle,
    className = "",
    ariaLabel = label
  }: Props = $props();
</script>

<button
  type="button"
  class={`toggle-row toggle-row--inline ${className}`.trim()}
  class:is-active={checked}
  role="switch"
  aria-checked={checked}
  aria-label={ariaLabel}
  onclick={onToggle}
>
  <span class="toggle-switch">
    <span class="toggle-switch__thumb"></span>
  </span>
  <span class="toggle-state">{stateLabel}</span>
</button>

<style lang="scss">
  @use "../lib/styles/variables" as *;

  .toggle-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;

    &:focus-visible {
      .toggle-switch {
        box-shadow:
          0 0 0 1px rgba($gold, 0.28),
          0 0 0 3px rgba($gold, 0.12);
      }

      .toggle-state {
        color: $white;
      }
    }
  }

  .toggle-row--inline {
    width: auto;
    flex: 0 0 auto;
  }

  .toggle-switch {
    position: relative;
    width: 38px;
    height: 20px;
    border-radius: 999px;
    background: rgba($blue, 0.4);
    transition: background 0.16s ease, box-shadow 0.16s ease;
    flex: 0 0 auto;
  }

  .toggle-row:hover .toggle-switch {
    box-shadow: 0 0 0 1px rgba($blue, 0.2);
  }

  .toggle-row.is-active .toggle-switch {
    background: rgba($gold, 0.5);
  }

  .toggle-switch__thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    border-radius: 999px;
    background: rgba($blue-alt, 0.95);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.28);
    transition: transform 0.16s ease, background 0.16s ease;
  }

  .toggle-state {
    min-width: 28px;
    color: rgba($white, 0.68);
    font-family: $primary-font;
    font-size: calc(10px * var(--bt-text-scale, 1));
    font-weight: 600;
    letter-spacing: 0.08em;
    text-align: right;
    text-transform: uppercase;
  }

  .toggle-row.is-active .toggle-switch__thumb {
    transform: translateX(18px);
    background: #f7d08a;
  }

  @media (prefers-reduced-motion: reduce) {
    .toggle-row,
    .toggle-switch,
    .toggle-switch__thumb {
      animation: none !important;
      transition: none !important;
    }
  }
</style>
