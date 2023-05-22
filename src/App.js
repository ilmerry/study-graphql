import { useQuery, gql } from "@apollo/client";
import DisplayLocations from "./components/DisplayLocations";

function App() {
  const GET_LOCATIONS = gql`
    query GetLocations {
      locations {
        id
        name
        description
        photo
      }
    }
  `;
  return (
    <div>
      <DisplayLocations locations={GET_LOCATIONS} />
    </div>
  );
}

export default App;
