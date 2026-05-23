import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './app/layout';
import HomePage from './app/page';
import HowItWorksPage from './app/how-it-works/page';
import SolutionsPage from './app/solutions/page';
import UseCasesPage from './app/use-cases/page';
import ContactPage from './app/contact/page';
import LoginPage from './app/login/page';
import SignUpPage from './app/signup/page';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/use-cases" element={<UseCasesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
