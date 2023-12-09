import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { publicRoutes } from '~/routes'
import { DefaultLayout, CustomLayout } from '~/components/Layout';
import Explore from './pages/user/Explore';

function App() {
  return (
    <Router>
      <div className="App">
        <CustomLayout>
          <Routes>
            {publicRoutes.map((route, index) => {
              let Layout = DefaultLayout;
              if (route.layout) {
                Layout = route.layout;
              }
              else if (route.layout === null) {
                Layout = Fragment;
              }
              const Page = route.component;
              return <Route key={index} path={route.path} element={
                <Layout>
                  <Page />
                </Layout>} />
            })}
          </Routes>
        </CustomLayout>
      </div>
    </Router>
  );
}

export default App;
