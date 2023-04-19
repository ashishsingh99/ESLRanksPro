import { useRef } from "react";
import { useSelector } from "react-redux";
import KeywordRanksChart from "./keywordAllRanksChart";

const KeywordAllRanksChart = (props) => {

    // redux useselector
    const PreviousAllOldData = useSelector((state) => state.previousallolddata);
    const selectedIndex = useSelector(state => state.selectcustomdate);

    // localStorage
    const deviceType = localStorage.getItem("devicetype");
    const webURL = localStorage.getItem("websiteurl");

    // hooks variable
    const TargetedKeyword_AllOldDataRanks = useRef([0]);
    const KeywordDetailsTime = useRef([''])

    const lastDate = selectedIndex !== 0 ? selectedIndex : 7

    if (props.Keyword === null) {
        TargetedKeyword_AllOldDataRanks.current = [0]
        KeywordDetailsTime.current = ['']
    }
    else {

        PreviousAllOldData && PreviousAllOldData.slice(PreviousAllOldData.length - lastDate, PreviousAllOldData.length).map(res => {

            const keywordDetails = res.date + ' ' + res.month

            return res.datasave && res.datasave.map(datasave => {
                return datasave.data.tasks && datasave.data.tasks.filter((task) => {
                    if (task.data.device === deviceType) {
                        // console.log('deviceTypeAlloldtask', task.result)
                        return task.result && task.result.filter(result => {
                            if (result.keyword === props.Keyword) {
                                // console.log('props.keyword', props.Keyword)

                                const PushItems = result.items.concat({ type: "organic", rank_group: "no rank", url: "not data found", domain: "not", });


                                // HERE WE FILTIRING THE ORGANIC ITEMS WITH PUSHED ITEM LIST
                                const TypeOrganic = PushItems.filter((obj) => {
                                    if (obj.type === "organic") {
                                        return obj;
                                    }
                                });

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

                                KeywordDetailsTime.current.push(keywordDetails);
                                TargetedKeyword_AllOldDataRanks.current.push(filteredUrlData[0].rank_group)

                            }
                        })
                    }

                })
            })

        })
    }




    return <>
        <KeywordRanksChart dataset={TargetedKeyword_AllOldDataRanks.current} labels={KeywordDetailsTime.current} Keyword={props.Keyword} />
    </>
}
export default KeywordAllRanksChart;
















