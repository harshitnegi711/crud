import React, { useRef, useState } from 'react'

const Upload = ({ children, state, set, enable }) => {
  const uploadRef = useRef(null)
  const [imgUrl, setImgUrl] = useState('')

  const allowed = [".jpeg", ".jpg", ".pdf"]

  const handleClick = () => {
    if (enable) {
      uploadRef?.current.click()
    }
  }


  const handleUpload = (e) => {
    set(e.target.files[0])
    const reader = new FileReader();
    reader.onload = () => {
      setImgUrl(reader.result);
    };
    reader.readAsDataURL(e.target?.files[0]);
  }

  const onDelete = () => {
    set("")
    setImgUrl("")
  }
  // *************** Ui Body **************** //


  return (
    <div>
      <div onClick={handleClick} className='cursor-pointer' style={{ width: "fit-content" }}>
        {children}
      </div>
      <input accept={allowed} type='file' onChange={handleUpload} ref={uploadRef} style={{ display: "none" }} />

    </div>
  )

}

export default Upload
