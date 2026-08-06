/**
 * Real stock photography via LoremFlickr, keyed by topic so every card
 * gets a relevant (not just random) image. `lock` pins a deterministic
 * photo per keyword set so the layout doesn't reshuffle on re-render.
 */
export function topicImage(
  keywords: string,
  { width = 900, height = 600, lock = 1 }: { width?: number; height?: number; lock?: number } = {}
) {
  return `https://loremflickr.com/${width}/${height}/${keywords}?lock=${lock}`
}
