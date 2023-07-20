import React, {useState} from 'react';
import axios from "axios";
import {Link,useNavigate} from "react-router-dom";
import BACKEND_URL from "../EndPoint";

export default function RegisterDevice(){
    const navigate = useNavigate();
    const [device,setDevice] = useState({
        imei:"",
        sim:"",
        iccid:"",
        create_date_time:"",
        update_date_time:"",
    });
    const {imei,sim,iccid} = device;

    const onInputChange = (e)=>{
        setDevice({...device,[e.target.name]:e.target.value});
    };
    const onSubmit = async (e)=>{
        e.preventDefault();
        await axios.post(BACKEND_URL + "api/register-device",device);
        navigate("/");
    };
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4"> Register device</h2>
                    <form onSubmit={(e)=>onSubmit(e)}>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="imei">
                                IMEI
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter The IMEI"
                                name="imei"
                                value={imei}
                                onChange={(e)=>onInputChange(e)}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="sim">
                                SIM
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter THe Phone Number"
                                name="sim"
                                value={sim}
                                onChange={(e)=>onInputChange(e)}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="iccid">
                                ICCID
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter The iccid"
                                name="iccid"
                                value={iccid}
                                onChange={(e)=>onInputChange(e)}/>
                        </div>
                        <button   type="submit" className="btn btn-outline-primary">Submit</button>
                        <Link to="/" className="btn btn-outline-danger mx-2">Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}