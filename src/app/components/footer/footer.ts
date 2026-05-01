import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  private readonly yearSeed = signal(new Date().getFullYear());

  protected readonly year = computed(() => this.yearSeed());
  protected readonly stack = [
    'Soporte al Usuario',
    'Microsoft 365',
    'Networking',
    'Windows Server',
    'Ciberseguridad'
  ];
}


