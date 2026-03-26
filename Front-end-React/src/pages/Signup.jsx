import { useRef } from "react";
import { useDispatch } from "react-redux";
import {ToastContainer,toast} from 'react-toastify'
import { signupUser } from "../store/userStore";
import {useNavigate} from 'react-router-dom'



const Signup=()=>{
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const userNameRef=useRef()
  const emailRef=useRef()
  const passwordRef=useRef()

  const handleSubmit=async()=>{
    const userName=userNameRef.current.value
    const email=emailRef.current.value
    const password=passwordRef.current.value
    const res=await dispatch(signupUser({userName,email,password}))
    if(res.payload.success===true){
      navigate('/verify-user')
    }
  }

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000}/>
      <div className="card-body p-md-5">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
            <p className="text-center text-body h1 fw-bold mb-5 mt-4">
              Sign up
            </p>
            <form>
              <div className="d-flex flex-row align-items-center mb-4">
                <i className="fas text-body fa-user fa-lg me-3 fa-fw"></i>
                <div
                  data-mdb-input-init=""
                  className="form-outline flex-fill mb-0"
                  data-mdb-input-initialized="true"
                >
                  <input
                    type="text"
                    ref={userNameRef}
                    className="form-control"
                  />
                  <label className="form-label" style={{ marginLeft: "0px" }}>
                    User Name
                  </label>
                  <div className="form-notch">
                    <div
                      className="form-notch-leading"
                      style={{ width: "9px" }}
                    ></div>
                    <div
                      className="form-notch-middle"
                      style={{ width: "71.2px" }}
                    ></div>
                    <div className="form-notch-trailing"></div>
                  </div>
                </div>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <i className="fas text-body fa-envelope fa-lg me-3 fa-fw"></i>
                <div
                  data-mdb-input-init=""
                  className="form-outline flex-fill mb-0"
                  data-mdb-input-initialized="true"
                >
                  <input
                    type="email"
                    ref={emailRef}
                    className="form-control"
                  />
                  <label className="form-label" style={{ marginLeft: "0px" }}>
                    Your Email
                  </label>
                  <div className="form-notch">
                    <div
                      className="form-notch-leading"
                      style={{ width: "9px" }}
                    ></div>
                    <div
                      className="form-notch-middle"
                      style={{ width: "68.8px" }}
                    ></div>
                    <div className="form-notch-trailing"></div>
                  </div>
                </div>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <i className="fas text-body fa-lock fa-lg me-3 fa-fw"></i>
                <div
                  data-mdb-input-init=""
                  className="form-outline flex-fill mb-0"
                  data-mdb-input-initialized="true"
                >
                  <input
                    type="password"
                    ref={passwordRef}
                    className="form-control"
                  />
                  <label className="form-label" style={{ marginLeft: "0px" }}>
                    Password
                  </label>
                  <div className="form-notch">
                    <div
                      className="form-notch-leading"
                      style={{ width: "9px" }}
                    ></div>
                    <div
                      className="form-notch-middle"
                      style={{ width: "64.8px" }}
                    ></div>
                    <div className="form-notch-trailing"></div>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                <button 
                onClick={handleSubmit}
                  type="button"
                  data-mdb-button-init=""
                  data-mdb-ripple-init=""
                  className="btn btn-primary btn-lg"
                  data-mdb-button-initialized="true"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
              className="img-fluid"
              alt="Sample image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup