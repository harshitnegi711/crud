import { cloneElement, useEffect, useState } from "react"

const Animation = ({ children, classes = { in: "", out: "" }, visible, time = 300 }) => {

  const [animationClass, setAnimationClass] = useState(visible ? classes.in : classes.out)
  const [render, setRender] = useState(visible)

  console.log("clsass----> ", animationClass)

  useEffect(() => {
    if (visible) {
      setRender(true)
      setAnimationClass(classes.in)
    } else {
      setAnimationClass(classes.out)
      const timeout = setTimeout(() => { setRender(false) }, time)
      return () => clearTimeout(timeout)
    }
  }, [visible, classes, time])

  if (!render) return null

  return cloneElement(children, { className: children.props.className + " " + animationClass, style: { ...children.props.style, animationFillMode: "forwards" } })
}

export default Animation
