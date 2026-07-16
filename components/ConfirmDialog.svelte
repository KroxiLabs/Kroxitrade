<script lang="ts">
  import { languageStore, translate } from "../lib/services/i18n"
  import Button from "./Button.svelte"

  let {
    open = false,
    title = "",
    message = "",
    confirmLabel = translate($languageStore, "confirm.delete"),
    cancelLabel = translate($languageStore, "confirm.cancel"),
    onConfirm = () => {},
    onCancel = () => {}
  }: {
    open?: boolean;
    title?: string;
    message?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
  } = $props()

  const handleBackdropClick = (event: MouseEvent) => {
    if (event.target === event.currentTarget) {
      onCancel()
    }
  }
</script>

{#if open}
  <div
    class="confirm-dialog-backdrop"
    role="presentation"
    onclick={handleBackdropClick}
    onkeydown={(event) => {
      if (event.key === "Escape") {
        onCancel()
      }
    }}>
    <div
      class="confirm-dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title">
      <div class="confirm-dialog__header">
        <h3 id="confirm-dialog-title">{title}</h3>
      </div>

      <div class="confirm-dialog__body">
        <p>{message}</p>
      </div>

      <div class="confirm-dialog__actions">
        <Button label={cancelLabel} theme="blue" onClick={onCancel} />
        <Button label={confirmLabel} theme="red" onClick={onConfirm} />
      </div>
    </div>
  </div>
{/if}

<style>
.confirm-dialog-backdrop {
  position: fixed;
  inset: 0;
  z-index: 2147483647;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: rgba(5, 5, 5, 0.72);
  backdrop-filter: blur(6px);
  overscroll-behavior: contain;
}

.confirm-dialog {
  width: min(100%, 360px);
  border: 1px solid rgba(163, 141, 109, 0.22);
  border-radius: 8px;
  background: linear-gradient(180deg, rgba(163, 141, 109, 0.05), rgba(163, 141, 109, 0.015)), rgba(5, 5, 5, 0.98);
  box-shadow: inset 0 1px 0 rgba(238, 238, 238, 0.02), 0 18px 38px rgba(5, 5, 5, 0.55);
  overflow: hidden;
}

.confirm-dialog__header {
  padding: 14px 16px 10px;
  border-bottom: 1px solid rgba(163, 141, 109, 0.1);
}
.confirm-dialog__header h3 {
  margin: 0;
  font-family: "FontinSmallcaps", serif;
  font-size: calc(15px * var(--bt-text-scale, 1));
  letter-spacing: 0.04em;
  color: #a38d6d;
}

.confirm-dialog__body {
  padding: 14px 16px 16px;
}
.confirm-dialog__body p {
  margin: 0;
  color: rgba(238, 238, 238, 0.82);
  font-size: calc(12px * var(--bt-text-scale, 1));
  line-height: 1.5;
}

.confirm-dialog__actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 0 16px 16px;
}
</style>
