import {AdsClickRounded} from "@mui/icons-material";
import {observer} from "mobx-react-lite";

const AdminBallinaGridItem = ({ item }) => {
    return (
        <div className="admin-ballina-grid-item">
            <div className="admin-ballina-grid-item-row">
                <div className="admin-ballina-grid-item-svg-wrapper">
                    {item?.icon}
                </div>
                <h3>{item?.title}</h3>
                <button onClick={() => {
                    router.push(item?.route)
                }}>
                    <AdsClickRounded sx={{height: '15px', width: '15px'}}/>
                    {item?.buttonText}
                </button>
            </div>
            <div className="admin-ballina-grid-item-row">
                <h4>{item?.subTitle1}</h4>
                <h2>{item?.value1}</h2>
            </div>
            <div className="admin-ballina-grid-item-row">
                <h4>{item?.subTitle2}</h4>
                <h2>{item?.value2}</h2>
            </div>
        </div>

    )
}

export default observer(AdminBallinaGridItem);