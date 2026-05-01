export interface PortfolioSection {
  id: string;
  label: string;
  shortLabel: string;
}

export const PORTFOLIO_SECTIONS: PortfolioSection[] = [
  { id: 'home', label: 'Home', shortLabel: 'Home' },
  { id: 'skills', label: 'Skills / Lenguajes', shortLabel: 'Skills' },
  { id: 'education', label: 'Educacion', shortLabel: 'Educacion' },
  { id: 'experience', label: 'Experiencia', shortLabel: 'Experiencia' },
  { id: 'projects', label: 'Proyectos', shortLabel: 'Proyectos' },
  { id: 'cybersecurity', label: 'Zona Cybersecurity', shortLabel: 'Cyber' },
  { id: 'contact', label: 'Contacto', shortLabel: 'Contacto' }
];
