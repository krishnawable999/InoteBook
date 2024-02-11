import React, { useState, useContext } from "react";
import noteContext from "../context/Notes/NoteContext";


const Addnote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({title:"",description:"", tag:""})
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title:"",description:"", tag:""});
    props.showAlert("Notes Added Successfully","success");
  }

  const onChange = (e) =>{
    setNote({...note,[e.target.name]: e.target.value})
  }

  return (
    <div>
      <div className="container my-3">
        <h3>Add a Note</h3>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              name="title"
              aria-describedby="emailHelp" value={note.title}
              onChange={onChange}minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label" >
              Description
            </label>
            <input
              type="text"
              className="form-control" value={note.description}
              id="description" name="description" onChange={onChange} minLength={5} required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label" >
              Tag
            </label>
            <input
              type="text"
              className="form-control" value={note.tag}
              id="tag" name="tag" onChange={onChange} minLength={5} required
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1" 
            />
          </div>
          <button disabled={note.title.length<5 ||  note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addnote;
