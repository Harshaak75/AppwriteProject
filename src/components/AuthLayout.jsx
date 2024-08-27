import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
// Ths is used to navigate the pages, based on the current status

function Protected({ children, authentication = true }) {

  const authstatus = useSelector((state) => state.auth.status)

  const navigate = useNavigate()

  const [loader, setloader] = useState(true);

  useEffect(() => {
    if (authentication && authstatus !== authentication) {
      navigate("/login");
    }
    else if (!authentication && authstatus !== authentication) {
      navigate("/");
    }
    setloader(false)
  }, [authentication, authstatus, navigate])


  return loader ? null : <>{children}</>
}

export default Protected