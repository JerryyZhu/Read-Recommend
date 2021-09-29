import React from "react";

import PublicLayout from "./layout/PublicLayout";
import AuthenticatedLayout from "./layout/AuthenticatedLayout";

import BookDetailsPage from "./pages/BookDetail/BookDetailsPage";
import BookSearchPage from "./pages/BookSearch/BookSearchPage";
import SimilarBooksPage from "./pages/SimilarBooks/SimilarBooksPage";
import CollectionsPage from "./pages/CollectionDetails/CollectionsPage";
import ChallengesPage from "./pages/ReadingChallenges/ChallengesPage";
import ReadBooksPage from "./pages/ReadBooks/ReadBooksPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import RecoverPage from "./pages/RecoverPage";
import NotFoundPage from "./pages/NotFoundPage";

// eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "./routes";

import { createBrowserHistory } from "history";

const pages = [
  // Public pages
  {
    exact: true,
    path: routes.login,
    component: LoginPage,
    layout: PublicLayout,
  },
  {
    exact: true,
    path: routes.register,
    component: RegisterPage,
    layout: PublicLayout,
  },
  {
    exact: true,
    path: routes.forgotpassword,
    component: ForgotPasswordPage,
    layout: PublicLayout,
  },
  {
    exact: true,
    path: routes.recover,
    component: RecoverPage,
    layout: PublicLayout,
  },
  // Authenticated pages
  {
    exact: true,
    path: routes.bookdetails,
    component: BookDetailsPage,
    layout: AuthenticatedLayout,
  },
  {
    exact: true,
    path: routes.similarbooks,
    component: SimilarBooksPage,
    layout: AuthenticatedLayout
  },
  {
    exact: true,
    path: routes.booksearch,
    component: BookSearchPage,
    layout: AuthenticatedLayout
  },
  {
    exact: true,
    path: routes.collections,
    component: CollectionsPage,
    layout: AuthenticatedLayout,
  },
  {
    exact: true,
    path: routes.challenges,
    component: ChallengesPage,
    layout: AuthenticatedLayout,
  },
  {
    exact: true,
    path: routes.readbooks,
    component: ReadBooksPage,
    layout: AuthenticatedLayout,
  },
  {
    exact: true,
    path: routes.home,
    component: CollectionsPage,
    layout: AuthenticatedLayout,
  },
];

const App = () => {
  const history = createBrowserHistory();

  return (
    <Router history={history}>
      <Switch>
        {pages.map(
          (
            { exact, path, component: Component, layout: Layout, props },
            index
          ) => (
            <Route
              key={index}
              exact={exact}
              path={path}
              render={(props) => (
                <Layout history={props.history}>
                  <Component {...props} />
                </Layout>
              )}
            />
          )
        )}
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

export default App;
