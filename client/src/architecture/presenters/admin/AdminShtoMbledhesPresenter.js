import {TYPES} from "@/architecture/ioc/types"
import {inject, injectable} from "inversify";
import "reflect-metadata";
import {makeObservable, action, observable, computed} from "mobx";
import dayjs from "dayjs";

@injectable()
class AdminShtoMbledhesPresenter {

    @inject(TYPES.MainAppRepository) MainAppRepository;

    vm = {
        newCollectorObject: {
            name_surname: null,
            location_of_operation: null,
            phone_number: null,
            email_address: null,
            password: null,
            transport: null,
            document_id: null,
        },
        cities_list: [
            { id: 1, state: 'Kosovë', city: 'Deqan' },
            { id: 2, state: 'Kosovë', city: 'Dragash' },
            { id: 3, state: 'Kosovë', city: 'Ferizaj' },
            { id: 4, state: 'Kosovë', city: 'Fushë Kosova' },
            { id: 5, state: 'Kosovë', city: 'Gjakova' },
            { id: 6, state: 'Kosovë', city: 'Gjilan' },
            { id: 7, state: 'Kosovë', city: 'Istog' },
            { id: 8, state: 'Kosovë', city: 'Kaçanik' },
            { id: 9, state: 'Kosovë', city: 'Kamenica' },
            { id: 10, state: 'Kosovë', city: 'Klina' },
            { id: 11, state: 'Kosovë', city: 'Komoran' },
            { id: 12, state: 'Kosovë', city: 'Leposavic' },
            { id: 13, state: 'Kosovë', city: 'Malishevë' },
            { id: 14, state: 'Kosovë', city: 'Mitrovica' },
            { id: 15, state: 'Kosovë', city: 'Peja' },
            { id: 16, state: 'Kosovë', city: 'Podujeva' },
            { id: 17, state: 'Kosovë', city: 'Prishtina' },
            { id: 18, state: 'Kosovë', city: 'Prizren' },
            { id: 19, state: 'Kosovë', city: 'Rahovec' },
            { id: 20, state: 'Kosovë', city: 'Skenderaj' },
            { id: 21, state: 'Kosovë', city: 'Shtime' },
            { id: 22, state: 'Kosovë', city: 'Suhareka' },
            { id: 23, state: 'Kosovë', city: 'Viti' },
            { id: 24, state: 'Kosovë', city: 'Vushtrri' },
            { id: 25, state: 'Kosovë', city: 'Zubin Potok' }
        ],
        transport_list: [],
        loading_state: false,
    }

    constructor() {
        makeObservable(this, {
            vm: observable,
            changeValues: action.bound,
            addCollector: action.bound,
            handleDocumentUpload: action.bound,
            convertFileToBase64: action.bound,
            removeDocumentUpload: action.bound,
            setLoadingState: action.bound,
            getAllTransports: action.bound,
            documentUploaded: computed,
            loadingState: computed,
            transportList: computed
        });
    }

    setLoadingState(value) {
        this.vm.loading_state = value;
    }

    changeValues(e, target) {
        this.vm.newCollectorObject[target] = e?.target?.value;
    }

    async getAllTransports() {
        const response = await this.MainAppRepository.getAllTransports();
        this.vm.transport_list = response?.data;
    }

    async handleDocumentUpload(event) {
        const file = event.target.files?.[0];
        if (file) {
            const base64String = await this.convertFileToBase64(file);
            this.vm.newCollectorObject.document_id = base64String;
        } else {
            console.error("No file selected");
        }
    }

    convertFileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                const base64String = reader.result.split(",")[1];
                resolve(base64String);
            };

            reader.onerror = (error) => {
                reject(error);
            };

            reader.readAsDataURL(file);
        });
    }

    removeDocumentUpload = () => {
        this.vm.newCollectorObject.document_id = null
    }

    addCollector = async () => {
        console.log(this.vm.newCollectorObject);
        await this.MainAppRepository.addCollector(this.vm.newCollectorObject);
    }

    get documentUploaded() {
        return this.vm.newCollectorObject.document_id;
    }
i
    get loadingState() {
        return this.vm.loading_state;
    }

    get transportList() {
        return this.vm.transport_list.filter(transport => !transport.assignee);
    }

}

export default AdminShtoMbledhesPresenter;