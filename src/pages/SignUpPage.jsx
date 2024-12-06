// import React, { useState } from 'react'
// import { useAuthStore } from '../store/useAuthStore.js';
// import {Eye,  EyeOff, Loader2, Lock, MessageSquare} from "lucide-react" 
// import { User } from 'lucide-react';
// import {BookUser} from 'lucide-react'
// import { Link } from 'react-router-dom';
// import AuthImagePattern from '../components/AuthImagePattern' 
// import { Mail } from 'lucide-react';

// import toast from 'react-hot-toast';


// function SignUpPage() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//   fullName: "",
//   phoneNumber: "",
//   email: "",
//   password: "",
  
//   })

//   const  {signup, isSigningUp} = useAuthStore();

//   const validateForm = () => {
//     if(!formData.fullName.trim()) return toast.error("Full name is required")
//     if(!formData.phoneNumber.trim()) return toast.error("Phone number is required")
//     if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return toast.error("Invalid email")
//     if(!formData.password.trim()) return toast.error("Password is required")
//     if(!/^\+(\d{1,4})[-\s]?(\(?\d{1,3}\)?)[-\s]?(\d{1,4})[-\s]?(\d{1,4})[-\s]?(\d{1,4})$/.test(formData.phoneNumber)) return toast.error("Invalid phone number format")
//     if(formData.password.length < 4) return toast.error("Password must be at least 4 characters")   
  
//   return true;
  
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault()

//     const success = validateForm()
//     if(success === true)signup(formData)
//   };

//   return (
//     <div className='min-h-screen  grid lg:grid-cols-2'>
//     <div className='flex flex-col  justify-center  p-20 sm:p-56'>

//     <div className='w-full max-w-md space-y-8'>
//       <div className='text-center mb-8'>
//         <div className='flex flex-col items-center gap-2 group'>
//           <div
//             className='size-12 rounded-xl bg-black/10 flex items-center justify-center
//             group-hover:bg-primary/20 transition-colors'
//           >
//             <MessageSquare className="size-6 text-primary" />
//           </div>
//           <h1 className='text-2xl font-bold mt-2'>ChatBater</h1>
//           <p className='text-base-content/60'>Get started with your free account</p>
//         </div>
//       </div>

//       <form onSubmit={handleSubmit} className='space-y-6'>
//         <div className='form-control'>
//           <label className='label'>
//             <span className='label-text font-medium'>Full Name</span>
//           </label>
//           <div className='relative'>
//             <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
//               <User className="size-5 text-base-content/40"/>
//             </div>
//             <input 
//               type="text"
//               className={`input input-bordered w-full pl-10`}
//               placeholder='Smart Chinemerem'
//               value={formData.fullName}
//               onChange={(e) => setFormData({...formData, fullName: e.target.value})}
//             />

//           </div>
//         </div>

//         <div className='form-control'>
//           <label className='label'>
//             <span className='label-text font-medium'>phoneNumber</span>
//           </label>
//           <div className='relative'>
//             <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
//               <BookUser  className="size-5 text-base-content/40"/>
//             </div>
//             <input 
//               type="text"
//               className={`input input-bordered w-full pl-10`}
//               placeholder='+234'
//               value={formData.phoneNumber}
//               onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
//             />
//           </div>
//         </div>

//         <div className='form-control'>
//           <label className='label'>
//             <span className='label-text font-medium'>email</span>
//           </label>
//           <div className='relative'>
//             <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
//               <Mail  className="size-5 text-base-content/40"/>
//             </div>
//             <input 
//               type="text"
//               className={`input input-bordered w-full pl-10`}
//               placeholder='@gmail'
//               value={formData.email}
//               onChange={(e) => setFormData({...formData, email: e.target.value})}
//             />
//           </div>
//         </div>

//         <div className='form-control'>
//           <label className='label'>
//             <span className='label-text font-medium'>Password</span>
//           </label>
//           <div className='relative'>
//             <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
//               <Lock  className="size-5 text-base-content/40"/>
//             </div>
//             <input 
//               type={showPassword ? "text" : "password" }
//               className={`input input-bordered w-full pl-10`}
//               placeholder='*********'
//               value={formData.password}
//               onChange={(e) => setFormData({...formData, password: e.target.value})}
//             />
//             <button 
//             type='button'
//             className='absolute inset-y-0 right-0 pr-3 flex items-center'
//             onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? (
//                 <EyeOff className='size-5 text-base-content/40'/>
//               ) : (
//                 <Eye className='size-5 text-base-content/40' />
//               )}
//             </button>
//           </div>
//         </div>

//         <button type='submit' className='btn btn-primary w-full' disabled={isSigningUp}>
//           { isSigningUp ? (
//             <>
//             <Loader2 className='size-5 animate-spin'/>
//             Creating....
//             </>
//           ): (
//             "Create Account"
//           )}
//         </button>
//       </form>

//       <div className='text-center'>
//         <p className='text-base-content/60'>
//          Already have an account? {""}
//          <Link to="/login" className='link link-primary'>
//          Sign in
//          </Link>

//         </p>
//       </div>
//     </div>
//     </div>

//     <AuthImagePattern
//       title="Join a great community"
//       subtitle="Connect with friends and families, share moments, and stay in touch with each others"
//     />
//     </div>

//   )
// }

// export default SignUpPage



import React, { useState } from "react";
import Select from "react-select"; // Import react-select
import { useAuthStore } from "../store/useAuthStore.js";
import { Eye, EyeOff, Loader2, Lock, MessageSquare, User, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

const countries = [
  { name: "United States", code: "+1", flag: "🇺🇸" },
  { name: "United Kingdom", code: "+44", flag: "🇬🇧" },
  { name: "India", code: "+91", flag: "🇮🇳" },
  { name: "Canada", code: "+1", flag: "🇨🇦" },
  { name: "Australia", code: "+61", flag: "🇦🇺" },
  { name: "Nigeria", code: "+234", flag: "🇳🇬" },
];

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });
  const [country, setCountry] = useState(countries[5]); // Default: Nigeria
  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    const fullPhoneNumber = `${country.code}${formData.phoneNumber}`;
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.phoneNumber.trim()) return toast.error("Phone number is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return toast.error("Invalid email");
    if (!formData.password.trim()) return toast.error("Password is required");
    if (!/^\+(\d{1,4})[-\s]?(\(?\d{1,3}\)?)[-\s]?(\d{1,4})[-\s]?(\d{1,4})[-\s]?(\d{1,4})$/.test(fullPhoneNumber)) {
      return toast.error("Invalid phone number format");
    }
    if (formData.password.length < 4) return toast.error("Password must be at least 4 characters");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success) signup({ ...formData, phoneNumber: `${country.code}${formData.phoneNumber}` });
  };

  // Render country options with flags
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
              <div className="size-12 rounded-xl bg-black/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">ChatBater</h1>
              <p className="text-base-content/60">Get started with your free account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="Smart Chinemerem"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Phone Number</span>
              </label>
              <div className="relative flex items-center gap-2">
                {/* Country Dropdown */}
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

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

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
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

            <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <AuthImagePattern
        title="Join a great community"
        subtitle="Connect with friends and family, share moments, and stay in touch"
      />
    </div>
  );
}

export default SignUpPage;
