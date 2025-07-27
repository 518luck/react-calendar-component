import type { Dayjs } from 'dayjs'
import styles from './index.module.scss'
import type { MonthCalendarProps } from './type.d'

const getAllDays = (date: Dayjs) => {
  const daysInMonth = date.daysInMonth()
  const startDate = date.startOf('month')
  const day = startDate.day()

  const daysInfo = new Array(6 * 7)

  for (let i = 0; i < day; i++) {
    daysInfo[i] = {
      date: startDate.subtract(day - i, 'day').format('YYYY-MM-DD'),
    }
  }

  debugger
}

const MonthCalendar = (props: MonthCalendarProps) => {
  const weekList = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

  const allDays = getAllDays(props.value)

  return (
    <div className={styles.calendarMonth}>
      <div className={styles.weekList}>
        {weekList.map((week) => (
          <div className={styles.listItem} key={week}>
            {week}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MonthCalendar
