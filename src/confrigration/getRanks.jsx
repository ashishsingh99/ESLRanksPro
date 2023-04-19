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
  // const current_location = localStorage.getItem('current_location');
  const current_location_code = Number(localStorage.getItem('current_location_code'));
  // useState data
  // devicetypeFiltered DataBase Data
  const ALLPROJECTDATA = useRef([]);
  const ALLPROJECTDETAILS = useRef([]);
  const USERALLKEYWORDRESULT = useRef([]);
  const USERALLPENDINGRESULT = useRef([]);
  const CHARTRANKING = useRef([]);
  const KEYWORDDATA = useRef([]);
  const filPeNameUrl = useRef([])
  const desktopKeywordLength = useRef([])
  const mobileKeywordLength = useRef([])
  const projectKeywordLength = useRef([])
  const userEmailBasedTotalPushedData = useRef([])
  const ProjectData = useRef([]);
  const UserSelectedPRAllId = useRef([]);
  const projectLocation = useRef([]);


  if (deviceType === null) {
    localStorage.setItem("devicetype", "desktop");
  }



  useEffect(() => {

    // All project Data Start ...........................
    axios.get(DB_RANK_DATA()).then((res) => {
      const UserAllProjects = res.data.data;
      // save all total keyword result by device type
      UserAllProjects && UserAllProjects.map((res) => {
        return res.datasave && res.datasave.map((datasave) => {
          return datasave.data.tasks && datasave.data.tasks.filter(task => {
            if (task.data.device === deviceType) {
              return (task.result && task.result.filter((result) => {
                // console.log('  ALLPROJECTDATA.current', ALLPROJECTDATA.current)
                if (result.location_code === current_location_code) {
                  // console.log('  ALLPROJECTDATA.current', ALLPROJECTDATA.current)
                  ALLPROJECTDATA.current.push(result);
                }

              }));
            }
          }
          );
        });
      });






      axios.get(PROJECT_GET()).then((res) => {
        const projectDatalist = res.data.data;
        dispatch({ type: "ALLPROJECTDETAILS", payload: projectDatalist });


        //-----------------------Start getting user current selected project id  -----------//
        projectDatalist && projectDatalist.map((res) => {
          res.keyword.filter((resfilter) => {
            if (resfilter.email === email && resfilter.weburl === webURL) {
              const projectId = Number(res.id);
              UserSelectedPRAllId.current.push(projectId)
            }
          })
        })

        dispatch({ type: "USERSELECTEDPROJECTALLID", payload: UserSelectedPRAllId.current });
        //-----------------------End get user current selected project id  -----------//



        // flat() is use for romove array to an array
        projectDatalist.map((res) => {
          ProjectData.current.push(res.keyword);
        })

        ProjectData.current = ProjectData.current.flat()
        // console.log('projectDatalist', ProjectData.current);


        //---------- Start getting user all project details by mail ----------//
        const filteredEmailList = ProjectData.current && ProjectData.current.filter((selectedEmail) => {
          if (selectedEmail.email === email) {
            return selectedEmail.email === email;
          }
        });
        dispatch({ type: "USERALLPROJECTDETAILS", payload: filteredEmailList });
        //---------- End getting user all project details by mail ----------//



        //---------- Start getting user all project name ----------//
        filteredEmailList && filteredEmailList.map(prnameurl => {
          filPeNameUrl.current.push(prnameurl.weburl)
        })

        if (filPeNameUrl.current !== []) {
          const filteredPrNameUrl = Array.from(new Set(filPeNameUrl.current))
          dispatch({ type: "USERALLPROJECTNAME", payload: filteredPrNameUrl })
        }
        //---------- End getting user all project name ----------//


        if (filteredEmailList.length !== 0) {

          // ----------Start getting first project name of user---------- //
          const firstProject = filteredEmailList[0].weburl;
          if (webURL === null) {
            localStorage.setItem("websiteurl", firstProject);
            window.location.reload(false);
            // console.log('websiteurldone')
          }
          // ----------End getting first project name of user---------- //



          // --------------------------------------------------------------------------------------//
          //---------- we make new filterration for keyword limitation per plan  start ------------//

          // --------------------------Start Getting User project length--------------------------------//
          const userEmailBasedTotalData = ProjectData.current && ProjectData.current.filter((selectedEmail) => {
            if (selectedEmail.email === email) {
              return selectedEmail.email === email;

            }
          });

          userEmailBasedTotalData.map(allurlName => {
            userEmailBasedTotalPushedData.current.push(allurlName.weburl)
          })

          const filtersameUrlName = Array.from(new Set(userEmailBasedTotalPushedData.current))
          // console.log('filtersameUrlName', filtersameUrlName.length)
          dispatch({ type: "USERPROJECTLENGTH", payload: filtersameUrlName.length });

          // --------------------------END Getting User project length--------------------------------//



          // --------------------------Start Getting project keyword length--------------------------------//

          const userDataFilterByProjectUrl = userEmailBasedTotalData.filter((selectedUrl) => {
            if (selectedUrl.weburl === webURL) {
              return selectedUrl.weburl === webURL;
            }
          });
          // console.log('userDataFilterByProjectUrl', userDataFilterByProjectUrl)

          const result = userDataFilterByProjectUrl.reduce((acc, obj) => {
            const key = obj.location_code + obj.deviceType;
            if (!acc[key]) {
              acc[key] = {
                location_code: obj.location_code,
                deviceType: obj.deviceType,
                total_keyword: 0,
                unique_keywords: new Set()
              };
            }
            obj.keyword.forEach(keyword => {
              if (!acc[key].unique_keywords.has(keyword)) {
                acc[key].total_keyword++;
                acc[key].unique_keywords.add(keyword);
              }
            });
            return acc;
          }, {});

          // console.log(result);

          let totalKeywordCount = 0;

          for (let key in result) {
            totalKeywordCount += result[key].total_keyword;
          }

          dispatch({ type: "USERKEYWORDLENGTH", payload: totalKeywordCount });

          // const filter_commonLocation_code = userDataFilterByProjectUrl.filter((obj, index, self) => {
          //   return index === self.findIndex((t) => (
          //     t.location_code === obj.location_code
          //   ))
          // })
          // console.log('filter_commonLocation_code', filter_commonLocation_code)

          // filter_commonLocation_code.map((res) =>
          //   projectLocation.current.push(res.location_code)
          // )
          // console.log('projectLocation,', projectLocation.current)

          // projectLocation.current.map((cCode) => {
          //   userDataFilterByProjectUrl.filter(type => {
          //     if (type.location_code === cCode) {
          //       if (type.deviceType === 'desktop') {
          //         if (type.keyword.length !== 0) {
          //           desktopKeywordLength.current.push(type.keyword)
          //           // console.log('type.deviceType desktop', type.keyword)
          //           desktopKeywordLength.current = desktopKeywordLength.current.flat()
          //           desktopKeywordLength.current = desktopKeywordLength.current.filter(function (item, pos) {
          //             return desktopKeywordLength.current.indexOf(item) == pos;
          //           })
          //         }
          //       }
          //       if (type.deviceType === 'mobile') {
          //         // console.log('type.deviceType mobile', type.keyword)
          //         if (type.keyword.length !== 0) {
          //           mobileKeywordLength.current.push(type.keyword)
          //           mobileKeywordLength.current = mobileKeywordLength.current.flat()
          //           mobileKeywordLength.current = mobileKeywordLength.current.filter(function (item, pos) {
          //             return mobileKeywordLength.current.indexOf(item) == pos;
          //           })
          //         }
          //       }
          //       // console.log('prRes', type)
          //     }
          //   })
          // })

          // console.log('desktopKeywordLength',desktopKeywordLength.current)
          // console.log('mobileKeywordLength',mobileKeywordLength.current)

          // getting userProject Keyword length with same same keyword filtration for desktop
          // userDataFilterByProjectUrl.filter((type) => {
          //   if (type.deviceType === 'desktop') {
          //     if (type.keyword.length !== 0) {
          //       desktopKeywordLength.current.push(type.keyword)
          //       // console.log('type.deviceType desktop', type.keyword)
          //       desktopKeywordLength.current = desktopKeywordLength.current.flat()
          //       desktopKeywordLength.current = desktopKeywordLength.current.filter(function (item, pos) {
          //         return desktopKeywordLength.current.indexOf(item) == pos;
          //       })
          //     }
          //   }
          //   if (type.deviceType === 'mobile') {
          //     // console.log('type.deviceType mobile', type.keyword)
          //     if (type.keyword.length !== 0) {
          //       mobileKeywordLength.current.push(type.keyword)
          //       mobileKeywordLength.current = mobileKeywordLength.current.flat()
          //       mobileKeywordLength.current = mobileKeywordLength.current.filter(function (item, pos) {
          //         return mobileKeywordLength.current.indexOf(item) == pos;
          //       })
          //     }
          //   }
          // })

          // getting userProject Keyword length with same same keyword filtration for mobile

          // projectKeywordLength.current.push(desktopKeywordLength.current)
          // projectKeywordLength.current.push(mobileKeywordLength.current)
          // projectKeywordLength.current = projectKeywordLength.current.flat()

          // console.log('projectKeywordLength', projectKeywordLength.current)

          // dispatch({ type: "USERKEYWORDLENGTH", payload: projectKeywordLength.current.length });


          //---------------- we make new filterration for keyword limitation per plan  end--------------//
          //--------------------------------------------------------------------------------------------//


          //---------- Start getting user selected project all details ----------//
          const filteredUrlBasedData = filteredEmailList.filter((selectedUrl) => {
            if (selectedUrl.weburl === webURL) {
              return selectedUrl.weburl === webURL;
            }
          });
          // console.log('filteredUrlBasedData', filteredUrlBasedData);
          //---------- End getting user selected project all details ----------//


          if (current_location_code === 0) {
            localStorage.setItem('current_location', filteredUrlBasedData[0].location_name)
            localStorage.setItem('current_location_code', filteredUrlBasedData[0].location_code)
            window.location.reload(false);
            // dispatch({ type: "CURRENTLOCATION", payload: filteredUrlBasedData[0].location_name });
          }

          dispatch({ type: "USERCURRENTPROJECTLOCATION", payload: filteredUrlBasedData });


          // ---------- Start getting selected project data by LocationCode ---------- //
          const country_Based_Data = filteredUrlBasedData.filter(countrybased => {
            if (countrybased.location_code === current_location_code) {
              return countrybased;
            }
          })
          // console.log('country_Based_Data', country_Based_Data);

          // ---------- End getting selected project data by LocationCode ---------- //


          // ---------- Start getting selected project data by  LocationCode with device type ---------- //

          const filterDeviceTypeData = country_Based_Data.filter((type) => {
            if (type.deviceType === deviceType) {
              return type;
            }
          });

          // ---------- End getting selected project data by  LocationCode with device type ---------- //


          // console.log('filterDeviceTypeData', filterDeviceTypeData)
          if (ALLPROJECTDATA.current.length !== 0) {
            filterDeviceTypeData && filterDeviceTypeData.map((detail) => {
              return (detail.keyword && detail.keyword.filter((onlyKeyword) => {
                return (ALLPROJECTDATA.current.map((rankKeyword) => {
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
          }
          else {
            filterDeviceTypeData && filterDeviceTypeData.map((detail) => {
              return (detail.keyword && detail.keyword.filter((onlyKeyword) => {
                return USERALLPENDINGRESULT.current.push(onlyKeyword);
              }))
            })
          }

          // it filter remove same name keywords because it print the data duplicate keyword on the table
          USERALLKEYWORDRESULT.current = USERALLKEYWORDRESULT.current.filter((obj, index, self) => {
            return index === self.findIndex((t) => (
              t.keyword === obj.keyword && t.location_code === obj.location_code
            ))
          })

          // console.log('USERALLKEYWORDRESULT', USERALLKEYWORDRESULT.current)

          const RemoveSimilarResult = Array.from(new Set(USERALLPENDINGRESULT.current));
          // console.log('RemoveSimilarResult', RemoveSimilarResult)
          const RemoveResultKeyword = RemoveSimilarResult.filter((id1) => !USERALLKEYWORDRESULT.current.some((o2) => o2.keyword === id1));
          // console.log('RemoveResultKeyword', RemoveResultKeyword)
          dispatch({ type: "USERALLPENDINGRESULT", payload: RemoveResultKeyword });

          dispatch({ type: "USERALLKEYWORDRESULT", payload: USERALLKEYWORDRESULT.current });

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
          dispatch({ type: "ISPROJECT", payload: false });
          localStorage.removeItem("websiteurl");
        }


      })

    })
    dispatch({ type: "ALLPROJECTDATA", payload: ALLPROJECTDATA.current });
    // All project Data end
  }, []);
  // deviceType any problem for related blank screen


};

export default GetRanks;
