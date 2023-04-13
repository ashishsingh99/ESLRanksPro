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
    const current_location_code = Number(localStorage.getItem('current_location_code'));

    // useState data
    // devicetypeFiltered DataBase Data
    const ALLPROJECTDATA = useRef([]);
    const ALLPROJECTDETAILS = useRef([]);
    const USERALLKEYWORDRESULT = useRef([]);
    const USERALLPENDINGRESULT = useRef([]);
    const CHARTRANKING = useRef([]);
    const KEYWORDDATA = useRef([]);
    const AllOLDKEYWORDDATA = useRef([]);
    const ProjectData = useRef([]);

    useEffect(() => {
        // All old project Data Start
        axios.get(OLD_RANK_DATA()).then((res) => {

            const AllPreviousData = res.data.data;
            dispatch({ type: "PREVIOUSALLOLDDATA", payload: AllPreviousData });
            // const PreviousUserAllProjects = [res.data.data[res.data.data.length - 1]];
            const PreviousUserAllProjects = res.data.data;
            // console.log('PreviousUserAllProjects', PreviousUserAllProjects);




            axios.get(PROJECT_GET()).then((res) => {



                const projectDatalist = res.data.data;

                // flat() is use for romove array to an array
                projectDatalist.map((res) => {
                    ProjectData.current.push(res.keyword);
                })

                ProjectData.current = ProjectData.current.flat()
                // console.log('projectDatalist', ProjectData.current);

                const ProjectDetail = ProjectData.current.filter((type) => {
                    if (type.deviceType === deviceType) {
                        return type;
                    }
                });
                // console.log('ProjectDetail', ProjectDetail)

                // ALLPROJECTDETAILS.current = ProjectDetail;
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
                // console.log('filteredUrlBasedData_old', filteredUrlBasedData)

                // here we do project filtration by the location_code
                const country_Based_Data = filteredUrlBasedData.filter(countrybased => {
                    if (countrybased.location_code === current_location_code) {
                        return countrybased;
                    }
                })

                // console.log('country_Based_Data_old', country_Based_Data)

                PreviousUserAllProjects && PreviousUserAllProjects.map((rest, key) => {
                    ALLPROJECTDATA.current = []
                    KEYWORDDATA.current = []
                    rest.datasave && rest.datasave.map((datasave) => {
                        return datasave.data.tasks && datasave.data.tasks.filter((task) => {
                            if (task.data.device === deviceType) {
                                return (task.result && task.result.map((result) => {
                                    if (result.location_code === current_location_code) {
                                        return ALLPROJECTDATA.current.push(result);
                                    }
                                })
                                );
                            }
                        });
                    });

                    // console.log(' ALLPROJECTDATA.current', ALLPROJECTDATA.current)
                    USERALLKEYWORDRESULT.current = []

                    country_Based_Data && country_Based_Data.map((detail) => {
                        return (detail.keyword && detail.keyword.filter((onlyKeyword) => {
                            return (ALLPROJECTDATA.current && ALLPROJECTDATA.current.map((rankKeyword) => {

                                if (onlyKeyword === rankKeyword.keyword) {
                                    return USERALLKEYWORDRESULT.current.push(rankKeyword);

                                } else {
                                    USERALLPENDINGRESULT.current.push(onlyKeyword);
                                    // console.log('USERALLPENDINGRESULT.current', USERALLPENDINGRESULT.current)
                                    // const RemoveSimilarResult = Array.from(new Set(USERALLPENDINGRESULT.current));
                                    // const RemoveResultKeyword = RemoveSimilarResult.filter((o1) =>
                                    //     !USERALLKEYWORDRESULT.current.lastIndexOf((o2) => o1 === o2.keyword
                                    //     ));
                                }
                            })
                            );
                        })
                        );
                    });

                    // removing common keyword name from userAllkeyword result
                    USERALLKEYWORDRESULT.current = USERALLKEYWORDRESULT.current.filter((obj, index, self) => {
                        return index === self.findIndex((t) => (
                            t.keyword === obj.keyword && t.location_code === obj.location_code
                        ))
                    })

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
                        // console.log('  KEYWORDDATA.current', KEYWORDDATA.current)


                    });

                    if (KEYWORDDATA.current !== []) {
                        // dispatch({ type: "OLDKEYWORDDATA", payload: KEYWORDDATA.current });
                        // console.log(' KEYWORDDATA.current', KEYWORDDATA.current)
                        AllOLDKEYWORDDATA.current.push({ data: KEYWORDDATA.current, date: rest.date, month: rest.month, year: rest.year })
                    }
                });

                if (AllOLDKEYWORDDATA.current !== []) {
                    // console.log('AllOLDKEYWORDDATA.current', AllOLDKEYWORDDATA.current)
                    dispatch({ type: "ALLOLDKEYWORDDATA", payload: AllOLDKEYWORDDATA.current });
                    dispatch({ type: "OLDKEYWORDDATA", payload: AllOLDKEYWORDDATA.current[AllOLDKEYWORDDATA.current.length - 1].data });
                }

            });

        });


        // All old project Data end
    }, []);




};

export default GetPreviousRanks;
