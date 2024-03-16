import UserHeader from "./UserHeader";

function UserLayout({ children }) {
    return (
        <>
            <div className="flex flex-col min-h-screen  ">
                <div className="mb-16">
                    <UserHeader />
                </div>

                <div>{children}</div>

            </div>
        </>
    );
}

export default UserLayout;