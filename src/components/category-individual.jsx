import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Category_Individual() {
  const Category = useParams();
  const [productsData, setProductsData] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const FetchData = async () => {
      try {
        const responses = await axios.get(
          `https://luggie-bone-backend.vercel.app/api/categories/${Category}`
        );
        setProductsData(responses.data);
      } catch (error) {
        console.error("Error Fetchinf Data", error);
      } finally {
        setloading(false);
      }
    };
    FetchData();
  }, [Category]);

  if(loading){
    <span>Loading ....</span>
  }
  if(error){
    <span> Some Error Occured</span>
  }

  return(
    <>
    </>
  )
}
