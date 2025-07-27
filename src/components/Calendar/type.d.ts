import type { Dayjs } from 'dayjs'
export interface CalendarProps {
  value: Dayjs
}

export interface MonthCalendarProps extends CalendarProps {
  value: Dayjs
}
