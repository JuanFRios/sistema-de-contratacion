export enum AdmissionStatus {
  FASE_ENTREVISTAS = 'Interview_Phase',
  FASE_CONTRATACION = 'Hiring_Phase',
  CONTRATADO = '',
  DESCARTADO = 'Discarded',
}

export enum DocumentType {
  COMPANY = 'Company',
  CANDIDATE = 'Candidate',
}

export const steps = [
  {
    label: 'Fase de entrevistas',
  },
  {
    label: 'Contratación',
  },
];

export const decodeStep = (status) => {
  switch (status) {
    case AdmissionStatus.FASE_ENTREVISTAS:
      return 0;
    case AdmissionStatus.FASE_CONTRATACION:
      return 1;
    case AdmissionStatus.DESCARTADO:
      return -1;
    case AdmissionStatus.CONTRATADO:
      return 10;
    default:
      return 0;
  }
};

export const findImage = (user) => {
  let image =
    'https://res.cloudinary.com/proyecto-integrador-udea-2022/image/upload/v1647726660/Screenshot_from_2022-03-19_16-50-20_kqfsoy.png';
  if (user.profile && user.profile.customImage) {
    image = user.profile.customImage;
  } else if (user.image) {
    image = user.image;
  }
  return image;
};
