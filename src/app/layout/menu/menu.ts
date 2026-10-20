import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  computed,
  inject,
  signal
} from '@angular/core';

import { createSectionSpy } from '../../animations/section-spy';
import { PORTFOLIO_SECTIONS } from '../../shared/portfolio-sections';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements AfterViewInit, OnDestroy {
  private readonly hostElement = inject(ElementRef<HTMLElement>);

  protected readonly sections = PORTFOLIO_SECTIONS;
  protected readonly activeSection = signal(PORTFOLIO_SECTIONS[0].id);
  protected readonly activeLabel = computed(() => {
    const current = this.sections.find((section) => section.id === this.activeSection());
    return current?.label ?? 'Inicio';
  });

  private observer?: IntersectionObserver;
  private domObserver?: MutationObserver;
  private resizeObserver?: ResizeObserver;
  private rafId?: number;
  private sectionTargets: HTMLElement[] = [];

  private readonly scrollHandler = (): void => {
    this.scheduleActiveSectionSync();
  };

  private readonly windowResizeHandler = (): void => {
    this.syncMenuHeight();
    this.scheduleActiveSectionSync();
  };

  ngAfterViewInit(): void {
    this.observeSections();
    this.syncMenuHeight();
    this.syncActiveSectionFromScroll();

    this.domObserver = new MutationObserver(() => this.observeSections());
    this.domObserver.observe(document.body, { childList: true, subtree: true });

    this.resizeObserver = new ResizeObserver(() => this.syncMenuHeight());
    this.resizeObserver.observe(this.hostElement.nativeElement);

    window.addEventListener('scroll', this.scrollHandler, { passive: true });
    window.addEventListener('resize', this.windowResizeHandler, { passive: true });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.domObserver?.disconnect();
    this.resizeObserver?.disconnect();
    window.removeEventListener('scroll', this.scrollHandler);
    window.removeEventListener('resize', this.windowResizeHandler);

    if (this.rafId) {
      window.cancelAnimationFrame(this.rafId);
    }

    document.documentElement.style.removeProperty('--menu-height');
  }

  protected scrollTo(sectionId: string, event?: Event): void {
    event?.preventDefault();

    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  private observeSections(): void {
    const targets = Array.from(document.querySelectorAll<HTMLElement>('section[data-menu-section]'));
    if (!targets.length) {
      return;
    }

    this.sectionTargets = targets;
    this.observer?.disconnect();
    this.observer = createSectionSpy(targets, (sectionId) => {
      this.activeSection.set(sectionId);
    });

    this.scheduleActiveSectionSync();
  }

  private syncMenuHeight(): void {
    const height = this.hostElement.nativeElement.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--menu-height', `${Math.ceil(height)}px`);
  }

  private scheduleActiveSectionSync(): void {
    if (this.rafId) {
      return;
    }

    this.rafId = window.requestAnimationFrame(() => {
      this.rafId = undefined;
      this.syncActiveSectionFromScroll();
    });
  }

  private syncActiveSectionFromScroll(): void {
    if (!this.sectionTargets.length) {
      return;
    }

    const menuHeight = this.hostElement.nativeElement.getBoundingClientRect().height;
    const markerY = menuHeight + 28;
    let activeId = this.sectionTargets[0].id;

    for (const section of this.sectionTargets) {
      const top = section.getBoundingClientRect().top;
      if (top - markerY <= 0) {
        activeId = section.id;
        continue;
      }

      break;
    }

    const reachedBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;

    if (reachedBottom) {
      activeId = this.sectionTargets[this.sectionTargets.length - 1]?.id ?? activeId;
    }

    this.activeSection.set(activeId);
  }
}


