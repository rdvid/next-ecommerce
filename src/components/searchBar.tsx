import {useRouter} from "next/navigation";
import { ChangeEvent, useState } from "react";

type searchProps = {
    defaultValue: string;
}

//TODO: develop new ways to filter (price range and ordering)

export default function SearchBar({defaultValue} : searchProps){
    
    const router = useRouter();
    const [inputValue, setValue] = useState(defaultValue);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) =>{ 
        const inputValue = event.target.value; 
        setValue(inputValue); 
        console.log(inputValue);
    } 


    const handleSearch = () => { 
        if (inputValue) return router.push(`/?q=${inputValue}`); 
        if (!inputValue) return router.push("/") 
    } 


    const handleKeyPress = (event: { key: any; }) => { 
        if (event.key === "Enter") return handleSearch() 
    }

    return(
        <div className="flex w-full justify-center my-4 max-lg:flex-col-reverse items-center">

            <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-primary ">Search by</div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a>Name</a></li>
                    <li><a>Category</a></li>
                </ul>
            </div>

            <input type="text" 
                placeholder="Type product name" 
                value={inputValue ?? ""} 
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                className="input input-bordered min-w-[50%] input-md max-w-xs" 
                />
            {/* <button className="btn btn-secondary">asdsa</button> */}
        </div>
    );
}