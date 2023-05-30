import { useQuery, gql, useMutation } from "@apollo/client";
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

// Define mutation
const INCREMENT_COUNTER = gql`
  # Increments a back-end counter and gets its resulting value
  mutation IncrementCounter {
    currentValue
  }
`;

const ADD_TODO = gql`
  mutation AddTodo($type: String!) {
    addTodo(type: $type) {
      id
      type
    }
  }
`;

const GET_POST = gql`
  query Post {
    post {
      id
      title
      content
    }
  }
`;

function App() {
  let input;
  const [addTodo, { data, loading, error, reset }] = useMutation(ADD_TODO, {
    variables: {
      // default value
      type: "placeholder",
      someOtherVariable: 1234,
    },
    refetchQueries: [
      GET_POST, // Document object parsed with gql
      "GetComments", // Query name
    ],
  });

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

  if (loading) return "Submitting...";
  if (error) return "Submission error";

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo({ variables: { type: input.value } });
          input.value = "";
        }}
      >
        <input
          ref={(node) => {
            input = node;
          }}
        />
        <button type="submit">Add Todo</button>
      </form>
      {error && (
        // LoginFailedMessage
        <div message={error.message} onDismiss={() => reset()} />
      )}
    </div>
  );
}

export default App;
