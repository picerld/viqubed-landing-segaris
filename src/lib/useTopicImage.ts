import { useEffect, useState } from "react"

import { topicImage } from "@/lib/images"

/**
 * Loads a topic photo with a few silent retries (different lock/photo per
 * attempt) before giving up — a single flaky fetch from the image CDN
 * shouldn't leave a card permanently blank. Also tracks onLoad so callers
 * can render a skeleton until the image actually paints.
 */
export function useTopicImage(
  keywords: string | undefined,
  { width = 900, height = 600, maxRetries = 3 }: { width?: number; height?: number; maxRetries?: number } = {}
) {
  const [attempt, setAttempt] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setAttempt(0)
    setLoaded(false)
  }, [keywords])

  const failed = !keywords || attempt > maxRetries
  const src = failed ? undefined : topicImage(keywords, { width, height, lock: attempt + 1 })

  return {
    src,
    loaded,
    failed,
    onLoad: () => setLoaded(true),
    onError: () => {
      setLoaded(false)
      // Small backoff before retrying — an immediate re-request tends to
      // hit the same transient CDN blip that just failed.
      window.setTimeout(() => setAttempt((a) => a + 1), 500 + attempt * 300)
    },
  }
}
