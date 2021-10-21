import { BrowserRouter, Route } from 'react-router-dom';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { About } from './container/about';
import { Contact } from './container/contact';
import { Home } from './container/home';
import { Register } from './container/register';
import { Login } from './container/login';
import PostDetails from './components/post/postDetails';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient();

function App () {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen flex flex-col">
        <BrowserRouter>
          <Header />
          <div className="flex-grow">
            <Route path="/" exact >
              <Home />
            </Route>
            <Route path="/about" exact >
              <About />
            </Route>
            <Route path="/contact" exact >
              <Contact />
            </Route>
            <Route path="/login" exact >
              <Login />
            </Route>
            <Route path="/register" exact >
              <Register />
            </Route>
            <Route path="/post/:id" exact >
              <PostDetails />
            </Route>
          </div>
          <Footer />
        </BrowserRouter>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
