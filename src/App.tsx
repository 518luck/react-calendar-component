import Calendar from '@/components/Calendar'
import dayjs from 'dayjs'
function App() {
  return (
    <Calendar
      value={dayjs('2023-11-08')}
      locale='en-US'
      dateInnerContent={(value) => {
        return (
          <div>
            <p style={{ background: 'yellowgreen', height: '30px' }}>
              {value.format('YYYY/MM/DD')}
            </p>
          </div>
        )
      }}
    />
  )
}
export default App
