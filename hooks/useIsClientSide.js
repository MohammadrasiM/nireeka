import {useState, useEffect} from "react";

const useIsClientSide = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        if(typeof window !== 'undefined') setIsClient(true);
    }, [])

    return isClient;
}

export default useIsClientSide;