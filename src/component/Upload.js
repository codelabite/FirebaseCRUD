import React from "react";
import { app } from "../base";
import { v4 as uuidv4 } from "uuid";

const db = app.firestore().collection("user");
function Upload() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [id, setId] = React.useState("");

  const postData = async (newUser) => {
    await db.doc(newUser.id).set({
      name: name,
      email: email,
      id: uuidv4(),
    });
  };

  return (
    <div>
      <section>
        <aside>
          <input
            placeholder="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            placeholder="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <button onClick={postData}>Submit</button>
        </aside>
      </section>
    </div>
  );
}

export default Upload;
