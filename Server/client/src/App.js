import React, { Component } from 'react';
import { BrowserRouter} from "react-router-dom";// pages
import SectionCarousel from "./views/index-sections/SectionCarousel"
import Routes from "./Routes";
import DemoFooter from "./components/Footers/DemoFooter";
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'bootstrap-css-only/css/bootstrap.min.css';
// import 'mdbreact/dist/css/mdb.css';
import 'bootstrap/dist/css/bootstrap.css';
class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Routes/>
                    <SectionCarousel />
                    <DemoFooter/>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;