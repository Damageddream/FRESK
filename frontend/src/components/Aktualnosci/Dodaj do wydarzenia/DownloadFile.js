import { useState, useEffect } from "react";
import axios from "axios";
import DeleteFile from "./UsunPlik";


const DownloadFile = (props) => {

    // states for storing files to download and loading state and errors
    const [file, setFile] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState()


    // when render use function to get files
    useEffect(() => {
        getFiles();
    }, [])

    // function fetching files to donwload from backend
    const getFiles = () => {
        setIsLoading(true);
        axios({
            method: "GET",
            url: "/api/files/",

        }).then((response) => {
            const data = response.data;
            setFile(data);

        })
            .catch((error) => {
                setErrors(error);
            })
    }



    return (
        <>
        <p>Do pobrania:</p>
            <ul>
                {file && file.map((download) => {
                    return (
                        <li className='mb-2'>
                            <a href={download.file} className='me-3'>{download.file_name}</a>
                            <DeleteFile file={download.id} getFiles={getFiles} />

                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default DownloadFile