import { ReactNode, useState } from "react"

interface props{
    children:ReactNode
    color:String
    onClick:() =>void
    type:String
}



const Button = ({children,color,onClick}:props) => {
  return (
    <>
    <div className={"btn btn-" +color} onClick={onClick}>
      {children}
    </div>
    </>
  )
}

export default Button
