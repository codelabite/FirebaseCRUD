import { SettingsSystemDaydream } from "@material-ui/icons";
import React from "react";
import { app } from "../base";

const db = app.firestore().collection("people");
function Posting1() {
  const [name, setName] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [data, setData] = React.useState([]);
  const [done, setDone] = React.useState(false);

  const PostData = async () => {
    await db.doc().set({
      name: name,
      desc: desc,
      status: done,
      date: Date.now(),
    });
  };

  const onUpdateStatus = async (id) => {
    await db.doc(id).update({ status: done });
    console.log(id);
  };

  const getData = async () => {
    await db.orderBy("date", "asc").onSnapshot((snapshot) => {
      const items = [];
      snapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id });
      });
      setData(items);
    });
  };

  const onDelete = async (id) => {
    if (window.confirm("are you sure?")) {
      await db.doc(id).delete();
    }
    console.log(id);
  };
  const onUpdated = async (id) => {
    const desc = prompt();
    await db.doc(id).update({ desc: desc });
    // if (window.confirm()) {

    // }

    console.log(id);
  };

  React.useEffect(() => {
    getData();
  }, []);
  console.log(data);
  return (
    <div>
      <section>
        <aside>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            placeholder="Desc"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />

          <button onClick={PostData}>Add</button>
        </aside>
      </section>
      <div>
        <hr />
      </div>
      <section>
        {data.map((post) => (
          <aside key={post.id}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex" }}>
                <div
                  style={{ margin: "0 5px", cursor: "pointer" }}
                  onClick={() => {
                    setDone(!done);
                    onUpdateStatus(post.id);
                  }}
                >
                  {" "}
                  {post.status === true ? "👍" : " 👎"}{" "}
                </div>
                <div style={{ fontWeight: "bold" }}>{post.name}</div>
              </div>
              <div style={{ display: "flex" }}>
                <div
                  onClick={() => {
                    onUpdated(post.id);
                  }}
                  style={{ margin: "0 5px", cursor: "pointer" }}
                >
                  ✔️
                </div>
                <div
                  onClick={() => {
                    onDelete(post.id);
                  }}
                  style={{ margin: "0 5px", cursor: "pointer" }}
                >
                  ❌
                </div>
              </div>
            </div>
            <div>{post.desc}</div>
          </aside>
        ))}
      </section>
    </div>
  );
}

export default Posting1;
