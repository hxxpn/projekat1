import React, { useState } from "react";
import Movie from "./movie";
import { DropdownButton } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";

function FormPractice() {
  // Like state except it's way easier to mantain changes
  const [pretraga, setPretraga] = useState("");
  const [filmovi, setFilmovi] = useState([]);
  const [sortParam, setSort] = useState("Title");
  const [order, setOrder] = useState(true); // is it ascending or descending

  // basic url of a database
  let url = `http://www.omdbapi.com/?apikey=dab9f982&s=${pretraga}`;
  // submit hadnler, we perform a s query, giving us brief info about a certain movie
  // additionaly we may need to fill it with Desc, Genre, Actors, Directors
  const handleSubmit = async (event) => {
    event.preventDefault(); // this is only for an input box
    try {
      // api comunication
      let res = await fetch(url);
      let data = await res.json();
      setFilmovi(data.Search);
    } catch (error) {
      console.log(error);
    }
  };
  // sorting and mapping is performed simultaneously, string comp may be funky
  let filmoviPrikaz =
    filmovi === undefined ? (
      <h1>Enter a Valid name</h1>
    ) : (
      filmovi.map((film) => <Movie props={film} key={film.imdbID} />)
    );
  const handleCheckChange = (event) => {
    if (order) {
      setFilmovi(
        filmovi.sort((a, b) => (a[sortParam] > b[sortParam] ? 1 : -1))
      );
      setOrder(false);
    } else {
      setFilmovi(
        filmovi.sort((a, b) => (a[sortParam] < b[sortParam] ? 1 : -1))
      );
      setOrder(true);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
        <div className = "form-group">
      <input
        type="text"
        value={pretraga}
        onChange={(e) => setPretraga(e.target.value)}
      />
      </div>
      <button type="submit" className="btn btn-primary" placeholder="example">
        Search
      </button>
  <p>{(order)?"ascending":"descending"}</p>
      <input
        type="checkbox"
        name="descending"
        value={order}
        onChange={handleCheckChange}
      />
      <DropdownButton title={sortParam} id="dropdown-basic-button">
        <DropdownItem onClick={(e) => setSort("Title")}>Title</DropdownItem>
        <DropdownItem onClick={(e) => setSort("Year")}>Year</DropdownItem>
        <DropdownItem onClick={(e) => setSort("Genre")}>Genre</DropdownItem>
      </DropdownButton>
      {filmoviPrikaz}
    </form>
  );
}

export default FormPractice;
