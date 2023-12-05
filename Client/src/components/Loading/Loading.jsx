import styles from "./Loading.module.css"
import { useState, useEffect } from "react";

const Loading = () =>{
    const  [loading, setLoading] = useState(false);

    useEffect(() =>{
        setLoading(true)
    }, []);


    return(
        <div>
            {loading ? 
            <div className={styles.loader}>
            </div> :  ""}
        </div>
    )
}

export default Loading;