import { useQuery, gql } from "@apollo/client";
import DisplayLocations from "./components/DisplayLocations";
// import Dogs from "./components/Dogs";

const GET_DOGS = gql`
  query GetDogs {
    dogs {
      id
      breed
    }
  }
`;

const GET_DOG_PHOTO = gql`
  query Dog($breed: String!) {
    dog(breed: $breed) {
      id
      displayImage
    }
  }
`;

function App() {
  function Dogs({ onDogSelected }) {
    const { loading, error, data } = useQuery(GET_DOGS);

    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    return (
      <select name="dog" onChange={onDogSelected}>
        {data.dogs.map((dog) => (
          <option key={dog.id} value={dog.breed}>
            {dog.breed}
          </option>
        ))}
      </select>
    );
  }
  function DogPhoto({ breed }) {
    const { loading, error, data } = useQuery(GET_DOG_PHOTO, {
      variables: { breed },
    });

    if (loading) return null;
    if (error) return `Error! ${error}`;

    return (
      <img src={data.dog.displayImage} style={{ height: 100, width: 100 }} />
    );
  }

  return <DogPhoto />;
}

export default App;
