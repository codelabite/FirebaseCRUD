import React from "react";
import { app } from "../base";

const db = app.firestore().collection("user");
function View() {
  const [data, setData] = React.useState([]);
  const [input, setInput] = React.useState("");

  const getData = async () => {
    await db.onSnapshot((snapshot) => {
      const items = [];
      snapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id });
      });
      setData(items);
    });
  };

  const updateData = async (user) => {
    await db.doc(user.id).set({ ...input });
  };

  React.useEffect(() => {
    getData();
  }, []);
  console.log(data);
  return (
    <div>
      This is for View
      <section>
        {data.map(({ name, email, id }) => (
          <div
            key={id}
            style={{
              width: "700px",
              height: "70px",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
              }}
            >
              <div
                style={{
                  display: "flex",
                  margin: "0 20px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                {name}
              </div>
              <div
                style={{
                  display: "flex",
                  margin: "0 20px",
                }}
              >
                {email}
              </div>
            </div>
            <div
              style={{
                display: "flex",
              }}
            >
              <button
                style={{
                  backgroundColor: "green",
                  margin: "0 10px",
                }}
                onClick={() => {
                  console.log(id);
                  // updateData();
                }}
              >
                Update
              </button>
              <button
                style={{
                  backgroundColor: "red",
                  margin: "0 10px",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default View;
