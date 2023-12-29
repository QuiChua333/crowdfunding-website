import { useEffect, useRef } from "react";

function StorySection({story}) {
    const element = useRef()
    useEffect(() => {
        element.current.innerHTML = story
    },[story])
    return (
        <div ref={element} style={{overflow: 'hidden'}}>
            
        </div>
    );
}

export default StorySection;