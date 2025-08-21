import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ShoppingCart,
  CreditCard,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Star,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartCountSlice";
import { toast } from "react-toastify";
import { BASE_URL } from "../utils/constants";
import { div } from "framer-motion/client";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [review, setReview] = useState([]);
  const [orders,setOrders]=useState([])
  const [reviewBtn,setReviewBtn]=useState(false)
  const [openReview,setOpenReview]=useState(false)
 const [ratingg, setRatingg] = useState(1);
 const [reviewMsg,setReviewMsg]=useState('')



  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItem = async () => {
    try {
      await axios.post(
        BASE_URL + "addToCart/" + id,
        { quantity },
        { withCredentials: true }
      );

      dispatch(addItem({ ...product, count: quantity }));

      toast.success(`${quantity} item(s) added to cart!`, {
        position: "bottom-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error adding item to cart:", error);
      dispatch(addItem({ ...product, count: quantity }));
      toast.error(
        "Failed to sync with server, but item added to cart locally",
        {
          position: "bottom-right",
          autoClose: 3000,
        }
      );
    }
  };

  const productDetails = async (productId) => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(`${BASE_URL}product/${productId}`, {
        withCredentials: true,
      });

      setProduct(res.data.data);
    } catch (err) {
      console.error("Error fetching product details:", err);
      setError("Failed to load product details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOrder = () => {
    navigate("/orders", {
      state: {
        cartItem: [{ ...product, count: quantity }],
      },
    });
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(
      isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      {
        position: "bottom-right",
        autoClose: 2000,
      }
    );
  };

  const reviews = async (productId) => {
    try {
      const res = await axios.get(BASE_URL + "getReviews/" + productId, {
        withCredentials: true,
      });
      setReview(res.data.data);
    } catch (err) {
      console.log(err.message);
    }
  };

    const orderss = async () => {
    try {
      const res = await axios.get(BASE_URL + "orderList", { withCredentials: true });
      setOrders(res.data.data)
      
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };
useEffect(()=>{
  orderss()
},[])

  useEffect(() => {
    if (id) {
      productDetails(id);
      reviews(id);
    }
  }, [id]);
  // console.log(productId);


 useEffect(() => {
    if (orders.length > 0 && id) {
      const isReviewable = orders.some((order) =>
        order.orderStatus === "delivered" &&
        order.cartItems?.some((item) => item.productId.toString() === id.toString())
      );
      setReviewBtn(isReviewable);
    }
  }, [orders, id]);


const handleReview = async () => {
  const finalRating = ratingg || 1;

  try {
    const res = await axios.post(
      BASE_URL + "addReview",
      { productId: id, reviewMessage: reviewMsg, rating: finalRating },
      { withCredentials: true }
    );

    // update local review state instantly
    if (res.data?.review) {
      setReview((prev) => [res.data.review, ...prev]);  // new on top
    } else {
      setReview((prev) => [
        {
          productId: id,
          reviewMessage: reviewMsg,
          rating: finalRating,
          firstName: "You",
          createdAt: new Date(),
        },
        ...prev,
      ]);
    }

    setReviewMsg("");
    setRatingg(1);
    setOpenReview(false);
  } catch (err) {
    console.error("Error adding review:", err);
  }
};




  // Loading state with modern skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="animate-pulse p-8">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Image skeleton */}
                <div className="space-y-4">
                  <div className="aspect-square bg-gray-200 rounded-xl"></div>
                  <div className="flex gap-2">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="w-16 h-16 bg-gray-200 rounded-lg"
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Details skeleton */}
                <div className="space-y-6">
                  <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                  <div className="h-10 bg-gray-200 rounded w-1/3"></div>
                  <div className="flex gap-4">
                    <div className="h-12 bg-gray-200 rounded-lg flex-1"></div>
                    <div className="h-12 bg-gray-200 rounded-lg flex-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-red-500 text-3xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => productDetails(id)}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-gray-400 text-3xl">📦</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const images = product.images || [product.image];
  const rating = product.rating || 0;
  const reviewCount = product.reviewCount || 0;

  return (
    <div className=" min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <button
            onClick={() => navigate("/")}
            className="hover:text-blue-600 transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-gray-900">{product.title}</span>
        </nav>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-12 p-8 lg:p-12">
            {/* Image Section */}
            <div className="space-y-4">
              <div className="relative group">
                <div className="aspect-square overflow-hidden rounded-xl bg-gray-50 border-2 border-gray-100">
                  <img
                    src={images[selectedImage]}
                    alt={product.title}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = "/api/placeholder/400/400";
                    }}
                  />
                </div>

                {/* Image indicators */}
                {images.length > 1 && (
                  <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                          selectedImage === index
                            ? "border-blue-500 ring-2 ring-blue-200"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${product.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Product Details Section */}
            <div className="space-y-8">
              <div>
                <div className="flex items-start justify-between mb-2">
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight pr-4">
                    {product.title}
                  </h1>
                  <button
                    onClick={toggleWishlist}
                    className={`p-2 rounded-full transition-all duration-200 ${
                      isWishlisted
                        ? "bg-red-100 text-red-600 hover:bg-red-200"
                        : "bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-red-500"
                    }`}
                  >
                    <Heart
                      className={`w-6 h-6 ${
                        isWishlisted ? "fill-current" : ""
                      }`}
                    />
                  </button>
                </div>

                {product.brand && (
                  <p className="text-blue-600 font-medium text-lg mb-2">
                    {product.brand}
                  </p>
                )}

                {/* Rating */}
                {rating > 0 && (
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-700 font-medium">
                      {rating.toFixed(1)}
                    </span>
                    <span className="text-gray-500">
                      ({reviewCount} reviews)
                    </span>
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-green-600">
                  ${product.price}
                </span>
                {product.salePrice && product.salePrice !== product.price && (
                  <div className="flex items-center gap-2">
                    <span className="text-xl text-gray-500 line-through">
                      ${product.salePrice}
                    </span>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
                      Save ${(product.salePrice - product.price).toFixed(2)}
                    </span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed text-lg">
                  {product.description}
                </p>
              </div>

              {/* Product Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.category && (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 font-medium">Category:</span>
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      {product.category}
                    </span>
                  </div>
                )}

                {product.inStock !== undefined && (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 font-medium">Stock:</span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        product.inStock
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="text-gray-700 font-medium">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={cartItem}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>

                <button
                  onClick={handleOrder}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-5 h-5" />
                  Buy Now
                </button>
              </div>

              {/* Additional Actions */}
              {/* <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div> */}

              {/* Trust Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                    <Truck className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      Free Shipping
                    </div>
                    <div>On orders over $50</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      Secure Payment
                    </div>
                    <div>100% protected</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center">
                    <RotateCcw className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      Easy Returns
                    </div>
                    <div>30-day policy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-12 px-4 sm:px-6 lg:px-8">
            {/* <h2 className="text-2xl font-bold text-gray-900 mb-6">Rating & Reviews</h2> */}

            {/* If there are reviews */}
            {review.length > 0 ? (
              <div className="bg-white rounded-xl  p-6 mb-10 border border-gray-200">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Average Rating */}
                  <div className="flex flex-col items-center justify-center text-center">
                    <h3 className="text-5xl font-bold text-yellow-500">
                      {(
                        review.reduce((sum, r) => sum + r.rating, 0) /
                        review.length
                      ).toFixed(1)}
                    </h3>
                    <div className="flex items-center mt-2">
                      {[...Array(5)].map((_, i) => {
                        const avg =
                          review.reduce((sum, r) => sum + r.rating, 0) /
                          review.length;
                        return (
                          <Star
                            key={i}
                            className={`w-6 h-6 ${
                              i < Math.round(avg)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        );
                      })}
                    </div>
                    <p className="text-gray-600 mt-2">
                      {review.length} reviews
                    </p>
                  </div>

                  {/* Progress Bars */}
                  <div className="md:col-span-2 space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const count = review.filter(
                        (r) => Math.floor(r.rating) === star
                      ).length;
                      const percentage = (
                        (count / review.length) *
                        100
                      ).toFixed(0);

                      return (
                        <div key={star} className="flex items-center gap-3">
                          <span className="w-10 text-gray-700 font-medium">
                            {star} ★
                          </span>
                          <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-yellow-400 rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="w-12 text-right text-gray-600 text-sm">
                            {count}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-600">           
              </p>
            )}
          </div>
        </div>
      </div>
      {/* Review Summary */}

      {/* Reviews Section */}
      <div className="max-w-7xl mx-auto mt-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Customer Reviews
        </h2>

      
     {reviewBtn &&   <button className="bg-green-600 text-white px-6 m-2 p-2 font-semibold rounded-md hover:bg-green-800 hover:scale-105 transition-all" onClick={()=>setOpenReview(true)}>Add review</button>}
      
        </div>

        {review.length === 0 ? (
         <p className="text-gray-600">
    No reviews yet.{" "}
    {reviewBtn && <span className="text-blue-600 font-semibold">Be the first to review!</span>}
  </p>
        ) : (
          <div className="space-y-4">
            {review.map((rev, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all flex justify-between"
              >
                {/* Header with Avatar + Name + Rating */}
                <div className="flex flex-col  mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => {
                      const filled = i < Math.floor(rev.rating);
                      const half = rev.rating - i >= 0.5 && rev.rating - i < 1;

                      return (
                        <span key={i} className="relative w-5 h-5">
                          {filled ? (
                            <Star className="w-5 h-5 text-yellow-400 fill-current" />
                          ) : half ? (
                            <Star
                              className="w-5 h-5 text-yellow-400 absolute left-0 top-0 overflow-hidden"
                              style={{ clipPath: "inset(0 50% 0 0)" }}
                            />
                          ) : (
                            <Star className="w-5 h-5 text-gray-300" />
                          )}
                        </span>
                      );
                    })}
                    {/* <span className="ml-2 text-gray-700 font-medium">
                      {rev.rating.toFixed(1)}/5
                    </span> */}
                  </div>

                  
                  <div className="flex items-center gap-3 mt-5">
                    {/* Avatar Initial */}
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center font-semibold text-blue-600">
                      {rev.firstName ? rev.firstName[0].toUpperCase() : "U"}
                    </div>

                    <div>
                      <p className="font-semibold text-gray-800">
                        {rev.firstName || "Anonymous"}
                      </p>
                      <p className="text-sm text-gray-500">Verified Buyer</p>
                    </div>
                  </div>
               <p className="text-gray-700 leading-relaxed mt-4">
                  {rev.reviewMessage}
                </p>
                  {/* Rating */}
                </div>

                {/* Review Message */}
              

                {/* Footer - likes */}
                <div className="flex items-center justify-end mt-4 gap-4">
                  <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition-colors">
                    👍🏻 {rev.likesCount || 0}
                  </button>
                   <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition-colors">
                    👎🏻 {rev.dislikesCount || 0}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

{openReview && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 ">
    <div className="bg-white/90 rounded-3xl shadow-2xl p-8 w-full max-w-md transform transition-all scale-95 hover:scale-100">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Share Your Review
      </h2>

      {/* Textarea */}
      <textarea
        value={reviewMsg}
        onChange={(e) => setReviewMsg(e.target.value)}
        className="w-full border border-gray-300 rounded-xl p-4 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none shadow-sm"
        placeholder="Write your thoughts about this product..."
        rows="4"
      />

      {/* Star Rating */}
      <div className="flex justify-center mb-6 space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-10 h-10 cursor-pointer transition-transform ${
              ratingg >= star
                ? "text-yellow-400 fill-yellow-400 scale-110"
                : "text-gray-300 hover:text-yellow-300"
            }`}
            onClick={() => setRatingg(star)}
          />
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          className="w-1/2 py-3 rounded-xl bg-gray-300 text-gray-800 font-medium shadow hover:bg-gray-400 transition"
          onClick={() => setOpenReview(false)}
        >
          Cancel
        </button>
        <button
          className="w-1/2 py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold shadow-lg hover:from-green-600 hover:to-green-800 transition"
          onClick={handleReview}
        >
          Submit
        </button>
      </div>
    </div>
  </div>
)}



    </div>
  );
};

export default ProductDetails;
