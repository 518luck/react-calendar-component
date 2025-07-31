import { useContext } from 'react'
import type { Dayjs } from 'dayjs'
import cs from 'classnames'

import type { CalendarProps } from './index'
import styles from './index.module.scss'
import allLocales from './locale'
import LocaleContext from './locale/LocaleContext'

interface MonthCalendarProps extends CalendarProps {
  selectHandler?: (date: Dayjs) => void
  curMonth: Dayjs
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

const MonthCalendar = (props: MonthCalendarProps) => {
  const localeContext = useContext(LocaleContext)

  const { value, dateRender, dateInnerContent, selectHandler, curMonth } = props

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

  const allDays = getAllDays(curMonth)

  const renderDays = (days: Array<{ date: Dayjs; currentMonth: boolean }>) => {
    const rows = []
    for (let i = 0; i < 6; i++) {
      const row = []
      for (let j = 0; j < 7; j++) {
        const item = days[i * 7 + j]
        const cellClass = item.currentMonth
          ? `${styles.calendarMonthBodyCell} ${styles.calendarMonthBodyCellCurrent}`
          : styles.calendarMonthBodyCell

        row[j] = (
          <div
            key={i * 7 + j}
            className={cellClass}
            onClick={() => selectHandler?.(item.date)}>
            {dateRender ? (
              dateRender(item.date)
            ) : (
              <div className={styles.calendarMonthBodyCellDate}>
                <div
                  className={cs(
                    styles.calendarMonthBodyCellDateValue,
                    value?.format('YYYY-MM-DD') ===
                      item.date.format('YYYY-MM-DD')
                      ? styles.calendarMonthBodyCellDateSelected
                      : ''
                  )}>
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

  return (
    <div className={styles.calendarMonth}>
      <div className={styles.weekList}>
        {weekList.map((week) => (
          <div className={styles.listItem} key={week}>
            {CalendarLocale.week[week]}
          </div>
        ))}
      </div>
      <div className={styles.calendarMonthBody}>{renderDays(allDays)}</div>
    </div>
  )
}

export default MonthCalendar
