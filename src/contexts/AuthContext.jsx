import { createContext, useContext, useEffect, useState } from 'react';

import { auth, db } from '../firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState();
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    setIsLogin(true);
    return auth.signInWithEmailAndPassword(email, password);
  }
  
  function logout() {
    // console.log("logout called!");
    setIsAdmin(false);
    setIsLogin(false);
    return auth.signOut();
  }
  
  function setAdmin() {
    return setIsAdmin(true);
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      setLoading(false);

      if (user) {
        const adminRef = db.collection('admin').doc(user.uid);
        const candidateRef = db.collection('candidate').doc(user.uid);

        const admindoc = await adminRef.get();
        const candidatedoc = await candidateRef.get();

        if (admindoc.exists) {
          setUserRole('admin');
        } else if (candidatedoc.exists) {
          setUserRole('candidate');
        } else {
          setUserRole('none');
        }
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userRole,
    isLogin,
    isAdmin,
    setAdmin,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}