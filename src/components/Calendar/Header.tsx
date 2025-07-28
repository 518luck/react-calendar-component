import styles from './index.module.scss'

const Header = () => {
  return (
    <div className={styles.calendar_header}>
      <div className={styles.calendar_header_left}>
        <div className={styles.calendar_header_icon}>&lt;</div>
        <div className={styles.calendar_header_value}>2023 年 11 月</div>
        <div className={styles.calendar_header_icon}>&gt;</div>
        <button className={styles.calendar_header_btn}>今天</button>
      </div>
    </div>
  )
}

export default Header
