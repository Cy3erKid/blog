import AuthenLayout from '@/components/layouts/authen';
import useCurrentUser from '@/lib/hooks/useCurrentUser';
import { useEffect,useState } from 'react';


export default function Profile() {
    const { currentUser,fetcherWithToken } = useCurrentUser();
    const [blogs,setBlogs] = useState([]);

    useEffect(() => {
        if(currentUser){
            fetcherWithToken("https://sakko-demo-api.herokuapp.com/api/v1/user/blogs").then((json) => {
                setBlogs(json);
            });
        }
    },[currentUser])

    return (
        <AuthenLayout>
            Authenticated.
            <hr></hr>
            {JSON.stringify(blogs)}
        </AuthenLayout>
    )
}
