import { type } from "os"

type Amount ={
    amount: Number
}

const FormatPrice = ({amount}: Amount) => {
    const formatAmount = new Number(amount).toLocaleString("en-US",{
        style:"currency",
        currency:"USD",
        minimumFractionDigits: 2,
    });
  return (
    <span>{formatAmount}</span>
  )
}

export default FormatPrice;