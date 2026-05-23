import { useState, useEffect } from 'react'
import axios from 'axios'

function ChooseTable({ bookingData, setBookingData, nextStep, prevStep }) {
  const [tables, setTables] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/tables/available`, {
          params: {
            date: bookingData.date,
            slot: bookingData.slot,
            guests: bookingData.guests
          }
        })
        setTables(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchTables()
  }, [])

  const handleContinue = () => {
    if (!bookingData.tableId) return alert('Please select a table')
    nextStep()
  }

  const getBadge = (index) => {
    if (index === 0) return <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full ml-2">BEST MATCH</span>
    if (index === 1) return <span className="bg-orange-400 text-white text-xs px-2 py-1 rounded-full ml-2">RECOMMENDED</span>
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="bg-white px-8 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🍽</span>
          <span className="font-bold text-xl">SmartDineN</span>
        </div>
        <div className="flex gap-6 text-sm font-medium">
          <span className="text-orange-500 border-b-2 border-orange-500">Home</span>
          <span className="text-gray-600">About</span>
          <span className="text-gray-600">Contact</span>
          <span className="text-gray-600">Reservation</span>
          <span className="text-gray-600">Menu</span>
        </div>
        <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm">Admin</button>
      </nav>

      {/* Header */}
      <div className="text-center pt-10 pb-6">
        <h1 className="text-4xl font-bold">Reserve a <span className="text-orange-500">Table</span></h1>
        <p className="text-gray-400 text-sm mt-2 tracking-widest">YOUR PERFECT DINING EXPERIENCE STARTS HERE</p>
        <div className="flex justify-center gap-3 mt-6">
          <div className="h-1 w-16 bg-orange-500 rounded"></div>
          <div className="h-1 w-16 bg-orange-500 rounded"></div>
          <div className="h-1 w-16 bg-orange-500 rounded"></div>
          <div className="h-1 w-16 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Tables */}
      <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-sm">
        <button onClick={prevStep} className="text-sm text-gray-500 mb-4 flex items-center gap-1">← Back</button>
        <h2 className="text-2xl font-bold mb-1">Choose Your Table</h2>
        <p className="text-gray-400 text-sm mb-6">Suggestions for {bookingData.guests} guests</p>

        {loading ? (
          <p className="text-gray-400">Loading tables...</p>
        ) : tables.length === 0 ? (
          <p className="text-red-400">No tables available for this slot. Please go back and select another time.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {tables.map((table, index) => (
              <button
                key={table.id}
                onClick={() => setBookingData({
                  ...bookingData,
                  tableId: table.id,
                  tableName: table.tableNumber
                })}
                className={`flex items-center justify-between border rounded-xl px-5 py-4 transition
                  ${bookingData.tableId === table.id
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-orange-300'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⊞</span>
                  <div className="text-left">
                    <p className="font-semibold text-gray-800">
                      {table.tableNumber}
                      {getBadge(index)}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {table.seats} SEATS • AVAILABLE AT {bookingData.slot}
                    </p>
                  </div>
                </div>
                <span className="text-gray-400">›</span>
              </button>
            ))}
          </div>
        )}

        <button
          onClick={handleContinue}
          className="w-full bg-orange-500 text-white py-4 rounded-xl mt-6 font-semibold tracking-widest hover:bg-orange-600 transition"
        >
          CONTINUE
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16 px-16 py-10">
        <div className="flex justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span>🍽</span>
              <span className="font-bold">SmartDineN</span>
            </div>
            <p className="text-gray-400 text-xs max-w-xs">Smart restaurant monitoring powered by AI.</p>
          </div>
          <div>
            <p className="font-semibold mb-3">QUICK LINKS</p>
            <div className="flex flex-col gap-2 text-gray-400 text-sm">
              <span>Home</span><span>About</span><span>Contact</span><span>Reservation</span>
            </div>
          </div>
          <div>
            <p className="font-semibold mb-3">CONTACT</p>
            <div className="flex flex-col gap-2 text-gray-400 text-sm">
              <span>smartdinen@gmail.com</span>
              <span>03212119456</span>
              <span>123 Restaurant Ave</span>
            </div>
          </div>
          <div>
            <p className="font-semibold mb-3">HOURS</p>
            <div className="flex flex-col gap-2 text-gray-400 text-sm">
              <span>Mon - Fri: 11am - 11pm</span>
              <span>Saturday: 10am - 12am</span>
              <span>Sunday: 10am - 10pm</span>
            </div>
          </div>
        </div>
        <p className="text-gray-600 text-xs mt-8">© 2026 SmartDineN. All rights reserved.</p>
      </footer>

    </div>
  )
}

export default ChooseTable