export interface DiplomaPhoto {
  src: string;
  alt: string;
  type?: 'image' | 'pdf';
  href?: string;
}

const DIPLOMA_FOLDER = '/shared/fotos/diplomas';

const diplomaPath = (fileName: string): string => `${DIPLOMA_FOLDER}/${fileName}`;

export const CV_FILE_URL = diplomaPath('cv-darwin-sosa.pdf');

export const DIPLOMA_FILES = {
  seguridadInformatica: diplomaPath('seguridad-informatica.pdf'),
  angularFrontend: diplomaPath('angular-frontend.pdf'),
  programacionMovilIos: diplomaPath('movil-ios.pdf'),
  previewSeguridadInformatica: diplomaPath('preview-seguridad-informatica.png'),
  itEssentials: diplomaPath('it-essentials.pdf'),
  previewItEssentials: diplomaPath('preview-it-essentials.png'),
  ccna1: diplomaPath('ccna1.pdf'),
  previewCcna1: diplomaPath('preview-ccna1.png'),
  ccnp: diplomaPath('ccnp.pdf'),
  previewCcnp: diplomaPath('preview-ccnp.png'),
  cPlusPlus: diplomaPath('c-essentials.pdf'),
  previewCPlusPlus: diplomaPath('preview-c-essentials.png'),
  administradorBasesDatos: diplomaPath('administrador-base-datos.pdf'),
  previewAdministradorBasesDatos: diplomaPath('preview-administrador-base-datos.png'),
  previewAngularFrontend: diplomaPath('preview-angular-frontend.png'),
  previewProgramacionMovilIos: diplomaPath('preview-movil-ios.png'),
  fundamentosCiberseguridadBadge: diplomaPath('fundamentos-de-ciberseguridad.png'),
  fundamentosCiberseguridadCert: diplomaPath('certificado-fundamentos-ciberseguridad.png')
} as const;
