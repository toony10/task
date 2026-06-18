export function formatCompactNumber(value: number): string {
  const abs = Math.abs(value)

  if (abs >= 1_000_000_000) {
    const formatted = (value / 1_000_000_000).toFixed(1)
    return `${formatted.replace(/\.0$/, '')}B`
  }

  if (abs >= 1_000_000) {
    const formatted = (value / 1_000_000).toFixed(1)
    return `${formatted.replace(/\.0$/, '')}M`
  }

  if (abs >= 1_000) {
    const formatted = (value / 1_000).toFixed(1)
    return `${formatted.replace(/\.0$/, '')}K`
  }

  return value.toLocaleString('ar-SA')
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1).replace(/\.0$/, '')}%`
}
