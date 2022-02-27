import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
import theme from './theme';
import routes from './routes';
import { onMessageListener } from './helpers/firebase';
import { toast } from 'react-toastify';
import Toast from './components/Toast';

const App = () => {
  const content = useRoutes(routes);

  toast("Hello");

  onMessageListener().then(payload => {
    toast(
      <Toast title={payload.data.title} body={payload.data.body} url={payload.data.click_action} />, 
      { position: toast.POSITION.TOP_CENTER }
    );

  }).catch(err => toast("Enable Notification") );

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {content}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
