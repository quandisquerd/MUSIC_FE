
import UploadMusic from './UploadMusic'

const AddMusic = ({user,users }: any) => {
  return (
    <div>
        <UploadMusic user={user} users={users}/>
    </div>
  )
}

export default AddMusic