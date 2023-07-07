import React from "react";
import { Input } from 'antd';

function SearchForm({onLabelChange, label, search}){

  const form = search ? <div className="search-form">
  <Input
    placeholder="Search films"
    autoFocus
    onChange={onLabelChange}
    value={label}
  />
</div> : null

    return ( 
      form
    )
  }

  export default SearchForm