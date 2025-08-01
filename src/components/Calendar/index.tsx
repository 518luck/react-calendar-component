import { useState, type CSSProperties, type ReactNode } from 'react'
import type { Dayjs } from 'dayjs'
import { useControllableValue } from 'ahooks'
import cs from 'classnames'

import LocaleContext from './locale/LocaleContext'
import Header from './Header'
import MonthCalendar from './MonthCalendar'
import styles from './index.module.scss'
import dayjs from 'dayjs'

export interface CalendarProps {
  value: Dayjs
}
export interface CalendarProps {
  value: Dayjs
  defaultValue?: Dayjs
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
  const { style, className, locale, value, onChange } = props
  const [curValue, setCurValue] = useControllableValue<Dayjs>(props, {
    defaultValue: dayjs(),
  })
  const [curMonth, setCurMonth] = useState<Dayjs>(value)

  const classNames = cs(styles.calendar, className)

  const changeDate = (date: Dayjs) => {
    setCurValue(date)
    setCurMonth(date)
    onChange?.(date)
  }
  const selectHandler = (date: Dayjs) => {
    changeDate(date)
  }

  const prevMonthHandler = () => {
    setCurMonth(curMonth.subtract(1, 'month'))
  }
  const nextMonthHandler = () => {
    setCurMonth(curMonth.add(1, 'month'))
  }
  const todayHandler = () => {
    const date = dayjs(Date.now())
    changeDate(date)
  }

  return (
    <LocaleContext.Provider value={{ locale: locale || navigator.language }}>
      <div className={classNames} style={style}>
        <Header
          curMonth={curMonth}
          prevMonthHandler={prevMonthHandler}
          nextMonthHandler={nextMonthHandler}
          todayHandler={todayHandler}
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
