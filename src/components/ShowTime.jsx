import { parseISO, formatDistanceToNow } from "date-fns-jalali"

const ShowTime = ({ timestamp }) => {
    let timeEgo = ""
    if (timestamp) {
        const date = parseISO(timestamp)
        const time = formatDistanceToNow(date)
        timeEgo = `${time} قبل`
    }

    return (
        <span>
            <i>{timeEgo}</i> &nbsp;
        </span>
    )
}

export default ShowTime