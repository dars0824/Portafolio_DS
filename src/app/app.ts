import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  computed,
  effect,
  inject,
  signal
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AnprinciComponent } from './components/anprinci/anprinci';
import { FooterComponent } from './components/footer/footer';
import { MenuComponent } from './layout/menu/menu';
import { IntroStateService } from './services/intro-state.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AnprinciComponent, MenuComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App implements OnDestroy {
  private readonly introState = inject(IntroStateService);

  protected readonly introDone = computed(() => this.introState.introCompleted());
  protected readonly showBackToTopButton = signal(false);
  protected readonly splineScrollProgress = signal(0);
  protected readonly showSplineViewer = signal(true);

  private readonly themeEffect = effect(() => {
    document.body.classList.toggle('intro-complete', this.introDone());
  });

  private scrollRafId?: number;
  private readonly splineHideThreshold = 0.97;
  private readonly splineShowThreshold = 0.72;

  private readonly scrollHandler = (): void => {
    if (this.scrollRafId) {
      return;
    }

    this.scrollRafId = window.requestAnimationFrame(() => {
      this.scrollRafId = undefined;
      this.syncBackToTopVisibility();
      this.syncSplineState();
    });
  };

  constructor() {
    if (typeof window === 'undefined') {
      return;
    }

    window.addEventListener('scroll', this.scrollHandler, { passive: true });
    this.syncBackToTopVisibility();
    this.syncSplineState();
  }

  ngOnDestroy(): void {
    if (typeof window === 'undefined') {
      return;
    }

    window.removeEventListener('scroll', this.scrollHandler);

    if (this.scrollRafId) {
      window.cancelAnimationFrame(this.scrollRafId);
    }
  }

  protected completeIntro(): void {
    this.introState.completeIntro();
    this.syncBackToTopVisibility();
    this.syncSplineState();
  }

  protected scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  private syncBackToTopVisibility(): void {
    if (typeof window === 'undefined' || !this.introDone()) {
      this.showBackToTopButton.set(false);
      return;
    }

    const reachedBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 18;

    this.showBackToTopButton.set(reachedBottom);
  }

  private syncSplineState(): void {
    if (typeof window === 'undefined' || !this.introDone()) {
      this.splineScrollProgress.set(0);
      this.showSplineViewer.set(true);
      return;
    }

    const fadeDistance = Math.max(420, window.innerHeight * 0.9);
    const rawProgress = window.scrollY / fadeDistance;
    const progress = Number(Math.min(1, Math.max(0, rawProgress)).toFixed(3));

    if (this.splineScrollProgress() !== progress) {
      this.splineScrollProgress.set(progress);
    }

    if (this.showSplineViewer()) {
      if (progress >= this.splineHideThreshold) {
        this.showSplineViewer.set(false);
      }
      return;
    }

    if (progress <= this.splineShowThreshold) {
      this.showSplineViewer.set(true);
    }
  }
}
