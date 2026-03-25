import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* الصفحات هتتحط هنا لما الـ Router يتعمل */}
      </main>

      <Footer />
    </div>
  )
}

export default App