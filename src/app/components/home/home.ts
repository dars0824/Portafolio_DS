import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, computed, signal } from '@angular/core';

import { ContactComponent } from '../contact/contact';
import { CybersecurityComponent } from '../cybersecurity/cybersecurity';
import { EducationComponent } from '../education/education';
import { ExperienceComponent } from '../experience/experience';
import { ProjectsComponent } from '../projects/projects';
import { SkillsComponent } from '../skills/skills';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SkillsComponent,
    EducationComponent,
    ExperienceComponent,
    ProjectsComponent,
    CybersecurityComponent,
    ContactComponent
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  protected readonly terminalLines: string[] = [
    'Get-ADUser -Filter * -SearchBase "OU=Users"',
    'netsh interface ip show config',
    'm365-admin audit-log --status active'
  ];

  protected readonly typedCommand = signal('');
  protected readonly lineIndex = signal(0);
  protected readonly activeLine = computed(() => this.terminalLines[this.lineIndex()] ?? '');

  private timeoutId?: number;
  private deleting = false;

  ngAfterViewInit(): void {
    this.schedule(220);
  }

  ngOnDestroy(): void {
    if (this.timeoutId) {
      window.clearTimeout(this.timeoutId);
    }
  }

  protected scrollToSection(sectionId: string): void {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  private schedule(delayMs: number): void {
    this.timeoutId = window.setTimeout(() => this.tickTyping(), delayMs);
  }

  private tickTyping(): void {
    const target = this.activeLine();
    const current = this.typedCommand();

    if (!this.deleting && current.length < target.length) {
      this.typedCommand.set(target.slice(0, current.length + 1));
      this.schedule(55 + Math.random() * 70);
      return;
    }

    if (!this.deleting && current.length === target.length) {
      this.deleting = true;
      this.schedule(1200);
      return;
    }

    if (this.deleting && current.length > 0) {
      this.typedCommand.set(target.slice(0, current.length - 1));
      this.schedule(35);
      return;
    }

    this.deleting = false;
    this.lineIndex.update((value) => (value + 1) % this.terminalLines.length);
    this.schedule(200);
  }
}


