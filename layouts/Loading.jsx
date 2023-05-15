import { LoadingContext } from "@/contexts/LoadingProvider";
import { useContext } from "react";

const Loading = ({ children }) => {
    const {loading, setLoading} = useContext(LoadingContext);
    console.log({loading})
    return (
        <div>
            <div>Loading</div>
            {children}
        </div>
    );
};

export default Loading;
