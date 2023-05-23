import {ReactElement} from "react"
import Footer from "./Footer";
import Navbar from "./Navbar";
import TopFooter from "./TopFooter";


interface Props {
children: ReactElement;
}

const Layout = ({children}: Props) => (
  <>
    <Navbar />
    <main>{children}</main>
    <TopFooter />
    <Footer />
  </>
);

export default Layout;