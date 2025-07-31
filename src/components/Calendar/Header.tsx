import { useContext } from 'react'
import { Dayjs } from 'dayjs'

import allLocales from './locale'
import LocaleContext from './locale/LocaleContext'
import styles from './index.module.scss'

interface HeaderProps {
  curMonth: Dayjs
  prevMonthHandler: () => void
  nextMonthHandler: () => void
  todayHandler: () => void
}
const Header = (props: HeaderProps) => {
  const { curMonth, prevMonthHandler, nextMonthHandler, todayHandler } = props

  const localeContext = useContext(LocaleContext)
  const CalendarLocale = allLocales[localeContext.locale]

  return (
    <div className={styles.calendar_header}>
      <div className={styles.calendar_header_left}>
        <div className={styles.calendar_header_icon} onClick={prevMonthHandler}>
          &lt;
        </div>
        <div className={styles.calendar_header_value}>
          {curMonth.format(CalendarLocale.formatMonth)}
        </div>
        <div className={styles.calendar_header_icon} onClick={nextMonthHandler}>
          &gt;
        </div>
        <button className={styles.calendar_header_btn} onClick={todayHandler}>
          {CalendarLocale.today}
        </button>
      </div>
    </div>
  )
}

export default Header
