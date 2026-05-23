import { useState } from 'react'

function GuestDetails({ bookingData, setBookingData, nextStep }) {
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
    if (!bookingData.customerName.trim()) newErrors.customerName = 'Name required'
    if (!bookingData.phone.trim()) newErrors.phone = 'Contact required'
    if (!bookingData.date) newErrors.date = 'Date required'
    return newErrors
  }

  const handleContinue = () => {
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    nextStep()
  }

  // Today's date minimum
  const today = new Date().toISOString().split('T')[0]

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
          <span className="text-gray-600 cursor-pointer">About</span>
          <span className="text-gray-600 cursor-pointer">Contact</span>
          <span className="text-gray-600 cursor-pointer">Reservation</span>
          <span className="text-gray-600 cursor-pointer">Menu</span>
        </div>
        <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm">Admin</button>
      </nav>

      {/* Header */}
      <div className="text-center pt-10 pb-6">
        <h1 className="text-4xl font-bold">Reserve a <span className="text-orange-500">Table</span></h1>
        <p className="text-gray-400 text-sm mt-2 tracking-widest">YOUR PERFECT DINING EXPERIENCE STARTS HERE</p>

        {/* Steps */}
        <div className="flex justify-center gap-3 mt-6">
          <div className="h-1 w-16 bg-orange-500 rounded"></div>
          <div className="h-1 w-16 bg-gray-200 rounded"></div>
          <div className="h-1 w-16 bg-gray-200 rounded"></div>
          <div className="h-1 w-16 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-sm">
        <h2 className="text-2xl font-bold mb-1">Guest Details</h2>
        <p className="text-gray-400 text-sm mb-6">Tell us about your visit</p>

        <div className="grid grid-cols-2 gap-4">

          {/* Full Name */}
          <div>
            <label className="text-sm text-gray-500 mb-1 block">Full Name</label>
            <input
              type="text"
              placeholder="Your Name"
              value={bookingData.customerName}
              onChange={e => setBookingData({ ...bookingData, customerName: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-orange-400"
            />
            {errors.customerName && <p className="text-red-400 text-xs mt-1">{errors.customerName}</p>}
          </div>

          {/* Contact */}
          <div>
            <label className="text-sm text-gray-500 mb-1 block">Contact Number</label>
            <input
              type="text"
              placeholder="+1 234 567 890"
              value={bookingData.phone}
              onChange={e => setBookingData({ ...bookingData, phone: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-orange-400"
            />
            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
          </div>

          {/* Date */}
          <div>
            <label className="text-sm text-gray-500 mb-1 block">Date</label>
            <input
              type="date"
              min={today}
              value={bookingData.date}
              onChange={e => setBookingData({ ...bookingData, date: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-orange-400"
            />
            {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date}</p>}
          </div>

          {/* Guests */}
          <div>
            <label className="text-sm text-gray-500 mb-1 block">Number of Guests</label>
            <div className="flex items-center border border-gray-200 rounded-lg px-4 py-3 gap-4">
              <button
                onClick={() => setBookingData({ ...bookingData, guests: Math.max(1, bookingData.guests - 1) })}
                className="text-orange-500 font-bold text-lg"
              >−</button>
              <span className="flex-1 text-center font-medium">{bookingData.guests}</span>
              <button
                onClick={() => setBookingData({ ...bookingData, guests: Math.min(8, bookingData.guests + 1) })}
                className="text-orange-500 font-bold text-lg"
              >+</button>
            </div>
          </div>

        </div>

        {/* Continue Button */}
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

export default GuestDetails