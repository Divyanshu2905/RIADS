import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

export default function PrivateRoute({ children }) {
  const { currentUser, userRole } = useAuth();
  const path = children.type.name;
  const adminAllow = [
    'UpdateProfile',
    'Admin_Dashboard',
    'Admin_Attendance',
    'Admin_Notice',
    'Admin_Result',
    'Admin_CandidateProfile',
  ];
  const candidateAllow = [
    'UpdateProfile',
    'Candidate_Dashboard',
    'Candidate_Attendance',
    'Candidate_StudyMaterial',
    'Candidate_Result',
    'Candidate_ViewRegistration',
  ];

  if (!currentUser) {
    return <Navigate to='/login' />;
  }

  if (userRole === 'admin') {
    if (!adminAllow.includes(path)) {
      console.log('hello karan');
      return <Navigate to='/login' />;
    } else {
      return children;
    }
  } else if (userRole === 'candidate') {
    if (!candidateAllow.includes(path)) {
      return <Navigate to='/login' />;
    } else {
      return children;
    }
  }

  return children;
}
