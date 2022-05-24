import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreateContainer from "./pages/createContainer";
import ExcelDownloadContainer from "./pages/excelDownloadContainer";
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
            <li>
              <Link to="/download">download</Link>
            </li>
            <li>
              <Link to="/create">Create</Link>
            </li>
          </ul>
        </nav>
        <Suspense fallback={<div>loading...</div>}>
          <Routes>
            <Route path="/" element={<PictureContainer />} />
            <Route path="/search" element={<SearchContainer />} />
            <Route path="/upload" element={<UploadContainer />} />
            <Route path="/download" element={<ExcelDownloadContainer />} />
            <Route path="/create" element={<CreateContainer />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
