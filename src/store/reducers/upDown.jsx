

export const reducerFnthree = (state = false, action) => {
    const isloginee = localStorage.getItem('loginOut')
    if (action.type === "USER") { return state = isloginee; }
    else { return state = isloginee; }
};

export const reducerFnFour = (state = true, action) => {
    if (action.type === "LOADING") { return state = true; }
    else if (action.type === 'NOTLOADING') { return state = false; }
    else { return state; }
};
export const reducerFnEight = (state = 0, action) => {
    if (action.type === 'GETCOUNTRY') { return state = action.payload }
    else { return state; }
}

export const reducerFnFive = (state = 0, action) => {
    if (action.type === 'KEYWORDDATA') { return state = action.payload }
    else { return state; }
}

export const reducerFnthir = (state = 0, action) => {
    if (action.type === 'OLDKEYWORDDATA') { return state = action.payload }
    else { return state; }
}

export const reducerPlansdetails = (state = false, action) => {
    if (action.type === 'PLANSDETAILS') { return state = action.payload }
    else { return state; }
}


/////////////////////

export const reducerFnSix = (state = 0, action) => {
    if (action.type === 'ALLPROJECTDATA') { return state = action.payload }
    else { return state; }
}
export const reducerFnSixteen = (state = 0, action) => {
    if (action.type === 'ALLPROJECTDETAILS') { return state = action.payload }
    else { return state; }
}
export const reducerFnEle = (state = false, action) => {
    if (action.type === 'USERALLPROJECTDETAILS') { return state = action.payload }
    else { return state; }
}
export const reducerFnFor = (state = false, action) => {
    if (action.type === 'USERALLKEYWORDRESULT') { return state = action.payload }
    else { return state; }
}

export const reducerFnFIV = (state = false, action) => {
    if (action.type === 'USERALLPENDINGRESULT') { return state = action.payload }
    else { return state; }
}
export const reducerFnNine = (state = 0, action) => {
    if (action.type === 'CHARTRANKING') { return state = action.payload }
    else { return state; }
}


export const reducerFnTwe = (state = false, action) => {
    if (action.type === 'PREVIOUSALLOLDDATA') { return state = action.payload }
    else { return state; }
}

export const reducerFnOne = (state = false, action) => {
    if (action.type === 'USERALLPROJECTNAME') { return state = action.payload }
    else { return state; }
}

export const reducerFntwo = (state = 0, action) => {
    if (action.type === 'USERKEYWORDLIMIT') { return state = action.payload }
    else { return state; }
}

export const reducerFnthr = (state = 0, action) => {
    if (action.type === 'USERPROJECTLIMIT') { return state = action.payload }
    else { return state; }
}

export const reducerFnEightteen = (state = false, action) => {
    if (action.type === 'NEWPROJECTURL') { return state = action.payload }
    else { return state; }
}

export const reducerFnnNinteen = (state = 0, action) => {
    if (action.type === 'RANKMOVEDUP') { return state = action.payload }
    else { return state; }
}


export const reducerFnTwenty = (state = 0, action) => {
    if (action.type === 'RANKMOVEDDOWN') { return state = action.payload }
    else { return state; }
}


export const reducerFnTwentyONE = (state = 0, action) => {
    if (action.type === 'USERKEYWORDLENGTH') { return state = action.payload }
    else { return state; }
}


export const reducerFnTwentyTWO = (state = 0, action) => {
    if (action.type === 'USERPROJECTLENGTH') { return state = action.payload }
    else { return state; }
}



export const reducerShowMenu = (state = false, action) => {
    if (action.type === 'SHOWMENU') { return state = action.payload }
    else { return state; }
}

export const reducerSelectDate = (state = 7, action) => {
    if (action.type === 'SELECTCUSTOMDATE') { return state = action.payload }
    else { return state; }
}


















