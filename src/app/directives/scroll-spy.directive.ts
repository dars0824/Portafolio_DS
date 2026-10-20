import {
  Directive,
  ElementRef,
  OnDestroy,
  inject,
  NgZone
} from '@angular/core';

@Directive({
  selector: '[appScrollSpy]',
  standalone: true
})
export class ScrollSpyDirective implements OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly zone = inject(NgZone);
  private observer?: IntersectionObserver;

  constructor() {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      return;
    }

    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const element = entry.target as HTMLElement;

            element.classList.toggle('is-visible', entry.isIntersecting);

            if (entry.isIntersecting) {
              element.classList.remove('is-leaving');
              return;
            }

            if (!element.classList.contains('is-visible')) {
              element.classList.add('is-leaving');
            }
          });
        },
        {
          threshold: [0.12, 0.25, 0.45, 0.7],
          rootMargin: '-40px 0px -40px 0px'
        }
      );

      this.observer.observe(this.elementRef.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
