import { ThemeProvider } from '../../components/theme/themeProvider';
import MainBody from './QuestionTemplates/MainBody';

import Navbar from './QuestionTemplates/Navbar';

const TestCreator: React.FC = () => (
  <>
  <ThemeProvider>
    <Navbar />
    <MainBody/>
  </ThemeProvider>
  </>
);

export default TestCreator;
