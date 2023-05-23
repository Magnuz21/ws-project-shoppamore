import { StoreProduct, UserInfo } from "@/type";
import { createSlice} from "@reduxjs/toolkit";

interface ShoppamoreState{
    productData:StoreProduct[];
    userInfo: null | UserInfo;

}

const initialState: ShoppamoreState = {
    productData: [],
    userInfo: null,
};
export const shoppamoreslice = createSlice({
    name: "shoppamore",
    initialState,
    reducers:{
        addToCart:(state,action) => {
            const item = state.productData.find((item:StoreProduct)=>item._id ===action.payload._id);
            if(item){
                item.quantity += action.payload.quantity
            }else{
                state.productData.push(action.payload);
            }
         

        },
        plusQuantity: (state, action)=>{
            const item = state.productData.find((item:StoreProduct) => item._id === action.payload._id);
            if(item){
                item.quantity++;
        }
        },
        minusQuantity: (state, action)=>{
            const item = state.productData.find((item:StoreProduct) => item._id === action.payload._id);
            if(item?.quantity ===1){
                item.quantity =1;
            }else{
                item!.quantity--;
            }
        },
        deleteItem: (state, action)=>{
          state.productData = state.productData.filter((item)=> item._id !== action.payload);
        },
        resetCart: (state)  =>{
            state.productData =[];
        },
        addUser:(state,action)=>{
            state.userInfo = action.payload
        },
        removeUser: (state)=>{
            state.userInfo = null;
        },
    },
});
export const {addToCart, deleteItem, plusQuantity, minusQuantity, resetCart, addUser, removeUser} = shoppamoreslice.actions;
export default shoppamoreslice.reducer;