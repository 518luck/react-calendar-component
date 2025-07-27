import MonthCalendar from './MonthCalendar'
import type { CalendarProps } from './type.d'
import styles from './index.module.scss'

const Calendar = (props: CalendarProps) => {
  return (
    <div className={styles.calendar}>
      <MonthCalendar {...props} />
    </div>
  )
}
export default Calendar
