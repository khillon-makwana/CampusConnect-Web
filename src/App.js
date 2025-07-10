import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import JobsPage from './pages/JobsPage';
import StudyGroupsPage from './pages/StudyGroupsPage';
import ArticlesPage from './pages/ArticlesPage';
import LoginPage from './pages/LoginPage';       
import SignupPage from './pages/SignupPage';
import AddEventsPage from './pages/AddEventsPage';
import AddRSVPPage from "./pages/AddRSVPPage";
import AddJobPage from "./pages/AddJobPage";
import AddStudyGroupPage from "./pages/AddStudyGroupPage";
import JoinStudyGroupsPage from "./pages/JoinStudyGroupsPage";
import MyStudyGroupsPage from "./pages/MyStudyGroupsPage";
import AddArticlePage from "./pages/AddArticlePage";
import ArticleDetailPage from './pages/ArticleDetailPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/study-groups" element={<StudyGroupsPage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/login" element={<LoginPage />} />      
        <Route path="/signup" element={<SignupPage />} /> 
        <Route path="/add-event" element={<AddEventsPage />} /> 
        <Route path="/add-rsvp" element={<AddRSVPPage />} />
        <Route path="/add-job" element={<AddJobPage />} />
        <Route path="/post-study-group" element={<AddStudyGroupPage />} />
        <Route path="/join-study-group" element={<JoinStudyGroupsPage />} />
        <Route path="/my-study-groups" element={<MyStudyGroupsPage />} />
        <Route path="/add-article" element={<AddArticlePage />} />
        <Route path="/article/:id" element={<ArticleDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
