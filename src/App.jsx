import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Product from './pages/Product'
import ProductDetail from './pages/ProductDetail'
import Resource from './pages/Resource'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Developer from './pages/Developer'
import QC01WReflashUbuntu2004Minimal from './pages/developer/qc01w/QC01WReflashUbuntu2004Minimal'
import QC01WReflashUbuntu2404 from './pages/developer/qc01w/QC01WReflashUbuntu2404'
import QC01WReflashQCLinux from './pages/developer/qc01w/QC01WReflashQCLinux'
import QC01WReflashAndroid from './pages/developer/qc01w/QC01WReflashAndroid'
import QC01WReflashWindowsIot from './pages/developer/qc01w/QC01WReflashWindowsIot'
import NcoxNconReflash from './pages/developer/nvidia/NcoxNconReflash'
import PsoxPsonReflash from './pages/developer/nvidia/PsoxPsonReflash'
import UconReflash from './pages/developer/nvidia/UconReflash'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product" element={<Product />} />
              <Route path="/product/:productId" element={<ProductDetail />} />
              <Route path="/resource" element={<Resource />} />
              <Route path="/developer" element={<Developer />} />
              <Route path="/developer/qc01w/reflash/ubuntu-20-04-minimal" element={<QC01WReflashUbuntu2004Minimal />} />
              <Route path="/developer/qc01w/reflash/ubuntu-24-04" element={<QC01WReflashUbuntu2404 />} />
              <Route path="/developer/qc01w/reflash/qclinux" element={<QC01WReflashQCLinux />} />
              <Route path="/developer/qc01w/reflash/android" element={<QC01WReflashAndroid />} />
              <Route path="/developer/qc01w/reflash/windows-iot" element={<QC01WReflashWindowsIot />} />
              <Route path="/developer/nvidia/ncox-ncon/:jetpack/:method" element={<NcoxNconReflash />} />
              <Route path="/developer/nvidia/psox-pson/:jetpack/:method" element={<PsoxPsonReflash />} />
              <Route path="/developer/nvidia/ucon/:jetpack/:method" element={<UconReflash />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
