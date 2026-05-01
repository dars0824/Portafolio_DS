export function createSectionSpy(
  targets: HTMLElement[],
  onSectionChange: (sectionId: string) => void
): IntersectionObserver {
  const observer = new IntersectionObserver(
    (entries) => {
      let bestId = '';
      let bestRatio = 0;

      for (const entry of entries) {
        if (!entry.isIntersecting) {
          continue;
        }

        const ratio = entry.intersectionRatio;
        const id = (entry.target as HTMLElement).id;
        if (ratio >= bestRatio && id) {
          bestRatio = ratio;
          bestId = id;
        }
      }

      if (bestId) {
        onSectionChange(bestId);
      }
    },
    {
      threshold: [0.25, 0.5, 0.75, 0.95],
      rootMargin: '-20% 0px -30% 0px'
    }
  );

  targets.forEach((target) => observer.observe(target));

  return observer;
}
