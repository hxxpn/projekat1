import React, { useState } from "react";

function Movie(props) {
  const [filmData, setFilmData] = useState({});

  const handleClick = async (event) => {
    let ques = await fetch(
      `http://www.omdbapi.com/?apikey=dab9f982&t=${props.props.Title}`
    );
    let res = await ques.json();
    setFilmData(res);
  };

  return (
    <div onMouseEnter={handleClick} className = "card"  style ={{width: 600,marginLeft:"auto",marginRight:"auto"}} >
      <h2 className = "card-title">{props.props.Title}</h2>
      <div className ="card-body">
      <img src={props.props.Poster} alt="poster" className = "card-img-top" style ={{width: 500,marginLeft:"auto",marginRight:"auto"}}/>
      <p className = "card-text" >{filmData !== undefined ? filmData.Plot : ""}</p>
  <p className = "card-text">Genre: {filmData !== undefined ? filmData.Genre : ""}</p>
  <p className = "card-text">Year: {filmData !== undefined ? filmData.Year : ""}</p>
      </div>
      
    </div>
  );
}
export default Movie;
