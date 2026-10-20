import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { DIPLOMA_FILES, type DiplomaPhoto } from '../../shared/photo-assets';

interface EducationEntry {
  institution: string;
  program: string;
  period: string;
  details: string;
  skills: string[];
  badge?: {
    src: string;
    alt: string;
  };
  credentials?: DiplomaPhoto[];
}

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [],
  templateUrl: './education.html',
  styleUrl: './education.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EducationComponent implements AfterViewInit, OnDestroy {
  @ViewChild('timelineList')
  private timelineListRef?: ElementRef<HTMLOListElement>;

  private rafId?: number;

  protected showAll = false;

  protected get timelineToShow(): EducationEntry[] {
    return this.showAll ? this.timeline : this.timeline.slice(0, 5);
  }

  protected toggleShowAll(): void {
    this.showAll = !this.showAll;
  }

  private readonly scrollHandler = (): void => {
    this.scheduleProgressUpdate();
  };

  private readonly resizeHandler = (): void => {
    this.scheduleProgressUpdate();
  };

  protected readonly timeline: EducationEntry[] = [
    {
      institution: 'Instituto Tecnologico de las Americas (ITLA)',
      program: 'Tecnologo en Ciberseguridad',
      period: 'Ene 2026 - Dic 2028 | Issued Dic 2028',
      details: 'Formacion en seguridad de sistemas, redes y proteccion de informacion.',
      skills: ['Seguridad de redes', 'Seguridad de la informacion', 'Ciberseguridad', 'Networking']
    },
    {
      institution: 'Cisco Networking Academy',
      program: 'IT Essentials: PC Hardware and Software',
      period: 'Ene 2026 - Apr 2026 | Issued Apr 2026',
      details: 'Formacion en manejo correcto de TI y fundamentos de proteccion de sistemas.',
      skills: ['Seguridad de redes', 'Mantenimiento de hardware', 'Operaciones de Tickets', 'Windows Server'],
      credentials: [
        {
          src: DIPLOMA_FILES.previewItEssentials,
          href: DIPLOMA_FILES.itEssentials,
          alt: 'Certificado IT Essentials - Cisco Networking Academy',
          type: 'image'
        }
      ]
    },
    {
      institution: 'Cisco Networking Academy',
      program: 'CCNA 1: Introduction to Networks',
      period: 'Ene 2026 - Apr 2026 | Issued Apr 2026',
      details: 'Formacion en fundamentos de redes y seguridad de sistemas en red.',
      skills: ['Seguridad de redes', 'Networking', 'Configuracion de routers y switches', 'Redes LAN/WAN'],
      credentials: [
        {
          src: DIPLOMA_FILES.previewCcna1,
          href: DIPLOMA_FILES.ccna1,
          alt: 'Certificado CCNA 1 - Cisco Networking Academy',
          type: 'image'
        }
      ]
    },
    {
      institution: 'Cisco Networking Academy',
      program: 'CCNP: Switching, Routing, and Wireless Essentials',
      period: 'Apr 2026 - Ago 2026 | Issued Ago 2026',
      details: 'Formacion en configuracion de redes y seguridad de sistemas en red.',
      skills: ['Seguridad de redes', 'Networking', 'Configuracion de routers y switches', 'Redes LAN/WAN'],
      credentials: [
        {
          src: DIPLOMA_FILES.previewCcnp,
          href: DIPLOMA_FILES.ccnp,
          alt: 'Certificado CCNP - Cisco Networking Academy',
          type: 'image'
        }
      ]
    },
    {
      institution: 'Cisco Networking Academy',
      program: 'C++ Essentials',
      period: 'Apr 2026 - Ago 2026 | Issued Ago 2026',
      details: 'Formacion en fundamentos de programacion y desarrollo de software.',
      skills: ['Programacion en C++', 'Desarrollo de software', 'Algoritmos y estructuras de datos'],
      credentials: [
        {
          src: DIPLOMA_FILES.previewCPlusPlus,
          href: DIPLOMA_FILES.cPlusPlus,
          alt: 'Certificado C++ Essentials - Cisco Networking Academy',
          type: 'image'
        }
      ]
    },
    {
      institution: 'Fundacion Carlos Slim',
      program: 'Administrador de bases de datos',
      period: 'Apr 2026 - Ago 2026 | Issued Ago 2026',
      details: 'Formacion en administracion de bases de datos y seguridad de la informacion.',
      skills: ['Administracion de bases de datos', 'SQL', 'SQL Server'],
      credentials: [
        {
          src: DIPLOMA_FILES.previewAdministradorBasesDatos,
          href: DIPLOMA_FILES.administradorBasesDatos,
          alt: 'Certificado Administrador de Bases de Datos - Fundacion Carlos Slim',
          type: 'image'
        }
      ]

    },
    {
      institution: 'ITLA',
      program:
        'Diplomado en Seguridad Informatica',
      period: 'Apr 2025 - Jun 2025',
      details: 'Formacion en seguridad informatica aplicada y fundamentos de proteccion de sistemas.',
      skills: ['Seguridad de redes', 'Software Development', 'Seguridad de la informacion', 'HTML'],
      credentials: [
        {
          src: DIPLOMA_FILES.previewSeguridadInformatica,
          href: DIPLOMA_FILES.seguridadInformatica,
          alt: 'Certificado Diplomado Seguridad Informatica - ITLA',
          type: 'image'
        }
      ]
    },
    {
      institution: 'ITLA',
      program: 'Certificado de Desarrollo Web Front-End con Angular',
      period: 'Jan 2025 - Mar 2025',
      details: 'Formacion en desarrollo frontend moderno con Angular y diseno de interfaces web.',
      skills: [
        'Desarrollo web',
        'Software Development',
        'AngularJS',
        'Web Development',
        'Angular CLI',
        'Diseno de interfaces web',
        'HTML',
        'Angular Material'
      ],
      credentials: [
        {
          src: DIPLOMA_FILES.previewAngularFrontend,
          href: DIPLOMA_FILES.angularFrontend,
          alt: 'Certificado Curso Desarrollo Web Front-End con Angular - ITLA',
          type: 'image'
        }
      ]
    },
    {
      institution: 'ITLA',
      program: 'Diplomado en Programacion Movil IOS',
      period: 'Oct 2024 - Dec 2024',
      details: 'Base tecnica en desarrollo movil y componentes clave del ecosistema de aplicaciones.',
      skills: [
        'Desarrollo de aplicaciones para iPhone',
        'Desarrollo web',
        'Software Development',
        'AngularJS',
        'Angular CLI',
        'HTML',
        'Desarrollo de aplicaciones moviles',
        'Angular Material'
      ],
      credentials: [
        {
          src: DIPLOMA_FILES.previewProgramacionMovilIos,
          href: DIPLOMA_FILES.programacionMovilIos,
          alt: 'Certificado Diplomado en Programacion Movil para Plataforma iOS',
          type: 'image'
        }
      ]
    },
    {
      institution: 'INFOTEP',
      program:
        'Certificado en Operaciones basicas de programas de oficina, Computer and Information Sciences and Support Services',
      period: 'Aug 2024 - Oct 2024',
      details: 'Entrenamiento en herramientas de oficina y soporte operativo para entornos profesionales.',
      skills: [
        'Microsoft Outlook',
        'Revision de documentos',
        'Microsoft Office',
        'Ciencias de la computacion',
        'Microsoft PowerPoint',
        'Dispositivos moviles',
        'Microsoft Word',
        'Microsoft Excel',
        'Equipos informaticos'
      ]
    },
    {
      institution: 'Universidad APEC',
      program: 'Ingles Intermedio',
      period: '2023 - 2024',
      details: 'Formacion adicional orientada en la comunicacion y comprension del idioma ingles.',
      skills: ['Inglés B2', 'Comprension de lectura', 'Comprension auditiva', 'Expresion oral', 'Expresion escrita']
    },
    {
      institution: 'NIAERD',
      program: 'Excel Intermedio',
      period: 'Formacion registrada en CV',
      details: 'Capacitacion en manejo intermedio de hojas de calculo para tareas operativas y de soporte.',
      skills: ['Excel Intermedio', 'Analisis de datos', 'Productividad']
    },
    {
      institution: 'LinkedIn',
      program: 'Microsoft 365: Administration',
      period: 'Issued Dec 2025',
      details: 'Licencia y certificacion enfocada en administracion de Microsoft 365 y servicios cloud.',
      skills: ['Microsoft 365 and Cloud Administration']
    },
    {
      institution: 'MACROSeguridad-MASEG -- INFOTEP',
      program: 'Fundamentos de Ciberseguridad',
      period: 'Sep 2025 - Nov 2025 | Issued Nov 2025',
      details:
        'Diplomado y certificacion orientados a operaciones de infraestructura, redes y buenas practicas de soporte.',
      skills: [
        'Seguridad de redes',
        'Configuracion y administracion de redes empresariales basicas',
        'Ensamblaje de equipos',
        'Virtualizacion de maquinas y servidores',
        'Impresoras',
        'Soporte operativo',
        'Seguridad base'
      ],
      badge: {
        src: DIPLOMA_FILES.fundamentosCiberseguridadBadge,
        alt: 'Insignia Fundamentos de Ciberseguridad'
      },
      credentials: [
        {
          src: DIPLOMA_FILES.fundamentosCiberseguridadCert,
          alt: 'Certificado Fundamentos de Ciberseguridad - MACROSeguridad',
          type: 'image'
        }
      ]
    }
  ];

  ngAfterViewInit(): void {
    this.updateTimelineProgress();
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
    window.addEventListener('resize', this.resizeHandler, { passive: true });
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scrollHandler);
    window.removeEventListener('resize', this.resizeHandler);

    if (this.rafId) {
      window.cancelAnimationFrame(this.rafId);
    }
  }

  private scheduleProgressUpdate(): void {
    if (this.rafId) {
      return;
    }

    this.rafId = window.requestAnimationFrame(() => {
      this.rafId = undefined;
      this.updateTimelineProgress();
    });
  }

  private updateTimelineProgress(): void {
    const timelineList = this.timelineListRef?.nativeElement;
    if (!timelineList) {
      return;
    }

    const rect = timelineList.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const startY = viewportHeight * 0.24;
    const endY = viewportHeight * 0.74;
    const travel = rect.height + (startY - endY);

    const rawProgress = (startY - rect.top) / Math.max(travel, 1);
    const progress = Math.min(1, Math.max(0, rawProgress));

    timelineList.style.setProperty('--timeline-progress', progress.toFixed(3));
  }

  protected credentialPreviewSrc(credential: DiplomaPhoto): string {
    return credential.src ?? '';
  }
}
