import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, computed, signal } from '@angular/core';

@Component({
  selector: 'app-cybersecurity',
  standalone: true,
  imports: [],
  templateUrl: './cybersecurity.html',
  styleUrl: './cybersecurity.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CybersecurityComponent implements AfterViewInit, OnDestroy {
  private readonly terminalLog: string[] = [
    '> initializing adaptive defense...',
    '> collecting endpoint telemetry...',
    '> vulnerability pattern detected: CVE-simulated',
    '> patch orchestration: in progress',
    '> defense layer enabled | system secure'
  ];

  private readonly visibleCount = signal(1);

  protected readonly renderedLog = computed(() => this.terminalLog.slice(0, this.visibleCount()));
  protected readonly status = computed(() =>
    this.visibleCount() >= this.terminalLog.length ? 'Defense Enabled' : 'Scanning...'
  );

  private intervalId?: number;

  ngAfterViewInit(): void {
    this.intervalId = window.setInterval(() => {
      this.visibleCount.update((value) => {
        if (value >= this.terminalLog.length) {
          return value;
        }

        return value + 1;
      });
    }, 700);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
    }
  }
}


