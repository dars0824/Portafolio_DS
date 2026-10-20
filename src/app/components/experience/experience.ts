import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  QueryList,
  ViewChildren
} from '@angular/core';
import SimpleParallax from 'simple-parallax-js/vanilla';
import { ScrollSpyDirective } from '../../directives/scroll-spy.directive';

interface ExperienceLink {
  label: string;
  href: string;
}

interface ExperienceItem {
  role: string;
  company: string;
  companyWebsite?: string;
  companyLogo?: string;
  additionalLinks?: ExperienceLink[];
  period: string;
  location: string;
  impact: string;
  skills: string[];
  imageSrc?: string;
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [ScrollSpyDirective],
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
      role: 'Técnico de soporte informático',
      company: 'RAMVAR Computadoras SRL',
      companyWebsite: 'https://www.ramvar.com/',
      companyLogo: '/shared/fotos/logo-ramvar.png',
      period: 'Septiembre 2026 - Presente',
      location: 'Av. Núñez de Càceres, Santo Domingo, República Dominicana (Presencial)',
      impact:
        'Atención técnica a clientes, diagnóstico y reparación de equipos, soporte de hardware y software, mantenimiento preventivo y asistencia operativa para usuarios finales y equipos de oficina.',
      skills: [
        'Soporte técnico',
        'Mantenimiento de hardware y software',
        'Diagnóstico de equipos',
        'Instalación de software',
        'Atención al cliente',
        'Resolución de incidencias',
        'Equipos de oficina',
        'Soporte remoto',
        'Soporte a domicilio'
      ],
      imageSrc: '/shared/fotos/logo-ramvar.png'
    },
    {
      role: 'Auxiliar de sistemas',
      company: 'Best Hotels',
      companyWebsite: 'https://www.besthotels.es/en/dominican-republic.html',
      additionalLinks: [
        {
          label: 'Serenade Punta Cana Beach & Spa Resort',
          href: 'https://www.serenadepuntacana.com/'
        },
        {
          label: 'Serenade All Suites',
          href: 'https://www.serenadeallsuites.com/'
        }
      ],
      period: 'Ago 2025 - Jan 2026 (6 meses)',
      location: 'Punta Cana, La Altagracia, República Dominicana (Presencial y remoto)',
      impact:
        'Soporte técnico y administración de infraestructura TI bajo la operación de Best Hotels, con atención a propiedades hoteleras y continuidad operativa de sistemas, redes y servicios críticos.',
      skills: [
        'Aptitudes para la supervisión',
        'Windows Server',
        'Soporte técnico',
        'Seguridad de redes',
        'Networking',
        'CCTV Monitoring',
        'OLT',
        'Fiber Optic Cable',
        'Administración de Microsoft Office 365',
        'Administración de sistemas',
        'Gestión de servicios de TI',
        'Experiencia de Active Directory',
        'Respuesta ante incidentes',
        'Mantenimiento del sistema',
        'CCTV Installation',
        'Impresoras de alto volumen',
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


