import React from "react";

const URL = "https://opentdb.com/api.php?amount=1";

export async function GetData()
{
    try{
        const response = await fetch(URL)
        return response.json();
    }catch(err)
    {
        console.log(err);
    }

}

