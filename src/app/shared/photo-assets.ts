export interface DiplomaPhoto {
  src: string;
  alt: string;
  type?: 'image' | 'pdf';
  href?: string;
}

const DIPLOMA_FOLDER = '/shared/fotos/diplomas';

const diplomaPath = (encodedFileName: string): string => `${DIPLOMA_FOLDER}/${encodedFileName}`;

export const CV_FILE_URL = diplomaPath('CV%20Darwin%20Sosa.pdf');

export const DIPLOMA_FILES = {
  seguridadInformatica: diplomaPath('Certificado_Diplomado_Seguridad_Inform%C3%A1tica.pdf'),
  angularFrontend: diplomaPath('Certificado_Curso_Desarrollo_Web_Front-End_Con_Angular.pdf'),
  programacionMovilIos: diplomaPath(
    'Certificado_Diplomado_en_Programaci%C3%B3n_M%C3%B3vil_para_Plataforma_iOS_(IONIC).pdf'
  ),
  previewSeguridadInformatica: diplomaPath('Seguridad%20informatica.png'),
  previewAngularFrontend: diplomaPath('Curso%20de%20Angular.png'),
  previewProgramacionMovilIos: diplomaPath('Programacion%20movil.png'),
  fundamentosCiberseguridadBadge: diplomaPath('fundamentos-de-ciberseguridad.png'),
  fundamentosCiberseguridadCert: diplomaPath('Screenshot_20251126-160303.Files%20de%20Google.png')
} as const;
