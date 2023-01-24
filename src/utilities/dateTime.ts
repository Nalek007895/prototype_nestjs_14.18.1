export const GetDayStringByDay = () => {
  let dayString
  switch (new Date().getDay()) {
    case 0:
      dayString = 'SUNDAY'
      break
    case 1:
      dayString = 'MONDAY'
      break
    case 2:
      dayString = 'TUESDAY'
      break
    case 3:
      dayString = 'WEDNESDAY'
      break
    case 4:
      dayString = 'THURSDAY'
      break
    case 5:
      dayString = 'FRIDAY'
      break
    case 6:
      dayString = 'SATURDAY'
  }
  return dayString
}
