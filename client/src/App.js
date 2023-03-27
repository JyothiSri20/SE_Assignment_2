import React, { useEffect, useState } from 'react'
import "./styles.css"
import Home from './home'
import Profile from './profile'
function App() {

  let component;
 
  return (
    <div><div>
      <><Profile />
        {component}
      </>
    </div>
    <div>
      <><Home />
        {component}
      </>
    </div>
    </div>
  )
}


export default App