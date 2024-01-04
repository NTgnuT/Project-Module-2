import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCuLOPv-u-e1_3GKjkb0lXfUxmvyIZmuBw",
  authDomain: "module2-project-82198.firebaseapp.com",
  projectId: "module2-project-82198",
  storageBucket: "module2-project-82198.appspot.com",
  messagingSenderId: "128441404037",
  appId: "1:128441404037:web:4f740f11f87b30db8ff7ec",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

//tao tham chieu den dich vu luu tru duoc su dung de tham chieu trong toan bo ung dung
const storage = getStorage(app);

// export ra ben ngoai de su dung
export { storage };
