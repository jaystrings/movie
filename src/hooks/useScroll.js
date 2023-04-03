import { useRef } from "react";

const useScroll = () => {
  const scrollRef = useRef();
  const scrollRefB = useRef()
  const scrollRefC = useRef()
  const scroll = (direction) => {
    const {current} = scrollRef
    direction === 'left' ? (current.scrollLeft -= 500) : (current.scrollLeft += 500)
  }
  const scrollB = (direction) => {
    const {current} = scrollRefB
    direction === 'left' ? (current.scrollLeft -= 500) : (current.scrollLeft += 500)
  }
  const scrollC = (direction) => {
    const {current} = scrollRefC
    direction === 'left' ? (current.scrollLeft -= 500) : (current.scrollLeft += 500)
  }

  return {scrollRef, scroll,scrollRefB, scrollB,scrollC,scrollRefC}
};

export default useScroll;