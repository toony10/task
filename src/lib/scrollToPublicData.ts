export const PUBLIC_DATA_SECTION_ID = 'public-data'

export function scrollToPublicData() {
  requestAnimationFrame(() => {
    document.getElementById(PUBLIC_DATA_SECTION_ID)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  })
}
