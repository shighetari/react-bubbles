import React, { useState, useEffect } from "react"; //added useEffect
// import axios from "axios"; //using axiosWithAuth instead
//my imports
import { useParams } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth"


const initialColor = {
  color: "",
  code: { hex: "" }
};
//passed in fetchColors() through props from BubblePage.js component
const ColorList = ({ colors, updateColors, fetchColors }) => {
  // console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [addColor, setAddColor] = useState(initialColor) //stretch 
  //destructure id to use useParams
  const { id } = useParams()

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now? - where "is is saved? lol"
    //~~start of my logic~~\\
    axiosWithAuth()
      .put(`/api/colors/${id}`, colorToEdit)
      .then((res) => {
        //creating a new/copy of colorlist(colors through props) state that's 
        //mapped through and then what's passed through the else if is the value of newColorList
        const newColorList = colors.map((item) => {
          if (item.id === colorToEdit.id) {
            return res.data
          } else {
            return item
          }
        })
        //updateColors is passed through BubblePage for setColorList state, updating it's value to the newColorList
        updateColors(newColorList)
      })
      .catch((err) => {
        console.log(err)
        debugger
      })
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    /* start of my delete function logic*/
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then((res) => {
        console.log(res.data)
        //in theroy could i just do updateColors(res.data)? if i have time i'll play with the prop states passaround if not ask question
        fetchColors() //invoking the fetchColor function so the colorlist updates
      })
      .catch((err) => {
        console.log(err)
        debugger
      })
  };

  const addNewColor = (e) => {
    e.preventDefault()
    axiosWithAuth()
      .post(`/api/colors`, addColor)
      .then((res) => {
        console.log(res.data)
        //post adds the call for me so i'm only running the fetchColors function passed through props
        // in order to get a refresh on colorlist
        fetchColors()
      })
      .catch((err) => {
        console.log(err)
        debugger
      })
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                e.stopPropagation();
                deleteColor(color)
              }
              }>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      
      {/* stretch - build another form here to add a color */}
      <form onSubmit={addNewColor}>
        <input
          type="text"
          required
          name="color"
          value={addColor.color}
          onChange={e =>
            setAddColor({
              ...addColor,
              color: e.target.value
            })}
        />
        <br />
        <input
          type="text"
          name="code"
          required
          value={addColor.code.hex}
          onChange={e =>
            setAddColor({
              ...addColor,
              code: { hex: e.target.value }
            })}

        />
        <button> add color </button>
      </form>
    </div>
  );
};

export default ColorList;
