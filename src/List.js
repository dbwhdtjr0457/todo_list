/* eslint-disable */

import "./App.css";
import axios from "axios";
import Details from "./Details";
import { useState } from "react";

const List = function (props) {
  const removeFromList = (index, id) => {
    axios.delete(`http://localhost:3000/todos/${id}`).catch((error) => {
      console.log(error.message);
    });
    const temp = [...props.list];
    temp.splice(index, 1);
    props.setList(temp);
  };

  const handleCheckChange = (index, id) => {
    const temp = [...props.list];
    temp[index].completed = !temp[index].completed;
    axios
      .put(`http://localhost:3000/todos/${id}`, {
        title: temp[index].title,
        completed: temp[index].completed,
        createdAt: temp[index].createdAt,
        endsAt: temp[index].endsAt,
      })
      .catch((error) => {
        console.log(error.message);
      });
    props.setList(temp);
  };

  const handleDateChange = (index, id, e) => {
    const temp = [...props.list];
    temp[index].endsAt = e.target.value;
    axios
      .put(`http://localhost:3000/todos/${id}`, {
        title: temp[index].title,
        completed: temp[index].completed,
        createdAt: temp[index].createdAt,
        endsAt: temp[index].endsAt,
      })
      .catch((error) => {
        alert("데이터를 수정하는데 실패했습니다.");
        console.log(error.message);
      });
    props.setList(temp);
  };

  const handleTitleChange = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      axios
        .put(`http://localhost:3000/todos/${props.item.id}`, {
          title: props.item.title,
          completed: props.item.completed,
          createdAt: props.item.createdAt,
          endsAt: props.item.endsAt,
        })
        .catch((error) => {
          alert("데이터를 수정하는데 실패했습니다.");
          console.log(error.message);
        });
    }
  };

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div key={props.index} className="list_item">
      <div>
        <div className="item_title">
          {props.item.completed ? (
            <del style={{ color: "gray" }}>
              <i style={{ color: "gray" }}>{props.item.title}</i>
            </del>
          ) : (
            <>
              {isEditing ? (
                <input
                  type="text"
                  value={props.item.title}
                  onChange={(e) => {
                    const temp = [...props.list];
                    temp[props.index].title = e.target.value;
                    props.setList(temp);
                  }}
                  className="edit_title"
                />
              ) : (
                <span>{props.item.title}</span>
              )}
            </>
          )}
          <span>
            <img
              src="https://img.icons8.com/ios/50/000000/edit--v1.png"
              alt="edit"
              className="edit"
              onClick={
                props.item.completed
                  ? () => {
                      alert("완료된 할 일은 수정할 수 없습니다.");
                    }
                  : handleTitleChange
              }
            />
          </span>
        </div>
        <Details
          item={props.item}
          index={props.index}
          handleDateChange={handleDateChange}
        />
      </div>
      <div>
        <input
          type="checkbox"
          className="checkbox"
          checked={props.item.completed}
          onChange={() => {
            handleCheckChange(props.index, props.item.id);
          }}
        />
        <img
          src="https://img.icons8.com/ios/50/000000/trash.png"
          alt="trashcan"
          className="trashcan"
          onClick={() => {
            removeFromList(props.index, props.item.id);
          }}
        />
      </div>
    </div>
  );
};

export default List;
