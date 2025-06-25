import {useEffect, useState} from "react";

const checkMobile = () => {
    const [width, setWidth] = useState(0);
    const handleWindowSizeChange = () => {
            setWidth(window.innerWidth);
    }

    useEffect(() => {
        setWidth(window.innerWidth);
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);
    return (width <= 850);
}

export default checkMobile