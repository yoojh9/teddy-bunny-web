const firebase = require("firebase-admin");
const serviceAccount = require("../config/serviceKey.json");

const db = firebase
  .initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://floor-noise-server.firebaseio.com"
  })
  .firestore();

  /**
   * userid로 db에서 user 정보 있는지 확인
   * @param {*} userid 
   */
let checkUser = async userid => {
  const document = db.collection("users").doc(userid);
  let user = await document.get();
  return user.exists ? true : false;
};

/**
 * 회원 추가
 * @param {*} userid 
 * @param {*} phone 
 */
let addUser = async(email, nickname, thumbnail, phone) => {
  const userRef = db.collection("users")
  await userRef.doc(email).set({
    nickname: nickname,
    phone: phone,
    thumbnail: thumbnail,
    create_time: new Date(),
    update_time: new Date()
  })
}

module.exports = {
  checkUser,
  addUser
};
