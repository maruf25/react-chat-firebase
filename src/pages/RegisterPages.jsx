import "../style.scss";
import add from "../img/addAvatar.png";
import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const RegisterPages = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, `${displayName}`);

      // const uploadTask = uploadBytesResumable(storageRef, file);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (error) {
            console.log(error);
            setErr(true);
          }
        });
      });

      // uploadTask.on(
      //   (error) => {
      //     setErr(true);
      //   },
      //   () => {
      //     getDownloadURL(storageRef).then(async (downloadURL) => {
      //       await updateProfile(res.user, {
      //         displayName,
      //         photoURL: downloadURL,
      //       });
      //       await setDoc(doc(db, "users", res.user.uid), {
      //         uid: res.user.uid,
      //         displayName,
      //         email,
      //         photoURL: downloadURL,
      //       });

      //       await setDoc(doc(db, "userChats", res.user.id), {});
      //       navigate("/");
      //     });
      //   }
      // );
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Lama Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="display name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <input type="file" id="file" style={{ display: "none" }} />
          <label htmlFor="file">
            <img src={add} alt="" />
            <span>Add an avatar</span>
          </label>
          <button type="submit">Sign Up</button>
        </form>
        <p>You do have an account ? Login</p>
      </div>
      {err && <span>Something went wrong</span>}
    </div>
  );
};

export default RegisterPages;
