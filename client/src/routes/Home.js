

function Home({isLoggedIn, setIsLoggedIn}){

    const onClick = ()=>{
        console.log({isLoggedIn})
    }
    return(
        <>
            <span>home</span>
            <button onClick={onClick}>isLoggedIn</button>
        </>
    )
}

export default Home;