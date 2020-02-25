const firebase = require("firebase-admin");
const serviceAccount = require("../config/serviceKey.json");

const db = firebase
  .initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://floor-noise-server.firebaseio.com"
  })
  .firestore();

let checkUser = async userid => {
  const document = db.collection("users").doc(userid);
  let user = await document.get();

  console.log("user.exists : " + user.exists);
  return user.exists ? true : false;
};

module.exports = {
  checkUser
};
