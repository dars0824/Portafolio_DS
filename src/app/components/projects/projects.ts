import { ChangeDetectionStrategy, Component } from '@angular/core';

interface ProjectItem {
  title: string;
  description: string;
  technologies: string[];
  problemSolved: string;
  github: string;
  mediaGradient: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent {
  protected readonly projects: ProjectItem[] = [
    {
      title: 'Portafolio Profesional',
      description:
        'Sitio personal enfocado en presentar experiencia en soporte TI, ciberseguridad y formacion tecnica.',
      technologies: ['Angular'],
      problemSolved: 'Centralizar perfil profesional y certificaciones en una sola experiencia web.',
      github: 'https://github.com/dars0824',
      mediaGradient:
        "center / cover no-repeat url('/shared/fotos/diplomas/Proyecto%20portafolio%20imagen.png')"
    }
    // {
    //   title: 'Laboratorios de Ciberseguridad',
    //   description:
    //     'Practicas tecnicas para fortalecer seguridad de redes, monitoreo y respuesta inicial ante incidentes.',
    //   technologies: ['Networking', 'Windows', 'CCTV Monitoring', 'Seguridad de redes'],
    //   problemSolved: 'Mejorar capacidad operativa para detectar y resolver eventos de seguridad.',
    //   demo: 'https://www.linkedin.com/in/darwin-sosa-santana-807b0333a',
    //   github: 'https://github.com/dars0824',
    //   mediaGradient:
    //     'linear-gradient(140deg, rgba(123, 97, 255, 0.36), rgba(0, 212, 255, 0.18), rgba(11, 15, 25, 0.7))'
    // },
    // {
    //   title: 'Practicas de Soporte e Infraestructura',
    //   description:
    //     'Evidencias de trabajo en mantenimiento preventivo, Microsoft 365, conectores RJ45/fibra y soporte onsite.',
    //   technologies: ['Microsoft 365', 'RJ45', 'Fibra Optica', 'Mantenimiento Preventivo'],
    //   problemSolved: 'Asegurar continuidad operativa en entorno hotelero con soporte tecnico integral.',
    //   demo: 'https://www.linkedin.com/in/darwin-sosa-santana-807b0333a',
    //   github: 'https://github.com/dars0824',
    //   mediaGradient:
    //     'linear-gradient(130deg, rgba(0, 255, 198, 0.3), rgba(123, 97, 255, 0.2), rgba(11, 15, 25, 0.74))'
    // }
  ];
}


