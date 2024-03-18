import UserHeader from "./UserHeader";

function UserLayout({ children }) {
    return (
        <>
            <div className="flex flex-col min-h-screen  ">
                <div>
                    <UserHeader />
                </div>

                {children}

            </div>
        </>
    );
}

export default UserLayout;