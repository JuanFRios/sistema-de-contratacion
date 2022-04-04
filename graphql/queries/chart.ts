import { gql } from '@apollo/client';

const GET_CHART_DATA = gql`
  query GetChartData {
    getChartData {
      series {
        data
        name
      }
      categories
    }
  }
`;
export { GET_CHART_DATA };
