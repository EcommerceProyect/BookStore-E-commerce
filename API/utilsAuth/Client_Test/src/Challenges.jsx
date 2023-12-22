import React,{useState, useEffect} from "react";
import queryString from "querystring";

const Challenges = ({location}) => {

    const {code} = queryString.parse(location.search);

    const [challengeData,setChallengeData] = useState("none");

    useEffect(()=> {
        fetch(`http://localhost:5432/code=${code}`,{
            method:"GET",
            headers:{
                "Content-Type" : "aplication/json",
                Accept:"aplication/json"
            }
        })
        .then((response)=> response.json())
        .then(res => setChallengeData(JSON.stringify(res)))
    },[code]);

    return(
        <div>
            <h1>Challenges</h1>
            <h5>{challengeData}</h5>
        </div>
    )
}

export default Challenges;