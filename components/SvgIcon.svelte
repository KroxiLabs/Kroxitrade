<script lang="ts">
  import { iconDataUri, type NormalizeIconOptions } from "../lib/utilities/icons";

  interface Props extends NormalizeIconOptions {
    svg: string;
  }

  let {
    svg,
    size = 13,
    viewBox = "-2 -2 28 28",
    strokeWidth = 1.7,
    className = "action-svg",
    extraAttrs = ""
  }: Props = $props();

  const src = $derived(iconDataUri(svg, { size, viewBox, strokeWidth, className, extraAttrs }));
</script>

<img
  {src}
  class={className}
  style={`width:${size}px;height:${size}px;min-width:${size}px;min-height:${size}px;display:block;overflow:visible;`}
  alt=""
  aria-hidden="true"
/>
