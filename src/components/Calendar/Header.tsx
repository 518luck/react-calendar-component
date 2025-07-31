import { Dayjs } from 'dayjs'

import styles from './index.module.scss'

interface HeaderProps {
  curMonth: Dayjs
  prevMonthHandler: () => void
  nextMonthHandler: () => void
  todayHandler: () => void
}
const Header = (props: HeaderProps) => {
  const { curMonth, prevMonthHandler, nextMonthHandler, todayHandler } = props

  return (
    <div className={styles.calendar_header}>
      <div className={styles.calendar_header_left}>
        <div className={styles.calendar_header_icon} onClick={prevMonthHandler}>
          &lt;
        </div>
        <div className={styles.calendar_header_value}>
          {curMonth.format('YYYY 年 MM 月')}
        </div>
        <div className={styles.calendar_header_icon} onClick={nextMonthHandler}>
          &gt;
        </div>
        <button className={styles.calendar_header_btn} onClick={todayHandler}>
          今天
        </button>
      </div>
    </div>
  )
}

export default Header
