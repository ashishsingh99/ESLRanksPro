import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { DB_RANK_DATA, PROJECT_GET } from "../services/constants";
import { useRef } from "react";
const GetRanks = () => {
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
  const filPeNameUrl = useRef([])
  const projectKeywordLength = useRef([])
  const userEmailBasedTotalPushedData = useRef([])


  if (deviceType === null) {
    localStorage.setItem("devicetype", "desktop");
        // window.location.reload(false)
  }



  useEffect(() => {



    // // isproject set false because its default value always have to false;
    // localStorage.setItem("IsProject", false);
    // // console.log('No Project added')

    // All project Data Start ...........................
    axios.get(DB_RANK_DATA()).then((res) => {
      const UserAllProjects = res.data.data;
      // save all total keyword result by device type
      UserAllProjects && UserAllProjects.map((res) => {
        return res.datasave && res.datasave.map((datasave) => {
          return datasave.data.tasks && datasave.data.tasks.filter(task => {
            if (task.data.device === deviceType) {
              return (task.result && task.result.map((result) => {
                ALLPROJECTDATA.current.push(result);
                // console.log('  ALLPROJECTDATA.current', ALLPROJECTDATA.current)
              }));
            }
          }
          );
        });
      });

      axios.get(PROJECT_GET()).then((res) => {
        const projectDatalist = res.data.data;

        // flat() is use for romove array to an array
        const projectData = projectDatalist.flat();
        // console.log('projectData', projectData)
        const ProjectDetail = projectData.filter(devtype => {
          if (devtype.deviceType === deviceType) {
            return devtype;
          }

        });

        // console.log('ProjectDetail', ProjectDetail)

        ALLPROJECTDETAILS.current = ProjectDetail;
        dispatch({ type: "ALLPROJECTDETAILS", payload: ALLPROJECTDETAILS.current});

        const filteredEmailList = ProjectDetail && ProjectDetail.filter((selectedEmail) => {
          if (selectedEmail.email === email) {
            return selectedEmail.email === email;
          }
        });
        // console.log('filteredEmailList', filteredEmailList)

        dispatch({ type: "USERALLPROJECTDETAILS", payload: filteredEmailList });

        filteredEmailList && filteredEmailList.map(prnameurl => {
          filPeNameUrl.current.push(prnameurl.weburl)
        })

        if (filPeNameUrl.current !== []) {
          const filteredPrNameUrl = Array.from(new Set(filPeNameUrl.current))
          dispatch({ type: "USERALLPROJECTNAME", payload: filteredPrNameUrl })
        }


        if (filteredEmailList.length !== 0) {
          const firstProject = filteredEmailList[filteredEmailList.length - 1].weburl;

          if (webURL === null) {
            localStorage.setItem("websiteurl", firstProject);
            window.location.reload(false);
            // console.log('websiteurldone')
          }

          ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

          // we make new filterration for keyword limitation per plan  start


          const userEmailBasedTotalData = projectData && projectData.filter((selectedEmail) => {
            if (selectedEmail.email === email) {
              return selectedEmail.email === email;

            }
          });

          // console.log('userEmailBasedTotalData', userEmailBasedTotalData)

          userEmailBasedTotalData.map(allurlName => {

            userEmailBasedTotalPushedData.current.push(allurlName.weburl)
          })

          const filtersameUrlName = Array.from(new Set(userEmailBasedTotalPushedData.current))
          // console.log('filtersameUrlName', filtersameUrlName.length)


          dispatch({ type: "USERPROJECTLENGTH", payload: filtersameUrlName.length });

          const userDataFilterByProjectUrl = userEmailBasedTotalData.filter((selectedUrl) => {
            if (selectedUrl.weburl === webURL) {
              return selectedUrl.weburl === webURL;
            }
          });

          userDataFilterByProjectUrl && userDataFilterByProjectUrl.map((detail) => {
            return detail.keyword && detail.keyword.map((onlyKeyword) => {
              // console.log('userDataFilterByProjectUrlonlyKeyword', onlyKeyword)
              // setProjectKeywordLength((resw) => [...resw, onlyKeyword])
              projectKeywordLength.current.push(onlyKeyword)

              dispatch({ type: "USERKEYWORDLENGTH", payload: projectKeywordLength.current.length });
            })
          })




          // we make new filterration for keyword limitation per plan  end
          ////////////////////////////////////////////////////////////////////////////////////////////////////////




          const filteredUrlBasedData = filteredEmailList.filter((selectedUrl) => {
            if (selectedUrl.weburl === webURL) {
              return selectedUrl.weburl === webURL;
            }
          });

          if (filteredUrlBasedData.length !== 0) {
            localStorage.setItem("IsProject", true);
          }
          else {
            localStorage.setItem("IsProject", false);

          }



          filteredUrlBasedData && filteredUrlBasedData.map((detail) => {
            return (detail.keyword && detail.keyword.filter((onlyKeyword) => {
              return (ALLPROJECTDATA.current && ALLPROJECTDATA.current.map((rankKeyword) => {
                if (onlyKeyword === rankKeyword.keyword) {
                  USERALLKEYWORDRESULT.current.push(rankKeyword);
                  // console.log('USERALLKEYWORDRESULT.current', USERALLKEYWORDRESULT.current)
                } else {
                  USERALLPENDINGRESULT.current.push(onlyKeyword);
                  // console.log('USERALLPENDINGRESULT.current', USERALLPENDINGRESULT.current)
                }
              })
              );
            })
            );
          });

          dispatch({ type: "USERALLKEYWORDRESULT", payload: USERALLKEYWORDRESULT.current });

          const RemoveSimilarResult = Array.from(new Set(USERALLPENDINGRESULT.current));
          // console.log('RemoveSimilarResult', RemoveSimilarResult)
          const RemoveResultKeyword = RemoveSimilarResult.filter((id1) => !USERALLKEYWORDRESULT.current.some((o2) => o2.keyword === id1));
          // console.log('RemoveResultKeyword', RemoveResultKeyword)
          dispatch({ type: "USERALLPENDINGRESULT", payload: RemoveResultKeyword });

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

            // if (KEYWORDDATA.current !== []) {
            dispatch({ type: "CHARTRANKING", payload: CHARTRANKING.current });

            dispatch({ type: "KEYWORDDATA", payload: KEYWORDDATA.current });
            // }

          });

        }
        else {
          localStorage.setItem("IsProject", false);

        }


      })

    })
    dispatch({ type: "ALLPROJECTDATA", payload: ALLPROJECTDATA.current });
    // All project Data end
  }, [deviceType]);



};

export default GetRanks;
