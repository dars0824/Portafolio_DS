import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IntroStateService {
  private readonly storageKey = 'portfolio_intro_seen_v1';
  private readonly state = signal<boolean>(this.readInitialState());

  readonly introCompleted = this.state.asReadonly();

  completeIntro(): void {
    if (this.state()) {
      return;
    }

    this.state.set(true);
    this.persist(true);
  }

  resetIntro(): void {
    this.state.set(false);
    this.persist(false);
  }

  private readInitialState(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }

    const host = window.location.hostname;
    const forceIntro = new URLSearchParams(window.location.search).get('intro') === '1';
    const isLocal = host === 'localhost' || host === '127.0.0.1';

    if (isLocal && !forceIntro) {
      return true;
    }

    return window.sessionStorage.getItem(this.storageKey) === '1';
  }

  private persist(completed: boolean): void {
    if (typeof window === 'undefined') {
      return;
    }

    if (completed) {
      window.sessionStorage.setItem(this.storageKey, '1');
      return;
    }

    window.sessionStorage.removeItem(this.storageKey);
  }
}