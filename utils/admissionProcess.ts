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
