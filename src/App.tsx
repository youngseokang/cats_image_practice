import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import PictureContainer from "./pages/pictureContainer";
// import SearchContainer from "./pages/searchContainer";
// import UploadContainer from "./pages/uploadContainer";

function App() {
  const PictureContainer = lazy(() => import("./pages/pictureContainer"));
  const SearchContainer = lazy(() => import("./pages/searchContainer"));
  const UploadContainer = lazy(() => import("./pages/uploadContainer"));
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <h1>CATS_IMAGE</h1>
        </header>
        <nav>
          <ul>
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
            <li>
              <Link to="/upload">Upload</Link>
            </li>
          </ul>
        </nav>
        <Suspense fallback={<div>loading...</div>}>
          <Routes>
            <Route path="/" element={<PictureContainer />} />
            <Route path="/search" element={<SearchContainer />} />
            <Route path="/upload" element={<UploadContainer />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
