import { useEffect, useState } from "react";
import "./App.css";
import List from "./List";
import axios from "axios";

function App() {
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");

  const getList = () => {
    axios
      .get("http://localhost:3000/todos")
      .then((response) => {
        setList(response.data);
      })
      .catch((error) => {
        alert("데이터를 불러오는데 실패했습니다.");
        console.log(error.message);
      });
  };

  const addToList = async () => {
    if (input !== "") {
      const today = new Date();
      const year = today.getFullYear();
      let month = today.getMonth() + 1;
      let date = today.getDate();
      if (month < 10) {
        month = "0" + month;
      }
      if (date < 10) {
        date = "0" + date;
      }
      await axios
        .post("http://localhost:3000/todos", {
          title: input,
          completed: false,
          createdAt: new Date().toLocaleString(),
          endsAt: year + "-" + month + "-" + date,
        })
        .catch((error) => {
          alert("데이터를 추가하는데 실패했습니다.");
          console.log(error.message);
        });
      getList();
      setInput("");
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div className="App">
      <div>
        <h1 className="title">TODO LIST</h1>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              addToList();
            }
          }}
          placeholder="입력 후 엔터 혹은 버튼 클릭"
          className="list_input"
        />
        <button
          onClick={() => {
            addToList();
          }}
          className="add_button"
        >
          추가
        </button>
        <div className="list">
          {list.map((item, index) => {
            return (
              <List
                key={index}
                index={index}
                item={item}
                list={list}
                setList={setList}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
