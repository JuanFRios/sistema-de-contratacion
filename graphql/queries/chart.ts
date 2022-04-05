import { gql } from '@apollo/client';

const GET_CHART_DATA = gql`
  query Series {
    getChartData {
      series {
        data
      }
      categories
    }
  }
`;
export { GET_CHART_DATA };
