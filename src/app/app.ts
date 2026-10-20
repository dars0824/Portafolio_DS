import {
  AfterViewInit,
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App implements AfterViewInit, OnDestroy {
  ngAfterViewInit(): void {
    // no-op: reveal logic moved to the ScrollSpyDirective.
  }
  private readonly introState = inject(IntroStateService);

  protected readonly introDone = computed(() => this.introState.introCompleted());
  protected readonly scrollButtonOpacity = signal(0);

  private readonly themeEffect = effect(() => {
    document.body.classList.toggle('intro-complete', this.introDone());
  });

  private scrollRafId?: number;

  private readonly scrollHandler = (): void => {
    if (this.scrollRafId) {
      return;
    }

    this.scrollRafId = window.requestAnimationFrame(() => {
      this.scrollRafId = undefined;
      this.syncBackToTopVisibility();
    });
  };

  constructor() {
    if (typeof window === 'undefined') {
      return;
    }

    window.addEventListener('scroll', this.scrollHandler, { passive: true });
    this.syncBackToTopVisibility();
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
  }

  protected scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  private syncBackToTopVisibility(): void {
    if (typeof window === 'undefined' || !this.introDone()) {
      this.scrollButtonOpacity.set(0);
      return;
    }

    const threshold = 300;
    const scrolled = window.scrollY;
    const fadeStart = threshold;
    const fadeEnd = threshold + 150;

    if (scrolled < fadeStart) {
      this.scrollButtonOpacity.set(0);
    } else if (scrolled > fadeEnd) {
      this.scrollButtonOpacity.set(1);
    } else {
      const opacity = (scrolled - fadeStart) / (fadeEnd - fadeStart);
      this.scrollButtonOpacity.set(opacity);
    }
  }

}
