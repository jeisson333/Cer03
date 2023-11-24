import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const usePage = () => {
  const productsAll = useSelector((state) => state.products);
  const [prev, setPrev] = useState(0);
  const [next, setNext] = useState(9);
  const [count, setCount] = useState(1);
  let paginate = productsAll.slice(prev, next);
  const totPagine = Math.ceil(productsAll.length / 9);

  useEffect(() => {
    setPrev(0);
    setNext(9);
    setCount(1);
  }, [productsAll.length]);

  const changePrev = () => {
    if (count > 1) {
      if (prev - 9 < 0) {
        setPrev(0);
        setNext(9);
      } else if (prev - 9 >= 0) {
        setPrev(prev - 9);
        setNext(next - 9);
      }
      setCount(count - 1);
    }
  };
  const changeNext = () => {
    if (count < totPagine) {
      setPrev(prev + 9);
      setNext(next + 9);
      setCount(count + 1);
    }
  };
  return { changeNext, changePrev, paginate, count, totPagine };
};
export default usePage;
