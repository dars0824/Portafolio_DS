import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CV_FILE_URL } from '../../shared/photo-assets';

interface ContactChannel {
  label: string;
  value: string;
  href: string;
  hint: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent {
  protected readonly channels: ContactChannel[] = [
    {
      label: 'Email',
      value: 'sosadarwin677@gmail.com',
      href: 'mailto:sosadarwin677@gmail.com',
      hint: 'Contacto directo para proyectos y oportunidades.'
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/darwin-sosa-santana-807b0333a',
      href: 'https://www.linkedin.com/in/darwin-sosa-santana-807b0333a',
      hint: 'Perfil profesional y certificaciones.'
    },
    {
      label: 'GitHub',
      value: 'github.com/dars0824',
      href: 'https://github.com/dars0824',
      hint: 'Repositorios, practicas y proyectos.'
    },
   /* {
      label: 'Aldaba',
      value: 'aldaba.com/dars0824',
      href: '',
      hint: ''
    }, */
  ];

  protected readonly cvUrl = CV_FILE_URL;
}


