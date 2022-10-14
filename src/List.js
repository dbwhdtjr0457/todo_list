import "./App.css";
import axios from "axios";
import { useState } from "react";
import Details from "./Details";

const List = function (props) {

    const removeFromList = (index, id) => {
        axios.delete(`http://localhost:3000/todos/${id}`)
            .catch((error) => {
                console.log(error.message);
            });
        const filteredList = props.list.filter(item => item.id != id);
        const temp = [...props.list];
        temp.splice(index, 1);
        props.setList(temp);
    };

    const handleCheckChange = (index, id) => {
        const temp = [...props.list];
        temp[index].completed = !temp[index].completed;
        axios.put(`http://localhost:3000/todos/${id}`, {
            title: temp[index].title,
            completed: temp[index].completed,
            createdAt: temp[index].createdAt,
            endsAt: temp[index].endsAt
        })
            .catch((error) => {
                console.log(error.message);
            });
        props.setList(temp);
    };

    const handleDateChange = (index, id, e) => {
        const temp = [...props.list];
        temp[index].endsAt = e.target.value;
        axios.put(`http://localhost:3000/todos/${id}`, {
            title: temp[index].title,
            completed: temp[index].completed,
            createdAt: temp[index].createdAt,
            endsAt: temp[index].endsAt
        })
            .catch((error) => {
                alert("데이터를 수정하는데 실패했습니다.");
                console.log(error.message);
            });
        props.setList(temp);
    };


    return (
        props.list.map((item, index) => {
            return (
                <div key={index} className="list_item">
                    <div>
                        <div className="item_title">
                            {item.completed ?
                                <del style={{ color: "gray" }}><i style={{ color: "gray" }}>{item.title}</i></del> :
                                <span>{item.title}</span>}
                            <span>
                                <img src="https://img.icons8.com/ios/50/000000/edit--v1.png" alt="edit" className="edit" />
                            </span>
                        </div>
                        <Details item={item} index={index} handleDateChange={handleDateChange} />
                    </div>
                    <div>
                        <input type="checkbox" className="checkbox" checked={item.completed} onChange={() => { handleCheckChange(index, item.id) }} />
                        <img src="https://img.icons8.com/ios/50/000000/trash.png" alt="trashcan" className="trashcan" onClick={() => { removeFromList(index, item.id); }} />
                    </div>
                </div >
            )
        })
    )
}

export default List;