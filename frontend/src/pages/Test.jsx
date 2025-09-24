import React from 'react'

const Test = () => {

  const names = [
    "Aarav",
    "Maya",
    "Liam",
    "Sophia",
    "Ethan",
    "Olivia",
    "Noah",
    "Isabella",
    "Lucas",
    "Amelia",
    "Arjun",
    "Zara",
    "Mason",
    "Ava",
    "Elijah",
    "Mila",
    "Kai",
    "Layla",
    "Ryan",
    "Chloe"
  ];
  return (

    <div style={{ background: "pink", height: "100vh", width: "100vw", overflow: "hidden" }}>
      {/*  ------------- top bar ---------- */}
      <div style={{ background: "red", height: "50px", width: "100%", position: "sticky", top: "0" }}>
        top bar
      </div>
      {/* ------------- main container --------- */}
      <div className='flex' style={{ background: "orange", height: "100%" }}>
        <div style={{ width: "35%", background: "purple", overflowY: 'auto' }} >
          chats div
          {names.map((_name, idx) => {
            return (<div key={idx} style={{ height: "50px", width: "100%", borderRadius: "8px", background: "brown", margin: "10px 0" }}>
              {_name}
            </div>)
          })}
        </div>
        <div style={{ width: "65%", background: "wheat", overflowY: "auto" }}>
          message div
        </div>
      </div>

    </div>
  )
}

export default Test
