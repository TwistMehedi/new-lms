import Stripe from "stripe";
import Buy from "../models/buyModel.js";
import Course from "../models/courseModel.js";
import Lecture from "../models/lectureModel.js";

const stripe = new Stripe();

export const purchaseCourse = async(req, res)=>{
    try {
        const userId = req.user;
        console.log("userId",userId);
        const {courseId} = req.body;
        console.log("id",courseId);
        
        const course = await Course.findById(courseId);
        if(!course){
            return res.status(404).json({
                message: "Course Not Found",
                success: false
            })
        };
        console.log("course",course);
        const coursePurchase = new Buy({
          courseId,
            userId,
            ammount:course.price,
            paymentStatus:"pending"
        });
        console.log("coursePurchase",coursePurchase);

        const session = await stripe.checkout.sessions.create({
          payment_method_types:["card"],
            line_items: [
              {
                price_data:{
                    currency:"bdt",
                    product_data:{
                        name:course.courseTitle,
                        // images:[course.courseThumbnail]
                    },
                    unit_amount: Number(course?.price) * 100
                },
                quantity:1
              }
            ],
            mode: 'payment',
            success_url: `http://localhost:5173/course-progress/${courseId}`,
            cancel_url:  `http://localhost:5173/course-details/${courseId}`,
            metadata:{
                courseId:courseId,
                userId:userId
            },
            shipping_address_collection:{
                allowed_countries:["BD"]
            }
          });

          if(!session.url){
            return res.status(400).json({message:"Creating session error",success:false})
          };

          coursePurchase.paymentId = session.id;

          await coursePurchase.save();

        res.status(201).json({
            message: "Course purchase success",
            success: true,
             session,
        });
    } catch (error) {
      console.error("Error fetching course:", error.message);
        return res.status(500).json({
          
            message:"Purchase course server error",
            success:false
        })
    }
}
 

export const stripeWebhook = async (req, res) => {
    let event;
  
    try {
      const payloadString = JSON.stringify(req.body, null, 2);
      const secret = process.env.WEBHOOK_ENDPOINT_SECRET;
  
      const header = stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret,
      });
  
      event = stripe.webhooks.constructEvent(payloadString, header, secret);
    } catch (error) {
      console.error("Webhook error:", error.message);
      return res.status(400).send(`Webhook error: ${error.message}`);
    }
  
    // Handle the checkout session completed event
    if (event.type === "checkout.session.completed") {
      console.log("check session complete is called");
  
      try {
        const session = event.data.object;
  
        const purchase = await Buy.findOne({
          paymentId: session.id,
        }).populate({ path: "courseId" });
  
        if (!purchase) {
          return res.status(404).json({ message: "Purchase not found" });
        }
  
        if (session.ammount_total) {
          purchase.ammount = session.amount_total / 100;
        }
        purchase.status = "completed";
  
        // Make all lectures visible by setting `isPreviewFree` to true
        if (purchase.courseId && purchase.courseId.lectures.length > 0) {
          await Lecture.updateMany(
            { _id: { $in: purchase.courseId.lectures } },
            { $set: { isPreviewFree: true } }
          );
        }
  
        await purchase.save();
  
        // Update user's enrolledCourses
        await User.findByIdAndUpdate(
          purchase.userId,
          { $addToSet: { enrolledCourses: purchase.courseId._id } }, // Add course ID to enrolledCourses
          { new: true }
        );
  
        // Update course to add user ID to enrolledStudents
        await Course.findByIdAndUpdate(
          purchase.courseId._id,
          { $addToSet: { enrolledStudents: purchase.userId } }, // Add user ID to enrolledStudents
          { new: true }
        );
      } catch (error) {
        console.error("Error handling event:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }
    res.status(200).send();
  };