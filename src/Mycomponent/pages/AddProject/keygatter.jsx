import React from 'react';

const Keygatter = (props) => {
  return (
    <li id='keuLi' > {props.text}<b onClick={()=>{  props.onSelect(props.id); }}>X </b></li>
  )
}

export default Keygatter;