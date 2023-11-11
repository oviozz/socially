
import NavBarList from "./NavBarList.jsx";

function NavBar(props){

    return (
        <div className={"px-3 mt-2"}>
            <NavBarList />
            {props.children}
        </div>
    )


}

export default NavBar;
