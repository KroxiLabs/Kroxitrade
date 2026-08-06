export const extractValdoRewardName = (row: HTMLElement): string | null => {
  const itemRoot = row.querySelector<HTMLElement>(
    ".itemBoxContent, .itemPopupContainer, .middle"
  )
  const itemText = (itemRoot?.textContent || row.textContent || "").replace(
    /\r/g,
    ""
  )
  if (!/\bValdo(?:'s)? Map\b|\bLost Remnant\b/i.test(itemText)) return null

  const rewardText = itemRoot
    ?.querySelector<HTMLElement>('.item-property .lc[type="76"]')
    ?.textContent
    ?.trim()
  const structuredReward = rewardText?.match(/[:：]\s*(.+?)\s*$/)?.[1]?.trim()
  if (structuredReward) return structuredReward

  const match = itemText.match(/^\s*Reward\s*[:：]\s*(.+?)\s*$/im)
  return match?.[1]?.trim() || null
}
