import { useContext } from 'react'
import type { Dayjs } from 'dayjs'

import type { CalendarProps } from './index'
import styles from './index.module.scss'
import allLocales from './locale'
import LocaleContext from './locale/LocaleContext'

interface MonthCalendarProps extends CalendarProps {
  value: Dayjs
}

const getAllDays = (date: Dayjs) => {
  const startDate = date.startOf('month')
  const day = startDate.day()

  const daysInfo = new Array<{ date: Dayjs; currentMonth: boolean }>(6 * 7)

  for (let i = 0; i < day; i++) {
    daysInfo[i] = {
      date: startDate.subtract(day - i, 'day'),
      currentMonth: false,
    }
  }

  for (let i = day; i < daysInfo.length; i++) {
    const calcDate = startDate.add(i - day, 'day')
    daysInfo[i] = {
      date: calcDate,
      currentMonth: calcDate.month() === date.month(),
    }
  }
  return daysInfo
}

const renderDays = (
  days: Array<{ date: Dayjs; currentMonth: boolean }>,
  dateRender: MonthCalendarProps['dateRender'],
  dateInnerContent: MonthCalendarProps['dateInnerContent']
) => {
  const rows = []
  for (let i = 0; i < 6; i++) {
    const row = []
    for (let j = 0; j < 7; j++) {
      const item = days[i * 7 + j]
      const cellClass = item.currentMonth
        ? `${styles.calendarMonthBodyCell} ${styles.calendarMonthBodyCellCurrent}`
        : styles.calendarMonthBodyCell

      row[j] = (
        <div key={i * 7 + j} className={cellClass}>
          {dateRender ? (
            dateRender(item.date)
          ) : (
            <div className={styles.calendarMonthBodyCellDate}>
              <div className={styles.calendarMonthBodyCellDateValue}>
                {item.date.date()}
              </div>
              <div className={styles.calendarMonthBodyCellDateContent}>
                {dateInnerContent?.(item.date)}
              </div>
            </div>
          )}
        </div>
      )
    }
    rows.push(row)
  }
  return rows.map((row, index) => (
    <div key={index} className={styles.calendarMonthBodyRow}>
      {row}
    </div>
  ))
}
const MonthCalendar = (props: MonthCalendarProps) => {
  const localeContext = useContext(LocaleContext)

  const { dateRender, dateInnerContent } = props

  const CalendarLocale = allLocales[localeContext.locale]

  const weekList = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ]

  const allDays = getAllDays(props.value)

  return (
    <div className={styles.calendarMonth}>
      <div className={styles.weekList}>
        {weekList.map((week) => (
          <div className={styles.listItem} key={week}>
            {CalendarLocale.week[week]}
          </div>
        ))}
      </div>
      <div className={styles.calendarMonthBody}>
        {renderDays(allDays, dateRender, dateInnerContent)}
      </div>
    </div>
  )
}

export default MonthCalendar
