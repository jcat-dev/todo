/**
 * Devuelve un nuevo array ordenado. 
 */
export const sortArr = <T>(arr: T[], currentIndex: number, targetIndex: number): T[] => {
  const newArr = [...arr]
  const [deletedData] = newArr.splice(currentIndex, 1)
  newArr.splice(targetIndex, 0, deletedData)

  return newArr
}