import React from "react";
import { app } from "../base";

const db = app.firestore();
function Update() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [id, setId] = React.useState("");

  const updateData = async (user) => {
    await db
      .collection("user")
      .doc(user.id)
      .set({ ...user });
  };
  return (
    <div>
      <section>
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
        <button onClick={updateData}>OK</button>
      </section>
    </div>
  );
}

export default Update;
