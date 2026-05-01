import { ChangeDetectionStrategy, Component } from '@angular/core';

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  impact: string;
  skills: string[];
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [],
  templateUrl: './experience.html',
  styleUrl: './experience.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperienceComponent {
  protected readonly experience: ExperienceItem[] = [
    {
      role: 'Auxiliar de sistemas',
      company: 'Serenade Punta Cana Beach & Spa Resort',
      period: 'Aug 2025 - Jan 2026 (6 meses)',
      location: 'Punta Cana, La Altagracia, Republica Dominicana (On-site)',
      impact:
        'Soporte tecnico y administracion de infraestructura TI con enfoque en continuidad operativa, redes y respuesta ante incidentes.',
      skills: [
        'Aptitudes para la supervision',
        'Windows Server',
        'Soporte tecnico',
        'Seguridad de redes',
        'Networking',
        'CCTV Monitoring',
        'OLT',
        'Fiber Optic Cable',
        'Administracion de Microsoft Office 365',
        'Administracion de sistemas',
        'Gestion de servicios de TI',
        'Experiencia de Active Directory',
        'Respuesta ante incidentes',
        'Mantenimiento del sistema',
        'CCTV Installation',
        'Impresoras',
        'VLAN',
        'Conflict Resolution',
        'IP Cameras'
      ]
    }
  ];
}


