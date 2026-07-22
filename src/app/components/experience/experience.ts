import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  QueryList,
  ViewChildren
} from '@angular/core';
import SimpleParallax from 'simple-parallax-js';

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  impact: string;
  skills: string[];
  imageSrc?: string;
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [],
  templateUrl: './experience.html',
  styleUrl: './experience.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperienceComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('parallaxImage', { read: ElementRef })
  private parallaxImageRefs!: QueryList<ElementRef<HTMLImageElement>>;

  private parallaxInstances: Array<InstanceType<typeof SimpleParallax>> = [];

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
      ],
      imageSrc: '/shared/fotos/Serenade.jpg'
    }
  ];

  ngAfterViewInit(): void {
    this.initializeParallax();
    this.parallaxImageRefs.changes.subscribe(() => this.initializeParallax());
  }

  ngOnDestroy(): void {
    this.parallaxInstances.forEach((instance) => instance.destroy());
    this.parallaxInstances = [];
  }

  private initializeParallax(): void {
    this.parallaxInstances.forEach((instance) => instance.destroy());
    this.parallaxInstances = [];

    if (!this.parallaxImageRefs?.length) {
      return;
    }

    this.parallaxImageRefs.toArray().forEach((imageRef) => {
      const image = imageRef.nativeElement;
      this.parallaxInstances.push(
        new SimpleParallax(image, {
          delay: 0.6,
          scale: 1.15,
          transition: 'cubic-bezier(0,0,0,1)'
        })
      );
    });
  }
}


