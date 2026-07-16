<script lang="ts">
  let { type = "warning", message }: { type?: "warning" | "alert" | "success" | "info"; message: string } =
    $props();

  const icon = $derived(type === "success" ? "✓" : "⚠");
</script>

<div class="alert-message is-{type}" role="status" aria-live="polite">
  <span class="icon">{icon}</span>
  <span class="text">{message}</span>
</div>

<style>
.alert-message {
  display: flex;
  align-items: center;
  padding: 8px;
  color: #eeeeee;
  font-size: calc(13px * var(--bt-text-scale, 1));
  margin-bottom: 10px;
}
.alert-message.is-alert {
  border: 1px solid rgb(149.5766423358, 38.4233576642, 38.4233576642);
  background-color: #6d1c1c;
}
.alert-message.is-warning {
  border: 1px solid rgb(182.7142857143, 165.4285714286, 140.2857142857);
  background-color: #a38d6d;
}
.alert-message.is-success {
  border: 1px solid rgb(44.2990654206, 113.7009345794, 44.2990654206);
  background-color: #1e4d1e;
}
.alert-message.is-info {
  border: 1px solid rgb(41.7857142857, 67.5, 93.2142857143);
  background-color: #1a2a3a;
}

.icon {
  margin-right: 8px;
  font-weight: bold;
}
</style>
