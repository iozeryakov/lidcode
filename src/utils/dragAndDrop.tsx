export function dragStartHandler(e: React.DragEvent<HTMLDivElement>, setDrag: (value: React.SetStateAction<boolean>) => void) {
    e.preventDefault()
    setDrag(true)

}
export function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>, setDrag: (value: React.SetStateAction<boolean>) => void) {
    e.preventDefault()
    setDrag(false)
}