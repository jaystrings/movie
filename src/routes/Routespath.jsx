import React from 'react'
import { RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import { Route } from 'react-router-dom'
import { Layout, Error } from '../component'
import {Genres, Home, Popular,Toprated, PersonId,Person} from '../pages'
import MovieId from '../pages/movies/MovieId'

export default function Routespath() {
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>} errorElement={<Error/>}>
         <Route index element={<Home/>}/>
         <Route path='movies/genres/:id' element={<Genres/>}/>
         <Route path='movies/popular' element={<Popular/>}/>
         <Route path='movies/top_rated' element={<Toprated/>}/>
         <Route path='person/popular' element={<Person/>}/>
         <Route path='movie/:movie_id' element={<MovieId/>}/>
         <Route path='person/:person_id' element={<PersonId/>}/>
      
    </Route>
  )
)

  return <RouterProvider router ={router}/>
}