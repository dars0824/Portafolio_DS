export interface PortfolioSection {
  id: string;
  label: string;
  shortLabel: string;
}

export const PORTFOLIO_SECTIONS: PortfolioSection[] = [
  { id: 'home', label: 'Inicio', shortLabel: 'Inicio' },
  { id: 'skills', label: 'Habilidades / Lenguajes', shortLabel: 'Habilidades' },
  { id: 'education', label: 'Educación', shortLabel: 'Educación' },
  { id: 'experience', label: 'Experiencia', shortLabel: 'Experiencia' },
  { id: 'projects', label: 'Proyectos', shortLabel: 'Proyectos' },
  { id: 'contact', label: 'Contacto', shortLabel: 'Contacto' },
  { id: 'cybersecurity', label: 'Zona Ciberseguridad', shortLabel: 'Ciber' }
];
