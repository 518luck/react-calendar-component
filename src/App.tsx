import Calendar from '@/components/Calendar'
import dayjs from 'dayjs'
function App() {
  return (
    <Calendar
      value={dayjs('2023-11-09')}
      locale='en-US'
      onChange={(date) => {
        alert(date.format('YYYY-MM-DD'))
      }}
      /*  dateInnerContent={(value) => {
        return (
          <div>
            <p style={{ background: 'yellowgreen', height: '30px' }}>
              {value.format('YYYY/MM/DD')}
            </p>
          </div>
        )
      }} */
    />
  )
}
export default App
