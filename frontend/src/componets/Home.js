import React, { useEffect } from "react";
import MetaData from "./layout/MetaData";
import { useGetProductsQuery } from "../redux/api/ProductsApi";
import ProductItem from "./product/ProductItem";
import Loader from "./layout/Loader";
import toast from "react-hot-toast"

const Home = () => {

const {data , isLoading ,error , isError  } =  useGetProductsQuery()

useEffect(() => {
   if(isError){
    toast.error(error?.data?.message)
   }
},[isError])



if(isLoading) return <Loader/>

  return (
    <>
      <MetaData title={"Buy Best Product Online"} />
      <div className="row">
        <div className="col-6 col-md-12">
          <h1 id="products_heading" className="text-secondary">
            Latest Products
          </h1>

          <section id="products" className="mt-5">
            <div className="row">
              {data?.products?.map((prd , index) => (
                <ProductItem key={prd._id} prd ={prd}/>
              ))}
            
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
