import React from "react";
import MetaData from "./layout/MetaData";
import { useGetProductsQuery } from "../redux/api/ProductsApi";
import ProductItem from "./product/ProductItem";

const Home = () => {

const {data , isLoading  , isError , isFetching , isSuccess} =  useGetProductsQuery()
console.log(data)
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
