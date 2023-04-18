var admin = require("firebase-admin");
var Account = require("./firestore-27f03-firebase-adminsdk-qcbsj-9fe687ed81.json");
const ref = admin.initializeApp({
  credential: admin.credential.cert(Account),
  databaseURL:`https://firestore-27f03-default-rtdb.asia-southeast1.firebasedatabase.app/`
});

const db = ref.firestore();




module.exports = db;
module.exports = ref;