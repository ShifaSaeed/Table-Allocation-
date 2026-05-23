import { useState } from 'react'
import GuestDetails from './pages/GuestDetails'
import SelectTime from './pages/SelectTime'
import ChooseTable from './pages/ChooseTable'
import ReviewBooking from './pages/ReviewBooking'

function App() {
  const [step, setStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    customerName: '',
    phone: '',
    date: '',
    guests: 2,
    slot: '',
    tableId: null,
    tableName: ''
  })

  const nextStep = () => setStep(prev => prev + 1)
  const prevStep = () => setStep(prev => prev - 1)

  return (
    <div>
      {step === 1 && (
        <GuestDetails
          bookingData={bookingData}
          setBookingData={setBookingData}
          nextStep={nextStep}
        />
      )}
      {step === 2 && (
        <SelectTime
          bookingData={bookingData}
          setBookingData={setBookingData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 3 && (
        <ChooseTable
          bookingData={bookingData}
          setBookingData={setBookingData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 4 && (
        <ReviewBooking
          bookingData={bookingData}
          prevStep={prevStep}
        />
      )}
    </div>
  )
}

export default App