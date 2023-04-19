import axios from "axios";
import { useDispatch } from "react-redux";
import { customer_Subscription, customer_Subs_Email, get_Plans_Details } from "../services/constants";
import { useEffect } from "react";
const GetCustomer = () => {
    const dispatch = useDispatch();
    const email = localStorage.getItem("email");

    useEffect(() => {
        axios.get(get_Plans_Details())
            .then((res) => {
                // console.log('get plkan details', res.data.data)
                const data = res.data.data
                dispatch({ type: "PLANSDETAILS", payload: data });
            })


        axios.get('https://app.eslrankspro.com/api/user/codevalidGet/')
            .then((res) => {
                // console.log('codevalidGet/', res.data)
                const referralUser = res.data.find(user => user.email === email);
                // console.log('referralUser', referralUser)
                if (referralUser) {
                    // alert('yes refer ')
                    axios.get(get_Plans_Details())
                        .then((planDetails) => {
                            // console.log('res get', planDetails.data.data)
                            const checkPlanType = planDetails.data.data.find(user => user.name === referralUser.code_name)
                            if (checkPlanType) {
                                dispatch({ type: "USERPROJECTLIMIT", payload: checkPlanType.proj_len });
                                dispatch({ type: "USERKEYWORDLIMIT", payload: checkPlanType.keyword_len });
                            }
                            else {
                                dispatch({ type: "USERPROJECTLIMIT" });
                                dispatch({ type: "USERKEYWORDLIMIT" });
                            }
                            // console.log('checkPlanType', checkPlanType)
                        })


                }
                else {
                    // alert('no reefer')
                    // debugger
                    var Customerconfig = {
                        method: 'get', maxBodyLength: Infinity, url: customer_Subs_Email(email),
                        headers: {
                            'Authorization': 'Bearer sk_test_51H2uNSGfS0Ul3rZCRn4acGLzFw7c8tjyO4yV38vgEALC65vljPbcAAwC5ZN8pz7lECljFafEURhk3P3Y2KX3e4vT00yKCfAu5Y',
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                    };
                    axios(Customerconfig)
                        .then((res) => {
                            // console.log('customerId', res.data.data)
                            if (email === 'info@esearchlogix.com') {
                                // this plan for only an admin.....
                                dispatch({ type: "USERPROJECTLIMIT", payload: 100 });
                                dispatch({ type: "USERKEYWORDLIMIT", payload: 100000 });
                            }
                            else if (res.data.data.length !== 0) {
                                const customerId = res.data.data[0].id

                                var SubscriptionConfig = {
                                    method: 'get', maxBodyLength: Infinity, url: customer_Subscription(),
                                    headers: {
                                        'Authorization': 'Bearer sk_test_51H2uNSGfS0Ul3rZCRn4acGLzFw7c8tjyO4yV38vgEALC65vljPbcAAwC5ZN8pz7lECljFafEURhk3P3Y2KX3e4vT00yKCfAu5Y',
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    },
                                    data: customerId
                                };
                                axios(SubscriptionConfig)
                                    .then((subcripData) => {
                                        const cusProductId = subcripData.data.data[0].plan.product

                                        const cusPlanStatus = subcripData.data.data[0].status
                                        localStorage.setItem("cusPlanStatus", cusPlanStatus)


                                        axios.get(get_Plans_Details())
                                            .then((res) => {
                                                // console.log('get plkan details', res.data.data)
                                                const data = res.data.data
                                                // dispatch({ type: "PLANSDETAILS", payload: data });
                                                data && data.filter((res) => {
                                                    if (res.prod_id === cusProductId) {
                                                        dispatch({ type: "USERPROJECTLIMIT", payload: res.proj_len });
                                                        dispatch({ type: "USERKEYWORDLIMIT", payload: res.keyword_len });
                                                    }
                                                    // else{
                                                    //     alert('not matched')
                                                    // }
                                                })
                                            })

                                    })
                            }
                            else {
                                // when user not subscribe to any plan
                                //than we set default states from updown.js
                                dispatch({ type: "USERPROJECTLIMIT" })
                                dispatch({ type: "USERKEYWORDLIMIT" })
                            }
                        })
                }
            })





    }, [])

}

export default GetCustomer;