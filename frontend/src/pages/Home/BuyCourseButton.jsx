import React, { useEffect } from "react";
import { useCreateCheekOutQueryMutation } from "../../features/buy/buyApi";
 
// const notify = () => toast("Login successed");
export default function BuyCourseButton({ courseId }) {
  const [createCheckoutSession,{data,isLoading,isSuccess, isError, error}] = useCreateCheekOutQueryMutation();
//   const notify = () => toast(error);
  const purchaseCourse = false;
  const purchaseCourseHandler = async () => {
    await createCheckoutSession(courseId);
  };

  useEffect(()=>{
    
    if (isSuccess && data?.session?.url) {
        window.location.href = data.session.url;
      } else if (isSuccess && !data?.session?.url) {
        console.log("Invalid response from server");
      };

    if(isError){
        console.log(error?.data?.message)
    }

  },[data,isSuccess,isError]);

  return (
    <div>
      {purchaseCourse ? (
        <button className="btn btn-neutral">Continue Course</button>
      ) : (
        <button disabled={isLoading} onClick={purchaseCourseHandler} className="btn btn-neutral">
            {isLoading?"Please wait":"Buy Course"}
    
            </button>
      )}
    </div>
  );
}
