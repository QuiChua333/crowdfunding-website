import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { publicRoutes, privateUserRoutes, loginRoutes, adminRoutes } from '~/routes'
import { DefaultLayout, CustomLayout, AdminRoutes, LoginRoutes, PrivateUserRoutes  } from '~/components/Layout';
import Explore from './pages/user/Explore';

function App() {
  return (
    <Router>
      <div className="App">
        <CustomLayout>
          {/* <Routes>
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
          </Routes> */}
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
            <Route element={<PrivateUserRoutes />}>
              {
                privateUserRoutes.map((route, index) => {
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

            </Route>
            <Route element={<LoginRoutes />}>
              {
                loginRoutes.map((route, index) => {
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

            </Route>
            <Route element={<AdminRoutes />}>
              {
                adminRoutes.map((route, index) => {
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

            </Route>
          </Routes>
        </CustomLayout>
      </div>
    </Router>
  );
}

export default App;
