import { useQuery } from "@apollo/client";
import React from "react";

export default function Dogs({ onDogSelected }) {
  const { loading, error, data } = useQuery();

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
