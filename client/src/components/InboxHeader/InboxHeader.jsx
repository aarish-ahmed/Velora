import { Link } from "react-router-dom"
import './InboxHeader.css'

const InboxHeader = ({receiver}) => {
  return (
    <div className="inbox-header">
    <Link to='/home'>Home</Link>
    <h3>
  {receiver
    ?.split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")}
</h3>
    </div>
  )
}

export default InboxHeader