
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import {

    emptyCart,
    phoneImg,
    ship1Img,
    ship2Img,
    ship3Img,
    warningImg,

} from "../public/assets/images";
import {TbReload} from "react-icons/tb"
import {HiMinusSmall} from "react-icons/hi2"
import {MdOutlineAdd} from "react-icons/md"
import { IoMdClose } from "react-icons/io";
import { StoreProduct } from "@/type";
import FormatPrice from "./FormatPrice";
import { deleteItem, minusQuantity, plusQuantity, resetCart } from "@/redux/shoppamoreSlice";
import { useEffect, useState } from "react";
import { checkout } from '../create-checkout-session'
const CartPage = () => {
  const dispatch = useDispatch();
  const productData = useSelector((state: any)=> state.shoppamore.productData);
  const userInfo = useSelector((state:any)=> state.shoppamore.userInfo);
  const [warningMsg, setWarningMsg] = useState(false);
 
  //Price
  const [totalOldPrice, setTotalOldPrice] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);
  const [totalAmt, setTotalAmt] = useState(0);
    useEffect(()=>{
      setWarningMsg(true);
      let oldprice = 0;
      let savings = 0;
      let amt = 0;
      productData.map((item:StoreProduct)=>{
        oldprice += item.oldPrice * item.quantity;
        savings += item.oldPrice - item.price;
        amt += item.price * item.quantity;
        return
      });
     setTotalOldPrice(oldprice);
     setTotalSavings(savings);
     setTotalAmt(amt);

    },[productData]);
    
  
  return (
  <div className="w-full py-10">
    <div className="w-full flex gap-10">
      <div className="w-2/3 flex flex-col gap-5">
      <h1 className="text-2x1 font-bold text-orange">Cart{""} <span className="text-green font-normal">
                    ({productData.length})items</span></h1>
                     {/*pic details*/}
                     <div>
                <div className="text-xl font-bold flex items-center gap-2 mb-2">
                    <Image className="w-10" src={phoneImg} alt="phoneImg"/>
                    <p>Pickup and Delivery Option</p>
                </div>
                <div className="w-full grid grid-cols-3 gap-4 text-xs">
                 <div className="full border border-zinc-400 rounded-md flex flex-col items-center justify-center gap-1 p-2">
                 <Image className="w-10" src={ship1Img} alt="shippingImg"/>
                    <p className="font-bold">Shipping</p>
                    <p>All items available</p>
                 </div>
                 <div className="full border border-zinc-400 rounded-md flex flex-col items-center justify-center gap-1 p-2">
                 <Image className="w-10" src={ship2Img} alt="shippingImg"/>
                    <p className="font-bold">Pickup</p>
                    <p>All items available</p>
                 </div>
                 <div className="full border border-zinc-400 rounded-md flex flex-col items-center justify-center gap-1 p-2">
                 <Image className="w-10" src={ship3Img} alt="shippingImg"/>
                    <p className="font-bold">Delivery</p>
                    <p>All items available</p>
                 </div>
                </div>
                {/*cart product*/}
                <div className="w-full p-5 border-[1px] border-zinc-400 rounded-md flex flex-col gap-4">
                    <p>Sold and Ship by{""} <span className="text-orange font-semibold">Shoppamore.com</span></p>
                 <div className="flex gap-2">
                       <button className="px-2 py-[1px] text-[#004f9a] text-sm border-[1px] border-[#004f9a] rounded-sm">Best Seller</button>
                       <button className="px-2 py-[1px] text-red-600 text-sm border-[1px] border-red-600 rounded-sm">Rollback</button>
                 </div>
                 {/*items*/}
                  <div>
                    {productData.map((item: StoreProduct)=>(
                        <div key={item._id} className="flex items-center justify-between gap-4 border-b-[1px] border-b-zinc-200 pb-4">
                         <div className="w-3/4 flex items-center gap-2">
                            <Image className="w-32" width={500}height={500} src={item.image} alt="productImg" />
                          <div>
                            <h2 className="text-base text-zinc-900">{item.title}</h2>
                            <p className="text-sm text-zinc-500">{item.description}</p>
                            <p className="text-sm text-zinc-500">price ${item.price}</p>
                            <p className="text-sm text-zinc-500 flex-items-center gap-1">
                                <span className="bg-blue rounded-full text-white text-xs w-4 flex items-center justify-center">
                                    <TbReload className="rotate-180"/></span>Free 30 days return</p>
                          <div className="mt-2 flex items-center gap-6">
                               <button onClick={()=>dispatch(deleteItem(item._id))} className="text-sm underline underline-offset-2 decoration-[1px] text-zinc-500 
                               hover:no-underline hover:text-red-500 duration-300">Remove</button>
                               <div className="w-28 h-9 border border-zinc-400 rounded-full text-base font-semibold text-orange 
                                flex items-center justify-between px-3">
                                <button onClick={()=>dispatch(minusQuantity({
                                   _id: item._id,
                                   title: item.title,
                                   description: item.description,
                                   image: item.image,
                                   price: item.price,
                                   oldPrice: item.oldPrice,
                                   quantity: 1,
                                   brand: item.brand,
                                   category: item.category,
                                  
                                }))} className="text-base w-5 h-5 text-zinc-600 hover:bg-[#74767c] hover:text-white rounded-full 
                                flex items-center justify-center cursor-pointer duration-200"><HiMinusSmall/></button>
                                <span>{item.quantity}</span>
                                <button onClick={()=>dispatch(plusQuantity({
                                   _id: item._id,
                                   title: item.title,
                                   description: item.description,
                                   image: item.image,
                                   price: item.price,
                                   oldPrice: item.oldPrice,
                                   quantity: 1,
                                   brand: item.brand,
                                   category: item.category,
                                  
                                }))} className="text-lg w-5 h-5 text-zinc-600 hover:bg-[#74767c] hover:text-white rounded-full 
                                flex items-center justify-center cursor-pointer duration-200"><MdOutlineAdd/></button>
                            </div>
                          </div>      
                          </div>
                         </div>
                         <div className="w-1/4 text-right flex flex-col items-end gap-1">
                            <p className="font-semibold text-xl text-[#2a8703]"><FormatPrice amount={item.price * item.quantity}/></p>
                            <p className="text-sm line-through text-zinc-500"><FormatPrice amount={item.oldPrice * item.quantity}/></p>
                            <div className="flex items-center text-xs gap-2">
                              <p className="bg-green-200 text-[8px] uppercase px-2 py-[1px]">You Save</p>
                              <p className="text-[#2a8703] font-semibold"><FormatPrice amount={item.oldPrice * item.quantity - item.price * item.quantity}/></p>
                            </div>
                          </div>
                        </div>
                        
                    ))}
                  </div>
                  <button onClick={()=>dispatch(resetCart())} className="w-44 bg-red-500 text-white h-10 rounded-full text-base
                  font-semibold hover:bg-red-800 duration-300">Reset Cart</button>
                </div>
                
            </div>
      </div>
      <div className="w-1/3 p-4 mt-24 h-[500px] border-[1px] border-zinc-400 rounded-md flex flex-col justify-center gap-4">
      <div className="w-full flex flex-col gap-4 border-b-[1px] border-zinc-200 pb-4">
        {userInfo ?(
             <button onClick={(()=>{
              checkout({
                lineItems: [
                  {
                  price: "price_1NAsgiFcJo3xnQUh0KvwU5Pz",
                  quantity:1
                  },
                  {
                   price: "price_1NAsj8FcJo3xnQUhnJyGBptb",
                   quantity:1
                  },
                  {
                    price: "price_1NAsknFcJo3xnQUhrYgjmvFf",
                  quantity:1
                  },
                  {
                    price: "price_1NAsltFcJo3xnQUhKIahr5sP",
                  quantity:1
                  },
                  {
                    price: "price_1NAsn4FcJo3xnQUh6Tyry2wX",
                  quantity:1
                  },
                  {
                    price: "price_1NAsorFcJo3xnQUhaRxZF1Yl",
                  quantity:1
                  }

                ]
              })
             })} className="bg-blue hover:bg-hoverBg w-full text-white h-10 
             rounded font-semibold duration-300">Continue to Checkout</button>
        ):(
          <button className="bg-blue bg-opacity-50 cursor-not-allowed w-full text-white h-10 
          rounded font-semibold duration-300">Continue to Checkout</button>
        )}
            
                {!userInfo && (
              <p className="text-sm text-center text-red-500 -mt-4 font-semibold">Please Sign In for Checkout</p>
                )}
     {
     warningMsg && (
      <div className="bg-[#FF633C] text-white p-2 rounded-lg flex items-center justify-between gap-4">
     
       <Image className="w-8" src={warningImg} alt="warningIg"/>
      <p className="text-sm">Items in your cart have reduced prices. Check out now for extra savings! </p>
      <IoMdClose onClick={()=>setWarningMsg(false)} className="text-3x1 hover:text-red-400 cursor-pointer duration-200"/>
     </div>
    
      )}
           <p className="text-sm text-center">For the best shopping experience,{""} 
           <span className="underlne underline-offset-2 decoration-[1px]"></span>Sign In</p>
           </div>
           {/*Check Out*/}
   <div className="flex flex-col gap-1">
    <div className="text-sm flex justify-between">
      <p className="font-semibold">Subtotal<span>({productData.length}items)</span></p>
      <p className="line-through text-zinc-500 text-base"><FormatPrice amount={totalOldPrice}/></p>
    </div>
    <div className="text-sm flex justify-between">
      <p className="font-semibold">Savings</p>
      <p className=" text-[#2a8703] font-bold bg-green-100 py-1 px-[2px] rounded-lg flex"><FormatPrice amount={totalSavings}/></p>
    </div>
    <div className="text-sm flex justify-between">
      <p className="font-semibold">Total Amount</p>
      <p className="text-gold font-normal text-base"><FormatPrice amount={totalAmt}/></p>
       </div>
      </div>
      <div className="w-full flex flex-col gap-4 border-[1px] border-b-zinc-200 pb-4">
        <div className="flex flex-col gap-1">
          <div className="text-sm flex justify-between">
            <p>Shipping</p>
            <p className="text-[#2a8703]">Free</p>
          </div>
          <div className="text-sm flex justify-between">
            <p className="font-semibold">Taxes</p>
            <p className="text-orange">Calculated at checkout</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
           <p>Estimated Total</p>
           <p className="text-gold font-bold text-lg"><FormatPrice amount={totalAmt}/></p>
        </div>
      </div>
    </div>
  </div>
  );
};

export default CartPage;