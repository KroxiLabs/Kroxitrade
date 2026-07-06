<script lang="ts">
  import { normalizeIcon, type NormalizeIconOptions } from "../lib/utilities/icons";

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

  const normalizedSvg = $derived(normalizeIcon(svg, { size, viewBox, strokeWidth, className, extraAttrs }));
</script>

{@html normalizedSvg}
