import type LoadingType from "types/components/loading";

const Loading = ({ isVisible }: LoadingType) => {
    return (
        <>
            {isVisible &&
                <div id="div-loading" />
            }
        </>
    );
};

export default Loading;
