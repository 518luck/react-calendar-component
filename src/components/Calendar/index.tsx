import { useState, type CSSProperties, type ReactNode } from 'react'
import type { Dayjs } from 'dayjs'
import cs from 'classnames'

import LocaleContext from './locale/LocaleContext'
import Header from './Header'
import MonthCalendar from './MonthCalendar'
import styles from './index.module.scss'

export interface CalendarProps {
  value: Dayjs
}
export interface CalendarProps {
  value: Dayjs
  // style 和 className 用于修改 Calendar 组件外层容器的样式。
  style?: CSSProperties
  className?: string | string[]
  //定制日期显示,会完全覆盖日期单元格
  dateRender?: (currentDate: Dayjs) => ReactNode
  //定制日期单元格,内容会被添加到单元格内,只在全屏日历模型下生效
  dateInnerContent?: (currentDate: Dayjs) => ReactNode
  //国际化相关
  locale?: string
  onChange?: (date: Dayjs) => void
}

const Calendar = (props: CalendarProps) => {
  const { style, className, locale, onChange, value } = props
  const [curValue, setCurValue] = useState<Dayjs>(value)
  const [curMonth, setCurMonth] = useState<Dayjs>(value)

  const classNames = cs(styles.calendar, className)

  const selectHandler = (date: Dayjs) => {
    setCurValue(date)
    onChange?.(date)
  }

  const prevMonthHandler = () => {
    setCurMonth(curMonth.subtract(1, 'month'))
  }
  const nextMonthHandler = () => {
    setCurMonth(curMonth.add(1, 'month'))
  }

  return (
    <LocaleContext.Provider value={{ locale: locale || navigator.language }}>
      <div className={classNames} style={style}>
        <Header
          curMonth={curMonth}
          prevMonthHandler={prevMonthHandler}
          nextMonthHandler={nextMonthHandler}
        />
        <MonthCalendar
          {...props}
          value={curValue}
          curMonth={curMonth}
          selectHandler={selectHandler}
        />
      </div>
    </LocaleContext.Provider>
  )
}
export default Calendar
