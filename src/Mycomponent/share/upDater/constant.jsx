import axios from "axios";
import { delete_Project } from "../../../services/constants";

export const Do_Project_Delete = function (allprojectDetails) {
    // const allprojectDetails = useSelector(state => state.allprojectdetails);

    // localStorage data
    const webURL = localStorage.getItem("websiteurl");
    const email = localStorage.getItem("email");

    return allprojectDetails && allprojectDetails.map((res) => {
        res && res.filter((resfilter) => {
            if (resfilter.email === email && resfilter.weburl === webURL) {
                // console.log('res', res)
                const obj = res;
                const myJson = JSON.stringify(obj)
                console.log('myJson', myJson)
                axios.delete('https://eslrankspro.com/api/user/deleteproject/' + myJson + '/')

            }

        })
    })
}

export const curday = function (sp) {
    const today = new Date();
    var dd = today.getDate();
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    var mm = today.getMonth() + 1; //As January is 0.
    var yyyy = today.getFullYear();
    if (dd < 10) dd = '0' + dd;
    return (monthNames[today.getMonth()] + ' ' + dd + ' , ' + yyyy);
};

export const perday = function (sp) {
    const today = new Date();
    var dd = today.getDate();
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var yyyy = today.getFullYear();

    if (dd < 10) dd = '0' + dd;
    return (monthNames[today.getMonth() + 1] + ' ' + dd + ' , ' + yyyy);
};

export const Logout = () => {
    localStorage.clear();
    window.location.href = '/'
    // window.location.reload(false);
};


