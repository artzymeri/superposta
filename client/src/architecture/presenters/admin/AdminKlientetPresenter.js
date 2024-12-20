import {TYPES} from "@/architecture/ioc/types"
import {inject, injectable} from "inversify";
import "reflect-metadata";
import {makeObservable, action, observable, computed} from "mobx";

@injectable()
class AdminKlientetPresenter {

    @inject(TYPES.MainAppRepository) mainAppRepository;

    vm = {
        klientetData: [],
        deletionModalOpen: false,
        sortingOption: 'name_surname',
        sortingMode: 'a-z',
        searchQuery: ''
    }

    constructor() {
        makeObservable(this, {
            vm: observable,
            getKlientetData: action.bound,
            deleteUsers: action.bound,
            handleSortingMode: action.bound,
            handleSortingOptions: action.bound,
            handleSearchFiltering: action.bound,
            setDeletionModal: action.bound,
            klientetData: computed,
            deletionModalOpen: computed,
            bulkDeletionButtonDisabled: computed
        });
    }

    getKlientetData = async () => {
        const response = await this.mainAppRepository.getKlientetData();
        this.vm.klientetData = response.data || [];
    }

    deleteUsers = async () => {
        for (const user of this.vm.klientetData) {
            if (user.checked) {
                await this.mainAppRepository.deleteUser(user.id);
            }
        }
        this.vm.deletionModalOpen = false;
        await this.getKlientetData()
    }

    setDeletionModal = (value) => {
        this.vm.deletionModalOpen = value;
    }

    selectUserToDelete = (user_id) => {
        const userToCheck = this.vm.klientetData.find((klient) => klient.id === user_id)
        userToCheck.checked = !userToCheck.checked
    }

    handleSortingMode(event) {
        this.vm.sortingMode = event?.target?.value;
    }

    handleSortingOptions(event) {
        this.vm.sortingOption = event?.target?.value;
    }

    handleSearchFiltering(event) {
        this.vm.searchQuery = event?.target?.value.toLowerCase();
    }

    get klientetData() {
        const normalizedData = this.vm.klientetData.map((klient) => ({...klient, checked: false}))

        const filteredData = normalizedData.filter(item => {
            const itemValue = item[this.vm.sortingOption]?.toString().toLowerCase() || '';
            return itemValue.includes(this.vm.searchQuery);
        });

        if (this.vm.sortingMode === 'a-z') {
            filteredData.sort((a, b) => {
                const aValue = a[this.vm.sortingOption] || '';
                const bValue = b[this.vm.sortingOption] || '';
                return aValue.localeCompare(bValue);
            });
        } else if (this.vm.sortingMode === 'z-a') {
            filteredData.sort((a, b) => {
                const aValue = a[this.vm.sortingOption] || '';
                const bValue = b[this.vm.sortingOption] || '';
                return bValue.localeCompare(aValue);
            });
        }

        return filteredData;
    }


    get deletionModalOpen() {
        return this.vm.deletionModalOpen;
    }

    get usersToBeDeleted() {
        return this.vm.klientetData.some((klient) => klient.checked);
    }

    get bulkDeletionButtonDisabled() {
        return !this.vm.klientetData.some((klient) => klient.checked);
    }

}

export default AdminKlientetPresenter;