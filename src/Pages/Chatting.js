import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Chatting() {
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState([]);
  const token = localStorage.getItem("aircraft-trading-platform-token");
  const [receiver,setReceiver] = useState(useLocation().state)
  const [chats, setChats] = useState([]);
  console.log(receiver);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 6500,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleSubmit = async () => {
    if (content.trim() === "") return;
    fetch(`http://localhost:8080/api/v1/message/send`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify({
        user: { _id: receiver[0], name: receiver[1] },
        message: content,
      }),
    })
      .then((resolve) => {
        if (resolve.status === 200) {
        } else {
          resolve
            .json()
            .then((result) => {
              toast.error(result.error, toastOptions);
            })
            .catch((error) => {
              toast.error(
                "Error occurred.. Please try again later",
                toastOptions
              );
            });
        }
      })
      .catch((error) => {
        toast.error("Error occurred.. Please try again later", toastOptions);
      });

    setContent("");
  };

  const fetchAllMessages = () => {
    fetch(`http://localhost:8080/api/v1/message/get?aid=${receiver[0]}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    }).then((resolve) => {
      if (resolve.status === 200) {
        resolve.json().then((data) => {
          setMessages(data);
        });
      }
    });
  };

  const fetchAllChats = ()=>{
    fetch(`http://localhost:8080/api/v1/message/getchats`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    }).then((resolve) => {
      if (resolve.status === 200) {
        resolve.json().then((data) => {
          setChats(data);
        }).catch((error)=>{
          console.log(error);
          toast.error(error,toastOptions);
        })
      }
    }).catch((error)=>{
      console.log(error);
      toast.error(error,toastOptions);
    })
  }

  const changeReceiver = (_id,name)=>{
    const newReceiver = [_id,name];
    fetchAllMessages();
    setReceiver(newReceiver);
  }

  useEffect(() => {
    // Fetch messages for the current user and the selected receiver
    fetchAllMessages();
    fetchAllChats();
    // eslint-disable-next-line
  },[receiver,content]);

  return (
    <div className="d-flex">
      <div id="chats" className="">
        <div className="card-title">
          <h2 className="d-flex">Chats</h2>
        </div>
        <div className="card-body table-responsive">
          {chats.map((chat) => (
            <div id="chat" className="table-responsive">
              <h4 onClick={()=>changeReceiver(chat._id,chat.name)} className="text-white mt-2 d-flex ml-2">{chat.name}</h4>
              <hr />
            </div>
          ))}
        </div>
      </div>
      <div id="messages" className="col-md-9">
        <h3 className="d-flex"><i><strong>{receiver[1]}</strong></i></h3>
        <strong><hr /></strong>
        <div className="container-fluid d-flex mt-4 mb-4">
          <input
            type="text"
            value={content}
            className="form-control mt-3 bg-dark text-white"
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type your message..."
          />
          <button
            onClick={handleSubmit}
            style={{ maxHeight: "5vh" }}
            type="submit"
            className="btn btn-success mt-3"
          >
            Send
          </button>
        </div>
        {messages.length > 0 ? (
          <div className="card-body">
            {messages.map((message) => (
              <div key={message._id} className="d-flex">
                <strong>
                  {localStorage
                    .getItem("aircraft-trading-platform-user-id")
                    .match(message.sender)
                    ? "You"
                    : "Other User"}
                  :
                </strong>
                {message.content}
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <ToastContainer />
    </div>
  );
}
