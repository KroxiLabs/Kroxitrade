export interface NormalizeIconOptions {
  size?: number;
  viewBox?: string;
  strokeWidth?: number;
  className?: string;
  extraAttrs?: string;
}

export const normalizeIcon = (
  svg: string,
  {
    size = 13,
    viewBox = "-2 -2 28 28",
    strokeWidth = 1.7,
    className = "action-svg",
    extraAttrs = ""
  }: NormalizeIconOptions = {}
): string =>
  svg.replace(/<svg\b([^>]*)>/, (_match, attrs) => {
    const cleaned = attrs
      .replace(/\sclass="[^"]*"/g, "")
      .replace(/\swidth="[^"]*"/g, "")
      .replace(/\sheight="[^"]*"/g, "")
      .replace(/\sviewBox="[^"]*"/g, "")
      .trim()
    const attrsPrefix = cleaned ? `${cleaned} ` : ""
    const extra = extraAttrs ? ` ${extraAttrs}` : ""
    return `<svg ${attrsPrefix}viewBox="${viewBox}" class="${className}"${extra} style="width:${size}px;height:${size}px;min-width:${size}px;min-height:${size}px;display:block;overflow:visible;stroke-width:${strokeWidth};">`
  })

export const iconDataUri = (
  svg: string,
  options: NormalizeIconOptions = {}
): string => {
  const normalized = normalizeIcon(svg, options)
  return `data:image/svg+xml,${encodeURIComponent(normalized)}`
}

export const appendIconElement = (
  parent: HTMLElement,
  svg: string,
  options: NormalizeIconOptions = {}
) => {
  const img = document.createElement("img")
  img.src = iconDataUri(svg, options)
  img.alt = ""
  img.setAttribute("aria-hidden", "true")
  img.decoding = "async"
  img.className = options.className || "action-svg"
  img.style.width = `${options.size ?? 13}px`
  img.style.height = `${options.size ?? 13}px`
  img.style.minWidth = `${options.size ?? 13}px`
  img.style.minHeight = `${options.size ?? 13}px`
  img.style.display = "block"
  parent.appendChild(img)
  return img
}
