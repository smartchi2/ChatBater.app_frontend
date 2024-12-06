// import useAuthStore from "../store/useAuthStore";
// import {Eye,  EyeOff, Loader2, Lock, MessageSquare} from "lucide-react" 
// import {BookUser} from 'lucide-react'
// import { Link } from 'react-router-dom';
// import React, { useState } from 'react'
// import AuthImagePattern from '../components/AuthImagePattern' 
// import toast from 'react-hot-toast';

// const LoginPage = () => {
//  const [showPassword, setShowPassword] = useState(false);
//  const [formData, setFormData] = useState({
//    phoneNumber: "",
//    password: "",
//  });
//  const {login, isLoggingIn} = useAuthStore();

//  const validateForm = () => {
//   if(!formData.phoneNumber.trim()) return toast.error("Phone number is required")
//   if(!formData.password.trim()) return toast.error("Password is required")
//   if(!/^\+(\d{1,4})[-\s]?(\(?\d{1,3}\)?)[-\s]?(\d{1,4})[-\s]?(\d{1,4})[-\s]?(\d{1,4})$/.test(formData.phoneNumber)) return toast.error("Invalid phone number format")
//   if(formData.password.length < 4) return toast.error("Password must be at least 4 characters")   

// return true;

// };
  
//  const handleSubmit = async (e) => {
//   e.preventDefault();
//   const success = validateForm()
//   if(success === true) login(formData);
//  }
 
//  return (
//   <div className='min-h-screen  grid lg:grid-cols-2'>
//  <div className='flex flex-col  justify-center  p-20 sm:p-56'>

//  <div className='w-full max-w-md space-y-8'>
//    <div className='text-center mb-8'>
//      <div className='flex flex-col items-center gap-2 group'>
//        <div
//          className='size-12 rounded-xl bg-black/10 flex items-center justify-center
//          group-hover:bg-primary/20 transition-colors'
//        >
//          <MessageSquare className="size-6 text-primary" />
//        </div>
//        <h1 className='text-2xl font-bold mt-2'>ChatBater</h1>
//        <p className='text-base-content/60'>Login in to your account</p>
//      </div>
//    </div>

//    <form onSubmit={handleSubmit} className='space-y-6'>
//      <div className='form-control'>
//        <label className='label'>
//          <span className='label-text font-medium'>phoneNumber</span>
//        </label>
//        <div className='relative'>
//          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
//            <BookUser  className="size-5 text-base-content/40"/>
//          </div>
//          <input 
//            type="text"
//            className={`input input-bordered w-full pl-10`}
//            placeholder='+234'
//            value={formData.phoneNumber}
//            onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
//          />
//        </div>
//      </div>

//      <div className='form-control'>
//        <label className='label'>
//          <span className='label-text font-medium'>Password</span>
//        </label>
//        <div className='relative'>
//          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
//            <Lock  className="size-5 text-base-content/40"/>
//          </div>
//          <input 
//            type={showPassword ? "text" : "password" }
//            className={`input input-bordered w-full pl-10`}
//            placeholder='*********'
//            value={formData.password}
//            onChange={(e) => setFormData({...formData, password: e.target.value})}
//          />
//          <button 
//          type='button'
//          className='absolute inset-y-0 right-0 pr-3 flex items-center'
//          onClick={() => setShowPassword(!showPassword)}
//          >
//            {showPassword ? (
//              <EyeOff className='size-5 text-base-content/40'/>
//            ) : (
//              <Eye className='size-5 text-base-content/40' />
//            )}
//          </button>
//        </div>
//      </div>

//      <button type='submit' className='btn btn-primary w-full' disabled={isLoggingIn}>
//        {isLoggingIn ? (
//          <>
//          <Loader2 className='size-5 animate-spin'/>
//          SigningIn....
//          </>
//        ): (
//          "Sign in"
//        )}
//      </button>
//    </form>

//    <div className='text-center'>
//      <p className='text-base-content/60'>
//       Don&apos;t have an account? {""}
//       <Link to="/signup" className='link link-primary'>
//       Sign up
//       </Link>

//      </p>
//    </div>
//  </div>
//  </div>

//  <AuthImagePattern
//    title="Welcome back"
//    subtitle="Sign in to continue your chat and catch up with your messages"
//  />
//  </div>

// )
// }





// export default LoginPage


import useAuthStore from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import Select from "react-select";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

// Country data for dropdown
const countries = [
  { name: "United States", code: "+1", flag: "🇺🇸" },
  { name: "United Kingdom", code: "+44", flag: "🇬🇧" },
  { name: "India", code: "+91", flag: "🇮🇳" },
  { name: "Canada", code: "+1", flag: "🇨🇦" },
  { name: "Australia", code: "+61", flag: "🇦🇺" },
  { name: "Nigeria", code: "+234", flag: "🇳🇬" },
];

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });
  const [country, setCountry] = useState(countries[5]); // Default to Nigeria
  const { login, isLoggingIn } = useAuthStore();

  const validateForm = () => {
    if (!formData.phoneNumber.trim()) return toast.error("Phone number is required");
    if (!formData.password.trim()) return toast.error("Password is required");
    if (formData.password.length < 4)
      return toast.error("Password must be at least 4 characters");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) login({ ...formData, phoneNumber: `${country.code}${formData.phoneNumber}` });
  };

  // Custom options for react-select
  const countryOptions = countries.map((country) => ({
    value: country.code,
    label: (
      <div className="flex items-center gap-2">
        <span>{country.flag}</span> {/* Emoji Flag */}
        <span>{`${country.name} (${country.code})`}</span>
      </div>
    ),
  }));

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center p-20 sm:p-56">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-black/10 flex items-center justify-center
                group-hover:bg-primary/20 transition-colors"
              >
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">ChatBater</h1>
              <p className="text-base-content/60">Login to your account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Country Dropdown and Phone Number */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Phone Number</span>
              </label>
              <div className="relative flex items-center gap-2">
                {/* Custom Country Dropdown */}
                <Select
                  options={countryOptions}
                  value={countryOptions.find((opt) => opt.value === country.code)}
                  onChange={(selectedOption) =>
                    setCountry(countries.find((c) => c.code === selectedOption.value))
                  }
                  className="w-1/2"
                  isSearchable
                />

                {/* Phone Number Input */}
                <input
                  type="text"
                  className="input input-bordered flex-1 pl-4"
                  placeholder="Enter your phone number"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="*********"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="link link-primary">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      <AuthImagePattern
        title="Welcome back"
        subtitle="Sign in to continue your chat and catch up with your messages"
      />
    </div>
  );
};

export default LoginPage;

