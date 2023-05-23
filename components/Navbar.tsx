 import Image from "next/image";
 import {logo} from "../public/assets/images/index";
 import {IoSearchOutline} from "react-icons/io5";
 import {AiOutlineUser} from "react-icons/ai";
 import {BsCart2} from "react-icons/bs";
 import NavbarButtom from "./NavbarButtom";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import { addUser, removeUser } from "@/redux/shoppamoreSlice";
import { useRouter } from "next/router";
import {useTheme} from 'next-themes'



const Navbar = () => {
    const {theme, setTheme} = useTheme();

   const currentTheme = theme === 'system' ? setTheme : theme;

   

    const {data: session} =  useSession();
    const dispatch = useDispatch()
    const productData = useSelector((state: any) => state.shoppamore.productData);
    const userInfo = useSelector((state:any)=> state.shoppamore.userInfo);
    const [totalAmt, setTotalAmt] = useState("");
    const router = useRouter();

  
    useEffect(()=>{
        if (session){
           dispatch(addUser({
            name:session.user?.name,
            email: session.user?.email,
            image: session.user?.image,
           }));
        }else{
            dispatch(removeUser());
        }
    },[session, dispatch]);
     

    useEffect(()=>{
     let price =0;
     productData.map((item:any)=>{
        price += item.price * item.quantity
        return price
     })
     setTotalAmt(price.toFixed(2))
    },[productData]);
   
   
      
 
  return (
    <div className='w-full bg-blue text-white sticky top-0 z-50'>
        <div className="w-full h-full border-b-[1px] border-b-white">
        <div className='max-w-container mx-auto h-20 px-4 flex items-center justify-between gap-2'>
        {}
        {}
        <Link href="/">
        <div className="navBarHover">
            <Image src={logo} className="w-44" alt="logo"/>
            </div>
        </Link>

       
        {}
        {}
        <div className="navBarHover">
            <div className="w-4 grid grid-cols-2 gap-[2px]">
                <span className="w-1.5 h-1.5 border-[1px] border-white inline-flex">
                </span>
                <span className="w-1.5 h-1.5 border-[1px] border-white inline-flex">
                </span>
                <span className="w-1.5 h-1.5 border-[1px] border-white inline-flex">
                </span>
                <span className="w-1.5 h-1.5 border-[1px] border-white inline-flex">
                </span>
                
            </div>
            <p className="text-base font-semibold">Departments</p>
        </div>
        {}
        {}
        <div className="navBarHover">
            <div className="w-4 grid grid-cols-2 gap-[2px]">
                <span className="w-1.5 h-1.5 rounded-md border-[1px] border-white inline-flex">
                </span>
                <span className="w-1.5 h-1.5 rounded-md border-[1px] border-white inline-flex">
                </span>
                <span className="w-1.5 h-1.5 rounded-md border-[1px] border-white inline-flex">
                </span>
                <span className="w-1.5 h-1.5 rounded-md border-[1px] border-white inline-flex">
                </span>
                
            </div>
            <p className="text-base font-semibold">Services</p>
        </div>
        {}
        {}
      
        <div className="h-10 flex flex-1 relative" >
            <input className="h-full w-full rounded-full px-4 dark:text-white bg-yel text-base outline-none border-[1px] border-transparent focus-visible:
            border-black duration-200" type="text" 
            placeholder="Search everything at Shoppamore online and in store"/>
            <span className="absolute w-8 h-8 rounded-full flex items-center justify-center top-1 right-1 bg-orange dark:text-black text-xl">
                <IoSearchOutline/>
            </span>
        </div>
        
        {}
        {}
        <div className="navBarHover">
            <div className="flex justify-center">
            { currentTheme === 'dark' ?  (
            <button className="w-12 rounded-full p-2"
            onClick={() => setTheme('light')}
            >
              {''}  
            <Image src="/sun.svg" alt="logo" height="50" width="50"/>
            </button>
            ) : (
                
                <button className="w-12 rounded-full p-2"
                onClick={() => setTheme('dark')}
                >
                <Image src="/moon.svg" alt="logo" height="50" width="50"/>
                </button>
             )}
        </div>
        </div>
        {}
        {
            userInfo ?(
            <div onClick={() => signOut()} className="navBarHover">
            <Image
                                  width={500}
                                  height={500}
                                  className="w-10 rounded-full object-cover" src={userInfo.image} alt={"userImage"}/>
            <div>
                <p className="text-xs">Sign Out</p>
                <h2 className="text-base font-semibold -m-1">{userInfo.name}</h2>
            </div>
           </div>):(
             <div onClick={() => signIn()} className="navBarHover">
             <AiOutlineUser className="text-lg"/>
             <div>
                 <p className="text-xs">Sign In</p>
                 <h2 className="text-base font-semibold -m-1">Account</h2>
             </div>
         </div>
           )
        }

        <Link href="/cart">
        <div className="flex flex-col justify-center items-center gap-2 h-12 px-5
            rounded-full bg-transparent hover:bg-hoverBg duration-300 relative">
            <BsCart2 className="text-2x1"/>
            <p className="text-[10px] -mt-2">$ {totalAmt}</p>
            <span className="absolute w-4 h-4 bg-orange text-black top-0 right-4 rounded-full flex items-center justify-center
            font-bodyFont text-xs">
            {productData.length > 0 ? productData.length: 0}
            </span>
        </div>
        </Link>
        </div>
        </div>
        <NavbarButtom/>

    </div>
  );
};

export default Navbar;