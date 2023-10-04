import ProjectCardItem from "~/components/ProjectCardItem";

function Home() {
    return ( 
        <div style={{
            height: '100vh'
        }}>
            <h1>Home Page</h1>
            <div style={{
                display: "flex"
            }}>
            <ProjectCardItem/>
            <ProjectCardItem/>
            <ProjectCardItem/>
            <ProjectCardItem/>
            </div>
            
        </div>
        
    )
}

export default Home;
