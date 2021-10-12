import "axios";
import { useEffect, useState } from "react";
import urls from "../../helpers/urls.json";
import Table from "../Table/Table";
import axios from "axios";

const Get = () => {
    const [getRes, setGetRes] = useState(null)
    useEffect(() => {
        document.title = "Get page"
    }, [])

    useEffect(() => {
        axios.get(`${urls.baseUrl}${urls.getjobs}`)
            .then(res => {
                setGetRes(res.data.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    return <>
        {getRes ? <Table dataTemp={getRes}></Table> : "loading..."}
    </>

};

export default Get;