import { ChangeDetectionStrategy, Component } from '@angular/core';

interface SkillCard {
  name: string;
  level: number;
  domain: string;
  note: string;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsComponent {
  protected readonly skills: SkillCard[] = [
    {
      name: 'Soporte al Usuario',
      level: 92,
      domain: 'Mesa de Ayuda',
      note: 'Atencion y resolucion de incidencias tecnicas para usuarios finales.'
    },
    {
      name: 'Windows Server',
      level: 82,
      domain: 'Administracion de Sistemas',
      note: 'Gestion operativa de servicios, cuentas y continuidad de plataforma.'
    },
    {
      name: 'Active Directory',
      level: 78,
      domain: 'Infraestructura',
      note: 'Soporte en administracion de usuarios, grupos y estructura organizativa.'
    },
    {
      name: 'Microsoft 365',
      level: 88,
      domain: 'Productividad Empresarial',
      note: 'Administracion de Microsoft Admin 365 y soporte sobre herramientas Office.'
    },
    {
      name: 'Networking',
      level: 87,
      domain: 'Redes',
      note: 'Rastreo de tomas de datos, configuracion basica y soporte de conectividad.'
    },
    {
      name: 'Cableado Estructurado',
      level: 84,
      domain: 'Soporte de Campo',
      note: 'Desarrollo de RJ45, jacks y conectores de fibra optica.'
    },
    {
      name: 'Cybersecurity',
      level: 89,
      domain: 'Seguridad Defensiva',
      note: 'Auxiliar en ciberseguridad, monitoreo y respuesta inicial ante incidentes.'
    },
    {
      name: 'CCTV y Monitoreo',
      level: 80,
      domain: 'Seguridad Fisica/TI',
      note: 'Seguimiento de camaras IP, CCTV monitoring y soporte de instalacion.'
    },
    {
      name: 'Mantenimiento Preventivo',
      level: 86,
      domain: 'Hardware y Operaciones',
      note: 'Revision tecnica preventiva para equipos informaticos e impresoras.'
    },
    {
      name: 'Ingles B1',
      level: 70,
      domain: 'Comunicacion',
      note: 'Comprension y comunicacion tecnica intermedia en entornos de trabajo.'
    }
  ];
}


