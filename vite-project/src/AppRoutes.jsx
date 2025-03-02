import React from "react";
import { Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import LRUPage from "./components/LRUPage";
import BSTVisualizer from "./components/BST/BSTVisualizer";
// import NotFound from "./components/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/lru-cache" element={<LRUPage />} />
      <Route path='/BST' element={<BSTVisualizer/>}></Route>
    </Routes>
  );
};

export default AppRoutes;

