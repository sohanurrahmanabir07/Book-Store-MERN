import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Root from './Root.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Listed_books } from './Pages/Listed_books.jsx'
import { Pages_to_Read } from './Pages/Pages_to_Read.jsx'
import { Home } from './Pages/Home.jsx'
import { BookDetails } from './Pages/Components/BookDetails.jsx'
import { Modal_Item } from './Pages/Components/Modal_Item.jsx'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { Privateroute } from './Pages/Components/Privateroute.jsx'





const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [

      {
        path: "/",
        element: <Home></Home>
      },
      
      {
        element:<Privateroute></Privateroute>,
        children:[

          {
            path: "/pages-to-read",
            element: <Pages_to_Read></Pages_to_Read>
          },
          {
            path: "/listed-books",
            element: <Listed_books></Listed_books>
    
          },
    
        ]
      },
      
      {
        path: `/:id`,
        element: <BookDetails></BookDetails>
      },

      {

        path: "/modal",
        element: <Modal_Item />

      }
    ]

  },

]);



createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={<><div><p>Loading From Redux persistor......</p></div></>} persistor={persistor}>
      <RouterProvider router={router} />

    </PersistGate>

  </Provider>

)
