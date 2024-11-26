import {useEffect} from "react";
import {container} from "@/architecture/ioc/ioc";
import {TYPES} from "@/architecture/ioc/types";
import {observer} from "mobx-react-lite";
import {Button} from "@mui/material";
import {useRouter} from "next/router";
import AdminMbledhesitHeader from "@/components/admin/Mbledhesit/AdminMbledhesitHeader";
import AdminMbledhesitList from "@/components/admin/Mbledhesit/AdminMbledhesitList";

const AdminMbledhesitContent = () => {

    let presenter = container.get(TYPES.AdminMbledhesitPresenter);

    const router = useRouter();

    useEffect(() => {
        presenter.init()
    }, []);


    return (
        <div className="admin-mbledhesit-content-container">
            <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h2>
                    Mbledhësit
                </h2>
                <Button variant="contained" onClick={() => {router.push('/shtombledhes')}}>
                    Shto Mbledhës
                </Button>
            </div>
            <AdminMbledhesitHeader presenter={presenter}/>
            <AdminMbledhesitList presenter={presenter}/>
        </div>
    )
}

export default observer(AdminMbledhesitContent);