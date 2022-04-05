import { gql } from '@apollo/client';

const CHANGE_STATUS_ADMISSION_PROCESS = gql`
  mutation Mutation(
    $where: AdmissionProcessFilterId!
    $data: AdmissionProcessChangeStatusInput!
  ) {
    changeStatusAdmissionProcess(where: $where, data: $data) {
      id
    }
  }
`;

export { CHANGE_STATUS_ADMISSION_PROCESS };
