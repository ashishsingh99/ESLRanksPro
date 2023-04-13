// login user
export const loginUser = (loginout) => {
  return { type: "USER", payload: loginout };
};

export const IsProject = (isproject) => {
  return { type: "ISPROJECT", payload: isproject };
}

// Loading Data Condition base
export const isLoading = (loading) => {
  return { type: "LOADING", payload: loading };
};

// Not-Loading Data Condition base
export const isNotLoading = (loading) => {
  return { type: "NOTLOADING", payload: loading };
};


export const ProjectLoctions = (addprojectlocation) => {
  return { type: "ADDPROJECTLOCATION", payload: addprojectlocation };
};

export const UserCurrentProjectLoctions = (usercurrentprojectlocation) => {
  return { type: "USERCURRENTPROJECTLOCATION", payload: usercurrentprojectlocation };
};

export const CurrentLocation = (currentlocation) => {
  return { type: "CURRENTLOCATION", payload: currentlocation };
};










//CHARTRANKING
export const addProjectRank = (chartranking) => {
  return { type: "CHARTRANKING", payload: chartranking };
};
//GETCOUNTRY
export const GetCountry = (getcountry) => {
  return { type: "GETCOUNTRY", payload: getcountry };
};

//ALLPROJECT DATA
export const AllProjectData = (allprojectdata) => {
  return { type: "ALLPROJECTDATA", payload: allprojectdata };
};

//ALLPROJECTDETAILS DATA
export const AllProjectDetaila = (allprojectdetails) => {
  return { type: "ALLPROJECTDETAILS", payload: allprojectdetails };
};

// USERALLPROJECT DATA
export const UserAllProjectDetails = (userallprojectdetails) => {
  return { type: "USERALLPROJECTDETAILS", payload: userallprojectdetails };
};

// USERALLPROJECT NAME
export const UserAllProjectName = (userallprojectname) => {
  return { type: "USERALLPROJECTNAME", payload: userallprojectname };
};

// USERALLKEYWORD RESULT
export const AllKeywordResult = (userallkeywordresult) => {
  return { type: "USERALLKEYWORDRESULT", payload: userallkeywordresult };
};

//USERALLPENDING RESULT
export const AllPendingResult = (userallpendingresult) => {
  return { type: "USERALLPENDINGRESULT", payload: userallpendingresult };
};

// KEYWORDDATA
export const addProjectData = (keyworddata) => {
  return { type: "KEYWORDDATA", payload: keyworddata };
};

export const addOldProjectData = (oldkeyworddata) => {
  return { type: "OLDKEYWORDDATA", payload: oldkeyworddata };
};

export const GetPreviousAlloldData = (previousallolddata) => {
  return { type: "PREVIOUSALLOLDDATA", payload: previousallolddata };
};


// User Plans limit set here

export const UserKeywordLimit = (userkeywordlimit) => {
  return { type: "USERKEYWORDLIMIT", payload: userkeywordlimit };
};

export const UserProjectLimit = (userprojectlimit) => {
  return { type: "USERPROJECTLIMIT", payload: userprojectlimit };
};

// user projects current length

export const UserKeywordLength = (userkeywordlength) => {
  return { type: "USERKEYWORDLENGTH", payload: userkeywordlength };
};

export const UserProjectLength = (userprojectlength) => {
  return { type: "USERPROJECTLENGTH", payload: userprojectlength };
};


export const UpgradePlansDetails = (plandetails) => {
  return { type: "PLANSDETAILS", payload: plandetails };
}

export const NewProjectURL = (newprojecturl) => {
  return { type: "NEWPROJECTURL", payload: newprojecturl };
}



export const RankMovedUp = (rankmovedup) => {
  return { type: "RANKMOVEDUP", payload: rankmovedup };
}

export const RankMovedDown = (rankmoveddown) => {
  return { type: "RANKMOVEDDOWN", payload: rankmoveddown };
}


export const ShowMenu = (showmenu) => {
  return { type: "SHOWMENU", payload: showmenu };

}


export const SelectCusDate = (selectcustomdate) => {
  return { type: "SELECTCUSTOMDATE", payload: selectcustomdate };

}


export const AllOLdKEYWORDData = (alloldkeyworddata) => {
  return { type: "ALLOLDKEYWORDDATA", payload: alloldkeyworddata };
}


export const UserSelectedProjectAllId = (userselectedprojectallid) => {
  return { type: "USERSELECTEDPROJECTALLID", payload: userselectedprojectallid };
}




