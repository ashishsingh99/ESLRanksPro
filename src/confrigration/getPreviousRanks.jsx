import axios from "axios";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { OLD_RANK_DATA, PROJECT_GET } from "../services/constants";

const GetPreviousRanks = () => {
    // redux dispatecher
    const dispatch = useDispatch();

    // localStorage data
    const deviceType = localStorage.getItem("devicetype");
    const webURL = localStorage.getItem("websiteurl");
    const email = localStorage.getItem("email");

    // useState data
    // devicetypeFiltered DataBase Data
    const ALLPROJECTDATA = useRef([]);
    const ALLPROJECTDETAILS = useRef([]);
    const USERALLKEYWORDRESULT = useRef([]);
    const USERALLPENDINGRESULT = useRef([]);
    const CHARTRANKING = useRef([]);
    const KEYWORDDATA = useRef([]);

    useEffect(() => {
        // All old project Data Start
        axios.get(OLD_RANK_DATA()).then((res) => {

            const AllPreviousData = res.data.data;
            dispatch({ type: "PREVIOUSALLOLDDATA", payload: AllPreviousData });

            const PreviousUserAllProjects = [res.data.data[res.data.data.length - 1]];
            // const PreviousUserAllProjects = res.data.data;


            // save all total keyword result by device type
            PreviousUserAllProjects && PreviousUserAllProjects.map((res) => {
                return res.datasave && res.datasave.map((datasave) => {
                    return datasave.data.tasks && datasave.data.tasks.filter((task) => {
                        if (task.data.device === deviceType) {
                            return (task.result && task.result.map((result) => {
                                // console.log('  ALLPROJECTDATA.current', ALLPROJECTDATA.current)
                                return ALLPROJECTDATA.current.push(result);
                            })
                            );
                        }
                    });
                });
            });


            axios.get(PROJECT_GET()).then((res) => {
                const projectDatalist = res.data.data;

                // flat() is use for romove array to an array
                const projectData = projectDatalist.flat();
                // console.log('projectData', projectData)

                const ProjectDetail = projectData.filter((type) => {
                    if (type.deviceType === deviceType) {
                        return type;
                    }
                });

                ALLPROJECTDETAILS.current = ProjectDetail;

                // dispatch({
                //     type: "ALLPROJECTDETAILS",
                //     payload: ALLPROJECTDETAILS.current,
                // });

                const filteredEmailList = ProjectDetail && ProjectDetail.filter((selectedEmail) => {
                    if (selectedEmail.email === email) {
                        return selectedEmail.email === email;
                    }
                });


                const filteredUrlBasedData = filteredEmailList.filter((selectedUrl) => {
                    if (selectedUrl.weburl === webURL) {
                        return selectedUrl.weburl === webURL;
                    }
                });

                filteredUrlBasedData && filteredUrlBasedData.map((detail) => {
                    return (detail.keyword && detail.keyword.filter((onlyKeyword) => {
                        return (ALLPROJECTDATA.current && ALLPROJECTDATA.current.map((rankKeyword) => {

                            if (onlyKeyword === rankKeyword.keyword) {
                                return USERALLKEYWORDRESULT.current.push(rankKeyword);

                            } else {
                                USERALLPENDINGRESULT.current.push(onlyKeyword);
                                // console.log('USERALLPENDINGRESULT.current', USERALLPENDINGRESULT.current)
                                const RemoveSimilarResult = Array.from(new Set(USERALLPENDINGRESULT.current));
                                const RemoveResultKeyword = RemoveSimilarResult.filter((o1) =>
                                    !USERALLKEYWORDRESULT.current.lastIndexOf((o2) => o1 === o2.keyword
                                    ));

                            }
                        })
                        );
                    })
                    );
                });

                USERALLKEYWORDRESULT.current.map((rankdata) => {
                    // PUSHING THE ANOTHER ITEM THAT HELP TO RENDER UNRANKED VALUE SHOW IN RESPONSE ITEMS
                    const PushItems = rankdata.items.concat({
                        type: "organic",
                        rank_group: "no rank",
                        url: "not data found",
                        domain: "not",
                    });

                    // HERE WE FILTIRING THE ORGANIC ITEMS WITH PUSHED ITEM LIST
                    const TypeOrganic = PushItems.filter((obj) => {
                        if (obj.type === "organic") {
                            return obj;
                        }
                    });

                    // HERE WE FILTERING ONLY RANKS(LIKE ONLY NUMBER RANK) DATA WITH TYPEORGANIC DATA
                    const chartRanking = TypeOrganic.filter((obj) => {
                        if (obj.domain === webURL) {
                            return obj.domain === webURL;
                        } else if (obj.domain === "www." + webURL) {
                            return obj.domain === "www." + webURL;
                        }
                    });

                    // SET CHARTRANKING DATA IN A STATE FOR GETHRING TOGETHER ALL FILTERED DATA ONE BY ONE IN STATE
                    CHARTRANKING.current.push(chartRanking);
                    // console.log('  CHARTRANKING.current', CHARTRANKING.current)

                    // HERE WE FILTERING ALL URL OR PROJECT NAME BASED KEYWORD DATA WITH ORGANIC DATA
                    const filteredUrlData = TypeOrganic.filter((obj) => {
                        if (obj.domain === webURL) {
                            return obj.domain === webURL;
                        } else if (obj.domain === "www." + webURL) {
                            return obj.domain === "www." + webURL;
                        }
                        // THIS GIVES OUTPUT OFF UNRANKED RANKGROUP VALUE DATA
                        else {
                            return obj.domain === "not";
                        }
                    });

                    // SETTING IN A STATE (ALL-FIRST) filteredUrlData VALUE FOR GETHRING TOGETHER IN ARRAY
                    KEYWORDDATA.current.push(filteredUrlData[0]);


                });
                // if (KEYWORDDATA.current !== []) {
                dispatch({ type: "OLDKEYWORDDATA", payload: KEYWORDDATA.current });

                // }


            });

        });


        // All old project Data end
    }, []);




};

export default GetPreviousRanks;
