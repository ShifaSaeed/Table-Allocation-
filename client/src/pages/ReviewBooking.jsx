import { useState } from 'react'
import axios from 'axios'

function ReviewBooking({ bookingData, prevStep }) {
  const [loading, setLoading] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [error, setError] = useState('')

  const handleConfirm = async () => {
    setLoading(true)
    setError('')
    try {
      await axios.post('http://localhost:5000/api/reservations', {
        customerName: bookingData.customerName,
        phone: bookingData.phone,
        guests: bookingData.guests,
        date: bookingData.date,
        slot: bookingData.slot,
        tableId: bookingData.tableId
      })
      setConfirmed(true)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (confirmed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-12 shadow-sm text-center max-w-md">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold mb-2">Reservation Confirmed!</h2>
          <p className="text-gray-400 text-sm mb-6">Your table has been successfully reserved.</p>
          <div className="bg-gray-50 rounded-xl p-4 text-left text-sm space-y-2">
            <div className="flex justify-between"><span className="text-gray-400">Name</span><span className="font-medium">{bookingData.customerName}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Date</span><span className="font-medium">{bookingData.date}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Time</span><span className="font-medium">{bookingData.slot}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Guests</span><span className="font-medium">{bookingData.guests}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Table</span><span className="font-medium">{bookingData.tableName}</span></div>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-orange-500 text-white py-3 rounded-xl mt-6 font-semibold hover:bg-orange-600 transition"
          >
            Make Another Reservation
          </button>
        </div>
      </div>
    )
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
          <div className="h-1 w-16 bg-orange-500 rounded"></div>
        </div>
      </div>

      {/* Review */}
      <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-sm">
        <button onClick={prevStep} className="text-sm text-gray-500 mb-4 flex items-center gap-1">← Back</button>
        <h2 className="text-2xl font-bold mb-1">Review Booking</h2>
        <p className="text-gray-400 text-sm mb-6">Confirm your reservation details</p>

        <div className="bg-gray-50 rounded-xl p-5 space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400 uppercase tracking-wider">Name</span>
            <span className="font-semibold">{bookingData.customerName}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400 uppercase tracking-wider">Contact</span>
            <span className="font-semibold">{bookingData.phone}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400 uppercase tracking-wider">Date</span>
            <span className="font-semibold">{bookingData.date}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400 uppercase tracking-wider">Time</span>
            <span className="font-semibold">{bookingData.slot}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400 uppercase tracking-wider">Guests</span>
            <span className="font-semibold">{bookingData.guests}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400 uppercase tracking-wider">Table</span>
            <span className="font-semibold">{bookingData.tableName}</span>
          </div>
        </div>

        {error && <p className="text-red-400 text-sm mt-3">{error}</p>}

        <button
          onClick={handleConfirm}
          disabled={loading}
          className="w-full bg-orange-500 text-white py-4 rounded-xl mt-6 font-semibold tracking-widest hover:bg-orange-600 transition disabled:opacity-50"
        >
          {loading ? 'CONFIRMING...' : 'CONFIRM RESERVATION'}
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

export default ReviewBooking