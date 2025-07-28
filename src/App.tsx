import Calendar from '@/components/Calendar'
import dayjs from 'dayjs'
function App() {
  return (
    <Calendar
      value={dayjs('2023-11-08')}
      dateRender={(value) => {
        return (
          <div>
            <p style={{ background: 'yellowgreen', height: '500px' }}>
              {value.format('YYYY/MM/DD')}
            </p>
          </div>
        )
      }}
    />
  )
}
export default App
