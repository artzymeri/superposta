import {Button, FormControl, NativeSelect, TextField} from "@mui/material";
import {observer} from "mobx-react-lite";
import {DeleteOutlineRounded} from "@mui/icons-material";

const AdminAutomjetetHeader = ({presenter}) => {

    return (
        <div className="admin-automjetet-header-container">
            <TextField
                placeholder="Kërko"
                id="filled-hidden-label-small"
                variant="standard"
                size="small"
                fullWidth
                autoComplete={"off"}
                onChange={(e) => {
                    presenter.handleSearchFiltering(e)
                }}
            />
            <FormControl sx={{width: '150px'}} variant="filled">
                <NativeSelect
                    variant="filled"
                    defaultValue={'model'}
                    onChange={(e) => {
                        presenter.handleSortingOptions(e)
                    }}
                >
                    <option value={'model'}>Modeli</option>
                    <option value={'tag'}>Tabelat</option>
                    <option value={'assignee'}>Shoferi</option>
                </NativeSelect>
            </FormControl>
            <FormControl sx={{width: '150px'}} variant="filled">
                <NativeSelect
                    variant="filled"
                    defaultValue={'a-z'}
                    onChange={(e) => {
                        presenter.handleSortingMode(e)
                    }}
                >
                    <option value={'a-z'}>A-Z</option>
                    <option value={'z-a'}>Z-A</option>
                </NativeSelect>
            </FormControl>
            <Button variant="contained" color="error" onClick={() => {
                presenter.setDeletionModal(true, 'none')
            }} disabled={presenter?.bulkDeletionButtonDisabled}>
                <DeleteOutlineRounded/>
            </Button>
        </div>
    )
}

export default observer(AdminAutomjetetHeader);