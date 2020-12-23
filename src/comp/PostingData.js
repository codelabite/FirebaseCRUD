import React from "react";
import { app } from "../base";
import { v4 as uuidv4 } from "uuid";

const db = app.firestore().collection("schools");

function PostingData() {
  const [name, setName] = React.useState("");
  const [item, setItem] = React.useState([]);
  const [click, setClick] = React.useState(false);

  const clickEffect = (e) => {
    setClick(true);
  };

  const onChangeClick = async (id) => {
    console.log(id, ": can be Change");
    // await db.doc(id)
    // setClick(true);
    await db.doc(id).update({ status: click });
  };

  const postData = async (docs) => {
    // const id = uuidv4();
    await db.doc(docs.id).set({
      name: name,
      id: uuidv4(),
      status: click,
    });
  };

  const onDelete = async (id) => {
    // await db.doc().delete(id);
    // console.log(id, ": had been deleted");
    if (window.confirm("Are you sure?")) {
      console.log(id);
      db.doc(id).delete();
    }
  };

  const updateData = async (id) => {
    // await db.doc(id).update()
    const name = prompt();

    await db.doc(id).update({ name: name });

    console.log(id, ": has been updated");
    console.log(name);
  };

  const getData = async () => {
    await db.onSnapshot((snapshot) => {
      const items = [];
      snapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id });
      });
      setItem(items);
    });
  };

  React.useEffect(() => {
    getData();
  }, []);
  console.log(item);
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
          <button onClick={postData}>Add</button>
        </aside>
      </section>

      <hr />

      <section>
        {item.map((post) => (
          <aside
            key={post.id}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div style={{ display: "flex" }}>
              <div
                style={{ cursor: "pointer", margin: "0 10px" }}
                onClick={(id) => {
                  setClick(true);
                  onChangeClick(post.id);
                  // onChangeClick(post.id);
                  // console.log()
                }}
              >
                {post.status === true ? "👍" : "👎"}
              </div>
              {post.name}{" "}
            </div>
            <div style={{ display: "flex" }}>
              <div
                style={{ cursor: "pointer", margin: "0 10px" }}
                onClick={() => {
                  updateData(post.id);
                  // console.log();
                }}
              >
                ✔️
              </div>
              <div
                style={{ cursor: "pointer", margin: "0 10px" }}
                onClick={() => {
                  onDelete(post.id);
                  // console.log();
                }}
              >
                ❌
              </div>
            </div>
          </aside>
        ))}
      </section>
    </div>
  );
}

export default PostingData;
