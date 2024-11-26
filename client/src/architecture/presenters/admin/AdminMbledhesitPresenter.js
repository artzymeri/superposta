import {TYPES} from "@/architecture/ioc/types"
import {inject, injectable} from "inversify";
import "reflect-metadata";
import {makeObservable, action, observable, computed} from "mobx";

@injectable()
class AdminMbledhesitPresenter {

    @inject(TYPES.MainAppRepository) mainAppRepository;

    vm = {
        collectorsData: [],
        transportsData: [],
        deletionModalOpen: false,
        sortingOption: 'name_surname',
        sortingMode: 'a-z',
        searchQuery: ''
    }

    constructor() {
        makeObservable(this, {
            vm: observable,
            getCollectorsData: action.bound,
            getTransportsData: action.bound,
            deleteCollectors: action.bound,
            handleSortingMode: action.bound,
            handleSortingOptions: action.bound,
            handleSearchFiltering: action.bound,
            setDeletionModal: action.bound,
            init: action.bound,
            collectorsData: computed,
            deletionModalOpen: computed,
            bulkDeletionButtonDisabled: computed
        });
    }

    init = async () => {
        await this.getCollectorsData();
        await this.getTransportsData();
    }

    getCollectorsData = async () => {
        const response = await this.mainAppRepository.getCollectorsData();
        this.vm.collectorsData = response.data || [];
    }

    getTransportsData = async () => {
        const response = await this.mainAppRepository.getAllTransports();
        this.vm.transportsData = response.data || [];
    }

    deleteCollectors = async () => {
        for (const user of this.vm.collectorsData) {
            if (user.checked) {
                await this.mainAppRepository.deleteCollector(user.id);
            }
        }
        this.vm.deletionModalOpen = false;
        await this.getCollectorsData()
    }

    setDeletionModal = (value) => {
        this.vm.deletionModalOpen = value;
    }

    selectUserToDelete = (user_id) => {
        const userToCheck = this.vm.collectorsData.find((user) => user.id === user_id)
        userToCheck.checked = !userToCheck.checked
    }

    handleSortingMode(event) {
        this.vm.sortingMode = event?.target?.value;
    }

    handleSortingOptions(event) {
        this.vm.sortingOption = event?.target?.value;
    }

    handleSearchFiltering(event) {i
        this.vm.searchQuery = event?.target?.value.toLowerCase();
    }

    get collectorsData() {
        const normalizedData = this.vm.collectorsData.map((user) => ({...user, checked: false}))

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

    get transportsData() {
        return this.vm.transportsData;
    }


    get deletionModalOpen() {
        return this.vm.deletionModalOpen;
    }

    get bulkDeletionButtonDisabled() {
        return !this.vm.collectorsData.some((user) => user.checked);
    }

}

export default AdminMbledhesitPresenter;