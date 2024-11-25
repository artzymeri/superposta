import {LogoutRounded} from "@mui/icons-material";
import {useRouter} from "next/router";
import {container} from "@/architecture/ioc/ioc";
import {TYPES} from "@/architecture/ioc/types";
import {observer} from "mobx-react-lite";

const AdminSidebar = () => {

    const router = useRouter();
    const presenter = container.get(TYPES.AdminSidebarPresenter);

    return (
        <div className="admin-sidebar-container">
            <div className="admin-sidebar-logo-container">
                <img src="/superpostafull-transparent.png"/>
            </div>
            <div className="admin-sidebar-items-container">
                {presenter?.sidebarItems.map((item) => {
                    return (
                        <div key={item?.id} className={`${item.pathName == router.route ? 'admin-sidebar-item-selected' : 'admin-sidebar-item'}`} onClick={() => {
                            router.push(item?.route)
                        }}>
                            {item?.icon}
                            {item?.title}
                        </div>
                    )
                })}
            </div>
            <div className="admin-sidebar-logout-container">
                <button className="admin-sidebar-logout-button"
                        onClick={() => {
                            presenter.logout().then(() => {
                                router.push('/kycu')
                            })
                        }}>
                    <LogoutRounded sx={{height: '18px', width: '18px'}}/>
                    Shkycu
                </button>
            </div>
        </div>
    )
}

export default observer(AdminSidebar);