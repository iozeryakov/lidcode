/**
 * Обработчик события начала перетаскивания.
 * 
 * @param {React.DragEvent<HTMLDivElement>} e - Событие перетаскивания.
 * @param {function(value: React.SetStateAction<boolean>): void} setDrag - Функция для установки значения состояния перетаскивания.
 */
export function dragStartHandler(e: React.DragEvent<HTMLDivElement>, setDrag: (value: React.SetStateAction<boolean>) => void) {
    e.preventDefault()
    setDrag(true)

}
/**
 * Обработчик события покидания области перетаскивания.
 * @param {React.DragEvent<HTMLDivElement>} e - Событие перетаскивания.
 * @param {function(value: React.SetStateAction<boolean>): void} setDrag - Функция для установки значения состояния перетаскивания.
 */
export function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>, setDrag: (value: React.SetStateAction<boolean>) => void) {
    e.preventDefault()
    setDrag(false)
}