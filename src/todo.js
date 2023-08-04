import React, { useState, useEffect } from "react";
import "./style.css";

const getlocalData = () => {
  const lists = localStorage.getItem("mytodolist");
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const ToDo = () => {
  const [InputData, setInputData] = useState("");
  const [Items, setItems] = useState(getlocalData());
  const [EditedItem, setEditedItem] = useState("");
  const [ToggleButton, setToggleButton] = useState(false);

  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(Items));
  }, [Items]);

  //adding the list
  const addItems = (index) => {
    if (!InputData) {
      alert("Please fill the data");
    } 
    else if(InputData && ToggleButton){
      setItems(
        Items.map((curElem)=>{
          if(curElem.id === EditedItem){
            return{...curElem,name:InputData}
          }
          return curElem
        })
      )
      setInputData("");
      // setEditedItem("");
      setToggleButton(false);
    }

    
    else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: InputData,
      };
      setItems([...Items, myNewInputData]);
    }
    setInputData("");
  };

  const editItem = (index) => {
    const editedItem = Items.find((curElem) => {
      return curElem.id === index;
    });

    setInputData(editedItem.name);
    setEditedItem(index);
    setToggleButton(true);

  };

  const deleteItems = (index) => {
    const updatedList = Items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updatedList);
  };

  const removeAll = () => {
    return setItems([]);
  };

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todoimage1.avif" alt="todoiamge" />
            <figcaption>Add your list here ✌️</figcaption>
          </figure>
          <div className="addItmes">
            <input
              type="text"
              placeholder="✍️ Add Items"
              className="form-control"
              value={InputData}
              onChange={(event) => setInputData(event.target.value)}
            />
            {
            ToggleButton ? (
              <i class="far fa-edit add-btn" onClick={() => addItems()}></i>
            ) : (
              <i
                class="fa fa-plus add-btn"
                onClick={addItems}
              ></i>
            )}
          </div>

          {/* showing all the items */}
          <div className="showItems">
            {Items.map((curElem) => {
              return (
                <>
                  <div className="eachItem" key={curElem.id}>
                    <h3>{curElem.name}</h3>
                    <div className="to-do-btn">
                      <i
                        class="far fa-edit add-btn"
                        onClick={() => editItem(curElem.id)}
                      ></i>
                      <i
                        class="far fa-trash-alt add-btn"
                        onClick={() => deleteItems(curElem.id)}
                      ></i>
                    </div>
                  </div>
                </>
              );
            })}
          </div>

          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick= {() => removeAll()}
            >
              <span> Check List </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDo;
