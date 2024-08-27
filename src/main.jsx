import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from "react-redux"

import store from "./store/store.js"
import { createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"


import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Sigup from "./pages/Signup.jsx"
import AllPosts from "./pages/AllPosts.jsx"
import AddPost from "./pages/AddPost.jsx"
import EditPost from "./pages/EditPost.jsx"
import Post from "./pages/Post.jsx"


import AuthLayout from "./components/AuthLayout.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path: "/",
        element: <Home/>
      },
      {
        path:"/login",
        element:(
          <AuthLayout authentication= {false}>
            <Login/>
          </AuthLayout>
        )
      },
      {
        path:"/signup",
        element:(
          <AuthLayout authentication= {false}>
            <Sigup/>
          </AuthLayout>
        )
      },
      {
        path:"/allposts",
        element:(
          <AuthLayout authentication>
            <AllPosts/>
          </AuthLayout>
        )
      },
      {
        path:"/addpost",
        element:(
          <AuthLayout authentication>
            <AddPost/>
          </AuthLayout>
        )
      },
      {
        path:"/editpost/:slug",
        element:(
          <AuthLayout authentication>
            <EditPost/>
          </AuthLayout>
        )
      },
      {
        path:"/Post/:slug",
        element:(
          <AuthLayout authentication>
            <Post/>
          </AuthLayout>
        )
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
