import type { Dayjs } from 'dayjs'
import MonthCalendar from './MonthCalendar'
import styles from './index.module.scss'

export interface CalendarProps {
  value: Dayjs
}

const Calendar = (props: CalendarProps) => {
  return (
    <div className={styles.calendar}>
      <MonthCalendar {...props} />
    </div>
  )
}
export default Calendar
