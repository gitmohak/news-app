import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';

import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  apiKey = process.env.REACT_APP_API_KEY;
  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({progress: progress});
  }

  render() {
    return (
      <BrowserRouter>
        <LoadingBar color='#f11946' height={3} progress={this.state.progress}/>
        <Navbar />
        <Routes>
          <Route path="/">
            <Route index element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="home" pageSize={8} country="us" category="general" />} />

            <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={8} country="us" category="business" />} />

            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={8} country="us" category="entertainment" />} />

            <Route exact path="/general" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={8} country="us" category="general" />} />

            <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={8} country="us" category="health" />} />

            <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={8} country="us" category="science" />} />

            <Route exact path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={8} country="us" category="sports" />} />

            <Route exact path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={8} country="us" category="technology" />} />

          </Route>
        </Routes>
      </BrowserRouter>
    )
  }
}