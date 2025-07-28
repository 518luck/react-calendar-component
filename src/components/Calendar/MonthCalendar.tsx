import type { Dayjs } from 'dayjs'
import type { CalendarProps } from './index'
import styles from './index.module.scss'

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
        <div key={i * 7 + j} className={cellClass}>
          {item.date.date()}
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
      <div className={styles.calendarMonthBody}>{renderDays(allDays)}</div>
    </div>
  )
}

export default MonthCalendar
